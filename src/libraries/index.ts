import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";
import { requireApiKey } from "../utils/require-key.js";

const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(15 * 60 * 1000);

const API = "https://libraries.io/api";

const librariesPackage: ToolDef = {
  name: "libraries_package",
  description:
    "Get package metadata from Libraries.io including repository info, versions, and popularity metrics",
  schema: z.object({
    platform: z
      .string()
      .describe(
        'Package platform, e.g. "NPM", "Pypi", "Cargo", "Go", "Maven", "NuGet", "Rubygems"',
      ),
    name: z.string().describe("Package name"),
  }),
  async execute(
    args: { platform: string; name: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const apiKey = requireApiKey(ctx.config.librariesApiKey, "Libraries.io", "LIBRARIES_API_KEY");
    const key = `pkg:${args.platform}:${args.name}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/${encodeURIComponent(args.platform)}/${encodeURIComponent(args.name)}?api_key=${apiKey}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const librariesDeps: ToolDef = {
  name: "libraries_deps",
  description:
    "Get dependencies for a specific package version from Libraries.io",
  schema: z.object({
    platform: z
      .string()
      .describe(
        'Package platform, e.g. "NPM", "Pypi", "Cargo", "Go", "Maven", "NuGet"',
      ),
    name: z.string().describe("Package name"),
    version: z.string().describe("Package version"),
  }),
  async execute(
    args: { platform: string; name: string; version: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const apiKey = requireApiKey(ctx.config.librariesApiKey, "Libraries.io", "LIBRARIES_API_KEY");
    const key = `deps:${args.platform}:${args.name}:${args.version}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/${encodeURIComponent(args.platform)}/${encodeURIComponent(args.name)}/${encodeURIComponent(args.version)}/dependencies?api_key=${apiKey}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const librariesDependents: ToolDef = {
  name: "libraries_dependents",
  description:
    "Get packages that depend on a specific package from Libraries.io",
  schema: z.object({
    platform: z
      .string()
      .describe(
        'Package platform, e.g. "NPM", "Pypi", "Cargo", "Go", "Maven", "NuGet"',
      ),
    name: z.string().describe("Package name"),
  }),
  async execute(
    args: { platform: string; name: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const apiKey = requireApiKey(ctx.config.librariesApiKey, "Libraries.io", "LIBRARIES_API_KEY");
    const key = `depnts:${args.platform}:${args.name}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/${encodeURIComponent(args.platform)}/${encodeURIComponent(args.name)}/dependents?api_key=${apiKey}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const librariesSourcerank: ToolDef = {
  name: "libraries_sourcerank",
  description:
    "Get the SourceRank quality score breakdown for a package from Libraries.io",
  schema: z.object({
    platform: z
      .string()
      .describe(
        'Package platform, e.g. "NPM", "Pypi", "Cargo", "Go", "Maven", "NuGet"',
      ),
    name: z.string().describe("Package name"),
  }),
  async execute(
    args: { platform: string; name: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const apiKey = requireApiKey(ctx.config.librariesApiKey, "Libraries.io", "LIBRARIES_API_KEY");
    const key = `sr:${args.platform}:${args.name}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/${encodeURIComponent(args.platform)}/${encodeURIComponent(args.name)}/sourcerank?api_key=${apiKey}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

export const librariesTools: ToolDef[] = [
  librariesPackage,
  librariesDeps,
  librariesDependents,
  librariesSourcerank,
];
