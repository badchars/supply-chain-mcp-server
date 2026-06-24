import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const limiter = new RateLimiter(500);
const cache = new TTLCache<unknown>(5 * 60 * 1000);

const API = "https://rekor.sigstore.dev";

const rekorSearch: ToolDef = {
  name: "rekor_search",
  description:
    "Search the Rekor transparency log by email, SHA256 hash, or public key fingerprint and return matching entry UUIDs",
  schema: z.object({
    query: z
      .string()
      .describe(
        "Search query: an email address, SHA256 hash (with sha256: prefix), or public key fingerprint",
      ),
  }),
  async execute(
    args: { query: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    await limiter.acquire();

    let body: Record<string, unknown>;
    if (args.query.startsWith("sha256:")) {
      body = { hash: args.query };
    } else if (args.query.includes("@")) {
      body = { email: args.query };
    } else {
      body = { publicKey: { format: "x509", content: args.query } };
    }

    const data = await apiFetch(`${API}/api/v1/index/retrieve`, {
      method: "POST",
      body,
    });
    return json(data);
  },
};

const rekorEntry: ToolDef = {
  name: "rekor_entry",
  description:
    "Retrieve a specific Rekor transparency log entry by UUID, including body, attestation, and inclusion proof",
  schema: z.object({
    uuid: z
      .string()
      .describe("Rekor entry UUID (64 or 80 hex character string)"),
  }),
  async execute(
    args: { uuid: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `entry:${args.uuid}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/api/v1/log/entries/${encodeURIComponent(args.uuid)}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const rekorLogInfo: ToolDef = {
  name: "rekor_log_info",
  description:
    "Get the current Rekor transparency log status including rootHash, treeSize, signedTreeHead, and treeID",
  schema: z.object({}),
  async execute(
    _args: Record<string, never>,
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = "loginfo";
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${API}/api/v1/log`);
    cache.set(key, data);
    return json(data);
  },
};

const rekorEntriesSearch: ToolDef = {
  name: "rekor_entries_search",
  description:
    "Retrieve multiple Rekor log entries by their UUIDs or log indexes in a single request",
  schema: z.object({
    entry_uuids: z
      .array(z.string())
      .optional()
      .describe("Array of entry UUIDs to retrieve"),
    log_indexes: z
      .array(z.number())
      .optional()
      .describe("Array of log indexes to retrieve"),
  }),
  async execute(
    args: {
      entry_uuids?: string[];
      log_indexes?: number[];
    },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    await limiter.acquire();

    const body: Record<string, unknown> = {};
    if (args.entry_uuids) body.entryUUIDs = args.entry_uuids;
    if (args.log_indexes) body.logIndexes = args.log_indexes;

    const data = await apiFetch(`${API}/api/v1/log/entries/retrieve`, {
      method: "POST",
      body,
    });
    return json(data);
  },
};

const rekorVerify: ToolDef = {
  name: "rekor_verify",
  description:
    "Verify whether a SHA256 artifact hash has been recorded in the Rekor transparency log, returning entry details if found",
  schema: z.object({
    hash: z
      .string()
      .describe(
        'SHA256 hash of the artifact to verify, with or without "sha256:" prefix',
      ),
  }),
  async execute(
    args: { hash: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const normalized = args.hash.startsWith("sha256:")
      ? args.hash
      : `sha256:${args.hash}`;

    const key = `verify:${normalized}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();

    let uuids: string[];
    try {
      uuids = (await apiFetch(`${API}/api/v1/index/retrieve`, {
        method: "POST",
        body: { hash: normalized },
      })) as string[];
    } catch {
      const result = { found: false, hash: normalized, entries: [] };
      cache.set(key, result);
      return json(result);
    }

    if (!Array.isArray(uuids) || uuids.length === 0) {
      const result = { found: false, hash: normalized, entries: [] };
      cache.set(key, result);
      return json(result);
    }

    await limiter.acquire();
    let entry: unknown = null;
    try {
      entry = await apiFetch(
        `${API}/api/v1/log/entries/${encodeURIComponent(uuids[0])}`,
      );
    } catch {
      // entry fetch failed, still report as found
    }

    const result = {
      found: true,
      hash: normalized,
      total_entries: uuids.length,
      first_uuid: uuids[0],
      entry,
    };
    cache.set(key, result);
    return json(result);
  },
};

export const rekorTools: ToolDef[] = [
  rekorSearch,
  rekorEntry,
  rekorLogInfo,
  rekorEntriesSearch,
  rekorVerify,
];
