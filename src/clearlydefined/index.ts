import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const API = "https://api.clearlydefined.io";
const limiter = new RateLimiter(500);
const cache = new TTLCache<unknown>(1_800_000);

/** Map package type to ClearlyDefined provider name */
function mapProvider(type: string): string {
  const map: Record<string, string> = {
    npm: "npmjs",
    pypi: "pypi",
    maven: "mavencentral",
    nuget: "nuget",
    gem: "rubygems",
    crate: "cratesio",
    go: "golang",
  };
  return map[type.toLowerCase()] ?? type;
}

/** Parse namespace and name from the package name based on type */
function parseCoordinate(
  type: string,
  name: string,
): { namespace: string; name: string } {
  const lower = type.toLowerCase();

  // npm scoped packages: @scope/name → namespace=scope, name=name
  if (lower === "npm" && name.startsWith("@")) {
    const parts = name.slice(1).split("/");
    return { namespace: parts[0], name: parts.slice(1).join("/") };
  }

  // go modules: e.g. github.com/gin-gonic/gin → namespace=github.com/gin-gonic, name=gin
  if (lower === "go" && name.includes("/")) {
    const lastSlash = name.lastIndexOf("/");
    return {
      namespace: name.slice(0, lastSlash),
      name: name.slice(lastSlash + 1),
    };
  }

  // For pypi, gem, crate, nuget, unscoped npm: namespace is "-"
  return { namespace: "-", name };
}

// ---------------------------------------------------------------------------
// 1. license_lookup
// ---------------------------------------------------------------------------
const license_lookup: ToolDef = {
  name: "license_lookup",
  description:
    "Get curated license data for a software component from ClearlyDefined.",
  schema: z.object({
    type: z
      .string()
      .describe("Package type: npm, pypi, maven, nuget, gem, crate, go, etc."),
    name: z
      .string()
      .describe("Package name (use namespace/name for scoped packages)"),
    version: z.string().describe("Package version"),
  }),
  async execute(
    args: { type: string; name: string; version: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const provider = mapProvider(args.type);
    const coord = parseCoordinate(args.type, args.name);
    const path = `${args.type.toLowerCase()}/${provider}/${encodeURIComponent(coord.namespace)}/${encodeURIComponent(coord.name)}/${encodeURIComponent(args.version)}`;

    const cacheKey = `cd:${path}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${API}/definitions/${path}`);
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 2. license_batch
// ---------------------------------------------------------------------------
const license_batch: ToolDef = {
  name: "license_batch",
  description: "Batch license lookup for multiple components via ClearlyDefined.",
  schema: z.object({
    coordinates: z
      .array(z.string())
      .describe(
        "Array of ClearlyDefined coordinates, e.g. ['npm/npmjs/-/express/5.1.0', 'pypi/pypi/-/requests/2.31.0']",
      ),
  }),
  async execute(
    args: { coordinates: string[] },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const cacheKey = `cd-batch:${args.coordinates.sort().join(",")}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${API}/definitions`, {
      method: "POST",
      body: args.coordinates,
    });
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 3. license_search
// ---------------------------------------------------------------------------
const license_search: ToolDef = {
  name: "license_search",
  description: "Search ClearlyDefined for components by pattern.",
  schema: z.object({
    pattern: z
      .string()
      .describe("Search pattern, e.g. 'express' or 'react'"),
    type: z
      .string()
      .optional()
      .describe("Filter by type: npm, pypi, maven, etc."),
  }),
  async execute(
    args: { pattern: string; type?: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const params = new URLSearchParams({ pattern: args.pattern });
    if (args.type) params.set("type", args.type);

    const cacheKey = `cd-search:${params.toString()}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${API}/definitions?${params.toString()}`);
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const clearlydefinedTools: ToolDef[] = [
  license_lookup,
  license_batch,
  license_search,
];
