import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch, apiFetchText } from "../utils/http.js";

const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(600_000);

const CRATES_BASE = "https://crates.io/api/v1/crates";
const CRATES_HEADERS = {
  "User-Agent": "supply-chain-mcp (https://github.com/AumLabs/supply-chain-mcp)",
};

const crateInfo: ToolDef = {
  name: "crate_info",
  description:
    "Fetch crates.io crate metadata including description, download counts, max version, repository, homepage, categories, and keywords.",
  schema: z.object({
    name: z.string().describe("Crate name, e.g. 'serde' or 'tokio'"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `info:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${CRATES_BASE}/${encodeURIComponent(name)}`, {
      headers: CRATES_HEADERS,
    });

    const crate = data.crate ?? {};
    const result = {
      name: crate.name,
      description: crate.description,
      downloads: crate.downloads,
      recent_downloads: crate.recent_downloads,
      max_version: crate.max_version,
      max_stable_version: crate.max_stable_version,
      repository: crate.repository,
      homepage: crate.homepage,
      documentation: crate.documentation,
      categories: (data.categories ?? []).map((c: Record<string, unknown>) => c.category),
      keywords: (data.keywords ?? []).map((k: Record<string, unknown>) => k.keyword),
      created_at: crate.created_at,
      updated_at: crate.updated_at,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const crateVersions: ToolDef = {
  name: "crate_versions",
  description:
    "List all versions of a crate with version number, yanked status, license, crate size, creation date, and download count.",
  schema: z.object({
    name: z.string().describe("Crate name"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `vers:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${CRATES_BASE}/${encodeURIComponent(name)}/versions`, {
      headers: CRATES_HEADERS,
    });

    const versions = (data.versions ?? []).map((v: Record<string, unknown>) => ({
      num: v.num,
      yanked: v.yanked,
      license: v.license,
      crate_size: v.crate_size,
      created_at: v.created_at,
      downloads: v.downloads,
      rust_version: v.rust_version,
    }));

    const result = {
      name,
      total_versions: versions.length,
      versions,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const crateDeps: ToolDef = {
  name: "crate_deps",
  description:
    "Fetch dependencies for a specific crate version including dependency kind (normal/dev/build), version requirement, and optional flag.",
  schema: z.object({
    name: z.string().describe("Crate name"),
    version: z.string().describe("Exact version, e.g. '1.0.193'"),
  }),
  async execute(args, ctx) {
    const { name, version } = args;
    const cacheKey = `deps:${name}:${version}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${CRATES_BASE}/${encodeURIComponent(name)}/${version}/dependencies`,
      { headers: CRATES_HEADERS },
    );

    const deps = (data.dependencies ?? []).map((d: Record<string, unknown>) => ({
      crate_id: d.crate_id,
      kind: d.kind,
      req: d.req,
      optional: d.optional,
      default_features: d.default_features,
      features: d.features,
    }));

    const result = {
      name,
      version,
      total_dependencies: deps.length,
      dependencies: deps,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const crateOwners: ToolDef = {
  name: "crate_owners",
  description:
    "List owners of a crate on crates.io including login, name, URL, and kind (user/team). Useful for detecting ownership changes.",
  schema: z.object({
    name: z.string().describe("Crate name"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `own:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${CRATES_BASE}/${encodeURIComponent(name)}/owners`, {
      headers: CRATES_HEADERS,
    });

    const users = (data.users ?? []).map((u: Record<string, unknown>) => ({
      id: u.id,
      login: u.login,
      name: u.name,
      url: u.url,
      kind: u.kind,
      avatar: u.avatar,
    }));

    const result = {
      name,
      owners: users,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

export const cratesTools: ToolDef[] = [crateInfo, crateVersions, crateDeps, crateOwners];
