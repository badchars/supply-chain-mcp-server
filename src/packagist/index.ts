import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(600_000);

const composerPackage: ToolDef = {
  name: "composer_package",
  description:
    "Get PHP/Composer package metadata from Packagist including versions, description, maintainers, and repository information.",
  schema: z.object({
    vendor: z.string().describe("Vendor/organization name, e.g. 'laravel'"),
    name: z.string().describe("Package name, e.g. 'framework'"),
  }),
  async execute(args, ctx) {
    const { vendor, name } = args;
    const cacheKey = `pkg:${vendor}/${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://repo.packagist.org/p2/${encodeURIComponent(vendor)}/${encodeURIComponent(name)}.json`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const composerSearch: ToolDef = {
  name: "composer_search",
  description: "Search Packagist for PHP packages matching a query string.",
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
      `https://packagist.org/search.json?q=${encodeURIComponent(query)}&page=${page}`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const composerStats: ToolDef = {
  name: "composer_stats",
  description:
    "Get Packagist package download statistics including total, monthly, and daily download counts.",
  schema: z.object({
    vendor: z.string().describe("Vendor name"),
    name: z.string().describe("Package name"),
  }),
  async execute(args, ctx) {
    const { vendor, name } = args;
    const cacheKey = `stats:${vendor}/${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://packagist.org/packages/${encodeURIComponent(vendor)}/${encodeURIComponent(name)}/stats.json`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const composerAdvisories: ToolDef = {
  name: "composer_advisories",
  description:
    "Get security advisories for PHP packages from Packagist. Returns known vulnerabilities and CVEs affecting the specified package.",
  schema: z.object({
    vendor: z.string().describe("Vendor name, e.g. 'symfony'"),
    name: z.string().describe("Package name, e.g. 'http-kernel'"),
  }),
  async execute(args, ctx) {
    const { vendor, name } = args;
    const pkg = `${vendor}/${name}`;
    const cacheKey = `adv:${pkg}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://packagist.org/api/security-advisories/?packages[]=${encodeURIComponent(pkg)}`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

export const packagistTools: ToolDef[] = [
  composerPackage,
  composerSearch,
  composerStats,
  composerAdvisories,
];
