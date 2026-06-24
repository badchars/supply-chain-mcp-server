import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const BASE = "https://api.osv.dev/v1";
const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(5 * 60_000);

// ---------------------------------------------------------------------------
// 1. osv_query
// ---------------------------------------------------------------------------
const osv_query: ToolDef = {
  name: "osv_query",
  description:
    "Query OSV database for known vulnerabilities affecting a specific package and optional version.",
  schema: z.object({
    ecosystem: z
      .string()
      .describe("Package ecosystem (e.g. npm, PyPI, Go, crates.io, Maven)"),
    name: z.string().describe("Package name"),
    version: z.string().optional().describe("Exact package version to check"),
  }),
  async execute(
    args: { ecosystem: string; name: string; version?: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `query:${args.ecosystem}:${args.name}:${args.version ?? ""}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const body: Record<string, unknown> = {
      package: { name: args.name, ecosystem: args.ecosystem },
    };
    if (args.version) body.version = args.version;

    const data = await apiFetch(`${BASE}/query`, {
      method: "POST",
      body,
    });

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 2. osv_query_commit
// ---------------------------------------------------------------------------
const osv_query_commit: ToolDef = {
  name: "osv_query_commit",
  description:
    "Query OSV database for vulnerabilities associated with a specific git commit hash.",
  schema: z.object({
    commit: z.string().describe("Git commit hash to query"),
  }),
  async execute(
    args: { commit: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    await limiter.acquire();

    const data = await apiFetch(`${BASE}/query`, {
      method: "POST",
      body: { commit: args.commit },
    });

    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 3. osv_query_purl
// ---------------------------------------------------------------------------
const osv_query_purl: ToolDef = {
  name: "osv_query_purl",
  description:
    "Query OSV database using a Package URL (purl) for known vulnerabilities.",
  schema: z.object({
    purl: z
      .string()
      .describe("Package URL (e.g. pkg:npm/express@4.17.1)"),
  }),
  async execute(
    args: { purl: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `purl:${args.purl}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(`${BASE}/query`, {
      method: "POST",
      body: { package: { purl: args.purl } },
    });

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 4. osv_batch
// ---------------------------------------------------------------------------
const osv_batch: ToolDef = {
  name: "osv_batch",
  description:
    "Batch query OSV database for vulnerabilities across multiple packages at once.",
  schema: z.object({
    queries: z
      .array(
        z.object({
          ecosystem: z
            .string()
            .describe("Package ecosystem (e.g. npm, PyPI, Go)"),
          name: z.string().describe("Package name"),
          version: z
            .string()
            .optional()
            .describe("Exact package version to check"),
        }),
      )
      .describe("Array of package queries to check"),
  }),
  async execute(
    args: {
      queries: Array<{ ecosystem: string; name: string; version?: string }>;
    },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    await limiter.acquire();

    const queries = args.queries.map((q) => {
      const entry: Record<string, unknown> = {
        package: { name: q.name, ecosystem: q.ecosystem },
      };
      if (q.version) entry.version = q.version;
      return entry;
    });

    const data = await apiFetch(`${BASE}/querybatch`, {
      method: "POST",
      body: { queries },
    });

    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 5. osv_id
// ---------------------------------------------------------------------------
const osv_id: ToolDef = {
  name: "osv_id",
  description:
    "Fetch full vulnerability details from OSV by ID (OSV, CVE, GHSA, RUSTSEC, PYSEC, etc.).",
  schema: z.object({
    id: z
      .string()
      .describe(
        "Vulnerability ID (e.g. GHSA-xxxx-xxxx-xxxx, CVE-2023-1234, RUSTSEC-2023-0001)",
      ),
  }),
  async execute(
    args: { id: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `id:${args.id}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(`${BASE}/vulns/${encodeURIComponent(args.id)}`);

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const osvTools: ToolDef[] = [
  osv_query,
  osv_query_commit,
  osv_query_purl,
  osv_batch,
  osv_id,
];
