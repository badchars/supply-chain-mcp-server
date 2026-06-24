import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(300_000);

const RUBYGEMS_BASE = "https://rubygems.org/api/v1";

const gemInfo: ToolDef = {
  name: "gem_info",
  description:
    "Fetch RubyGems gem metadata including name, version, authors, description, download counts, project URI, source code URI, and other package details.",
  schema: z.object({
    name: z.string().describe("Gem name, e.g. 'rails' or 'devise'"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `info:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${RUBYGEMS_BASE}/gems/${encodeURIComponent(name)}.json`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const gemVersions: ToolDef = {
  name: "gem_versions",
  description:
    "List all versions of a RubyGems gem with release dates, platform info, and version numbers.",
  schema: z.object({
    name: z.string().describe("Gem name"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `vers:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${RUBYGEMS_BASE}/versions/${encodeURIComponent(name)}.json`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const gemSearch: ToolDef = {
  name: "gem_search",
  description:
    "Search the RubyGems registry for gems matching a query string.",
  schema: z.object({
    query: z.string().describe("Search query"),
    page: z.number().default(1).describe("Page number (default 1)"),
  }),
  async execute(args, ctx) {
    const { query } = args;
    const page = args.page ?? 1;
    const cacheKey = `search:${query}:${page}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${RUBYGEMS_BASE}/search.json?query=${encodeURIComponent(query)}&page=${page}`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const gemReverseDeps: ToolDef = {
  name: "gem_reverse_deps",
  description:
    "Get reverse dependencies of a RubyGems gem — lists all gems that depend on this gem. Useful for assessing blast radius of a compromised package.",
  schema: z.object({
    name: z.string().describe("Gem name"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `rdeps:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${RUBYGEMS_BASE}/gems/${encodeURIComponent(name)}/reverse_dependencies.json`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

export const rubygemsTools: ToolDef[] = [gemInfo, gemVersions, gemSearch, gemReverseDeps];
