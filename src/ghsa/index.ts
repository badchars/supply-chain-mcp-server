import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const BASE = "https://api.github.com/advisories";
const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(10 * 60_000);

function ghHeaders(ctx: ToolContext): Record<string, string> {
  const headers: Record<string, string> = {};
  if (ctx.config.githubToken) {
    headers["Authorization"] = `Bearer ${ctx.config.githubToken}`;
  }
  return headers;
}

// ---------------------------------------------------------------------------
// 1. ghsa_id
// ---------------------------------------------------------------------------
const ghsa_id: ToolDef = {
  name: "ghsa_id",
  description:
    "Fetch a GitHub Security Advisory by its GHSA or CVE identifier.",
  schema: z.object({
    ghsa_id: z
      .string()
      .describe(
        "Advisory identifier (e.g. GHSA-xxxx-xxxx-xxxx or CVE-2023-1234)",
      ),
  }),
  async execute(
    args: { ghsa_id: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `id:${args.ghsa_id}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(
      `${BASE}/${encodeURIComponent(args.ghsa_id)}`,
      { headers: ghHeaders(ctx) },
    );

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 2. ghsa_search
// ---------------------------------------------------------------------------
const ghsa_search: ToolDef = {
  name: "ghsa_search",
  description:
    "Search GitHub Security Advisories by keyword, ecosystem, and severity.",
  schema: z.object({
    keyword: z.string().optional().describe("Search keyword"),
    ecosystem: z
      .string()
      .optional()
      .describe(
        "Package ecosystem filter (npm, pip, go, rubygems, nuget, maven, composer, rust, pub, erlang, actions, swift)",
      ),
    severity: z
      .string()
      .optional()
      .describe("Severity filter (low, medium, high, critical)"),
    per_page: z
      .number()
      .optional()
      .default(25)
      .describe("Number of results to return (default 25)"),
  }),
  async execute(
    args: {
      keyword?: string;
      ecosystem?: string;
      severity?: string;
      per_page?: number;
    },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const params = new URLSearchParams();
    if (args.keyword) params.set("keyword", args.keyword);
    if (args.ecosystem) params.set("ecosystem", args.ecosystem);
    if (args.severity) params.set("severity", args.severity);
    params.set("per_page", String(args.per_page ?? 25));

    const key = `search:${params.toString()}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(`${BASE}?${params.toString()}`, {
      headers: ghHeaders(ctx),
    });

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 3. ghsa_package
// ---------------------------------------------------------------------------
const ghsa_package: ToolDef = {
  name: "ghsa_package",
  description:
    "List GitHub Security Advisories affecting a specific package in a given ecosystem.",
  schema: z.object({
    ecosystem: z
      .string()
      .describe(
        "Package ecosystem (npm, pip, go, rubygems, nuget, maven, composer, rust, pub, erlang, actions, swift)",
      ),
    name: z.string().describe("Package name"),
  }),
  async execute(
    args: { ecosystem: string; name: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const affects = `${args.ecosystem}/${args.name}`;
    const key = `package:${affects}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const params = new URLSearchParams();
    params.set("affects", affects);

    const data = await apiFetch(`${BASE}?${params.toString()}`, {
      headers: ghHeaders(ctx),
    });

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 4. ghsa_recent
// ---------------------------------------------------------------------------
const ghsa_recent: ToolDef = {
  name: "ghsa_recent",
  description:
    "List the most recently updated GitHub Security Advisories.",
  schema: z.object({
    per_page: z
      .number()
      .optional()
      .default(25)
      .describe("Number of results to return (default 25)"),
  }),
  async execute(
    args: { per_page?: number },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const perPage = args.per_page ?? 25;
    const key = `recent:${perPage}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const params = new URLSearchParams();
    params.set("sort", "updated");
    params.set("direction", "desc");
    params.set("per_page", String(perPage));

    const data = await apiFetch(`${BASE}?${params.toString()}`, {
      headers: ghHeaders(ctx),
    });

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const ghsaTools: ToolDef[] = [
  ghsa_id,
  ghsa_search,
  ghsa_package,
  ghsa_recent,
];
