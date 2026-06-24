import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const limiter = new RateLimiter(500);
const cache = new TTLCache<unknown>(600_000);

const nugetPackage: ToolDef = {
  name: "nuget_package",
  description:
    "Fetch NuGet package registration metadata including all versions, dependency groups, descriptions, and catalog entries.",
  schema: z.object({
    name: z.string().describe("NuGet package name, e.g. 'Newtonsoft.Json'"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const lower = name.toLowerCase();
    const cacheKey = `pkg:${lower}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://api.nuget.org/v3/registration5-gz-semver2/${encodeURIComponent(lower)}/index.json`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const nugetSearch: ToolDef = {
  name: "nuget_search",
  description:
    "Search the NuGet registry for packages matching a query string.",
  schema: z.object({
    query: z.string().describe("Search query"),
    limit: z.number().default(20).describe("Max results (default 20)"),
  }),
  async execute(args, ctx) {
    const { query } = args;
    const limit = args.limit ?? 20;
    const cacheKey = `search:${query}:${limit}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://azuresearch-usnc.nuget.org/query?q=${encodeURIComponent(query)}&take=${limit}`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const nugetVersions: ToolDef = {
  name: "nuget_versions",
  description:
    "List all published versions of a NuGet package from the flat container index.",
  schema: z.object({
    name: z.string().describe("NuGet package name"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const lower = name.toLowerCase();
    const cacheKey = `vers:${lower}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://api.nuget.org/v3-flatcontainer/${encodeURIComponent(lower)}/index.json`,
    );

    const result = {
      name,
      versions: data.versions ?? [],
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const nugetCatalogEntry: ToolDef = {
  name: "nuget_catalog_entry",
  description:
    "Get specific version details from NuGet including dependency groups, description, license, and catalog metadata.",
  schema: z.object({
    name: z.string().describe("NuGet package name"),
    version: z.string().describe("Package version"),
  }),
  async execute(args, ctx) {
    const { name, version } = args;
    const lowerName = name.toLowerCase();
    const lowerVersion = version.toLowerCase();
    const cacheKey = `entry:${lowerName}:${lowerVersion}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://api.nuget.org/v3/registration5-gz-semver2/${encodeURIComponent(lowerName)}/${encodeURIComponent(lowerVersion)}.json`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

export const nugetTools: ToolDef[] = [nugetPackage, nugetSearch, nugetVersions, nugetCatalogEntry];
