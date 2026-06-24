import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const limiter = new RateLimiter(200);
const cache = new TTLCache<unknown>(15 * 60 * 1000);

const API = "https://api.deps.dev/v3alpha";

function mapEcosystem(eco: string): string {
  const map: Record<string, string> = {
    npm: "NPM",
    pypi: "PYPI",
    cargo: "CARGO",
    go: "GO",
    maven: "MAVEN",
    nuget: "NUGET",
    pip: "PYPI",
  };
  return map[eco.toLowerCase()] ?? eco.toUpperCase();
}

const depsPackage: ToolDef = {
  name: "deps_package",
  description:
    "Look up a package on deps.dev to get metadata, versions, and security information",
  schema: z.object({
    ecosystem: z
      .string()
      .describe("Package ecosystem (npm, pypi, cargo, go, maven, nuget)"),
    name: z.string().describe("Package name"),
  }),
  async execute(
    args: { ecosystem: string; name: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const eco = mapEcosystem(args.ecosystem);
    const key = `pkg:${eco}:${args.name}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const encoded = encodeURIComponent(args.name);
    const data = await apiFetch(`${API}/systems/${eco}/packages/${encoded}`);
    cache.set(key, data);
    return json(data);
  },
};

const depsVersion: ToolDef = {
  name: "deps_version",
  description:
    "Get detailed info about a specific package version from deps.dev including links, licenses, and advisories",
  schema: z.object({
    ecosystem: z
      .string()
      .describe("Package ecosystem (npm, pypi, cargo, go, maven, nuget)"),
    name: z.string().describe("Package name"),
    version: z.string().describe("Package version"),
  }),
  async execute(
    args: { ecosystem: string; name: string; version: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const eco = mapEcosystem(args.ecosystem);
    const key = `ver:${eco}:${args.name}:${args.version}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const encoded = encodeURIComponent(args.name);
    const data = await apiFetch(
      `${API}/systems/${eco}/packages/${encoded}/versions/${encodeURIComponent(args.version)}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const depsDependencies: ToolDef = {
  name: "deps_dependencies",
  description:
    "Get the dependency tree for a specific package version from deps.dev",
  schema: z.object({
    ecosystem: z
      .string()
      .describe("Package ecosystem (npm, pypi, cargo, go, maven, nuget)"),
    name: z.string().describe("Package name"),
    version: z.string().describe("Package version"),
  }),
  async execute(
    args: { ecosystem: string; name: string; version: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const eco = mapEcosystem(args.ecosystem);
    const key = `deps:${eco}:${args.name}:${args.version}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const encoded = encodeURIComponent(args.name);
    const data = await apiFetch(
      `${API}/systems/${eco}/packages/${encoded}/versions/${encodeURIComponent(args.version)}:dependencies`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const depsDependents: ToolDef = {
  name: "deps_dependents",
  description:
    "Get packages that depend on a specific package version from deps.dev",
  schema: z.object({
    ecosystem: z
      .string()
      .describe("Package ecosystem (npm, pypi, cargo, go, maven, nuget)"),
    name: z.string().describe("Package name"),
    version: z.string().describe("Package version"),
  }),
  async execute(
    args: { ecosystem: string; name: string; version: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const eco = mapEcosystem(args.ecosystem);
    const key = `depnts:${eco}:${args.name}:${args.version}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const encoded = encodeURIComponent(args.name);
    const data = await apiFetch(
      `${API}/systems/${eco}/packages/${encoded}/versions/${encodeURIComponent(args.version)}:dependents`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const depsAdvisory: ToolDef = {
  name: "deps_advisory",
  description:
    "Fetch a security advisory by key (e.g. GHSA-xxxx-xxxx-xxxx) from deps.dev",
  schema: z.object({
    key: z
      .string()
      .describe('Advisory key, e.g. "GHSA-xxxx-xxxx-xxxx" or CVE ID'),
  }),
  async execute(
    args: { key: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `adv:${args.key}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/advisories/${encodeURIComponent(args.key)}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const depsProject: ToolDef = {
  name: "deps_project",
  description:
    "Get project information from deps.dev by repository URL (e.g. github.com/expressjs/express)",
  schema: z.object({
    url: z
      .string()
      .describe(
        'Repository URL without https:// prefix, e.g. "github.com/expressjs/express"',
      ),
  }),
  async execute(
    args: { url: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `proj:${args.url}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/projects/${encodeURIComponent(args.url)}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const depsQuery: ToolDef = {
  name: "deps_query",
  description:
    "Look up a package by its SHA256 artifact hash on deps.dev",
  schema: z.object({
    hash: z.string().describe("SHA256 hash of the package artifact"),
  }),
  async execute(
    args: { hash: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `hash:${args.hash}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/query?hash.type=sha256&hash.value=${encodeURIComponent(args.hash)}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const depsRequirements: ToolDef = {
  name: "deps_requirements",
  description:
    "Get the requirements (version constraints) for a specific package version from deps.dev",
  schema: z.object({
    ecosystem: z
      .string()
      .describe("Package ecosystem (npm, pypi, cargo, go, maven, nuget)"),
    name: z.string().describe("Package name"),
    version: z.string().describe("Package version"),
  }),
  async execute(
    args: { ecosystem: string; name: string; version: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const eco = mapEcosystem(args.ecosystem);
    const key = `req:${eco}:${args.name}:${args.version}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const encoded = encodeURIComponent(args.name);
    const data = await apiFetch(
      `${API}/systems/${eco}/packages/${encoded}/versions/${encodeURIComponent(args.version)}:requirements`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const depsSimilarPackages: ToolDef = {
  name: "deps_similar_packages",
  description:
    "Find similarly named packages on deps.dev for typosquatting detection. Useful for verifying you're using the legitimate package.",
  schema: z.object({
    ecosystem: z
      .string()
      .describe("Package ecosystem (npm, pypi, cargo, go, maven, nuget)"),
    name: z.string().describe("Package name to find similar names for"),
  }),
  async execute(
    args: { ecosystem: string; name: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const eco = mapEcosystem(args.ecosystem);
    const key = `similar:${eco}:${args.name}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const encoded = encodeURIComponent(args.name);
    const data = await apiFetch(
      `${API}/systems/${eco}/packages/${encoded}:similarlyNamedPackages`,
    );
    cache.set(key, data);
    return json(data);
  },
};

const depsPurlLookup: ToolDef = {
  name: "deps_purl_lookup",
  description:
    "Look up a package by Package URL (purl) on deps.dev. Purl format: pkg:ecosystem/name@version",
  schema: z.object({
    purl: z
      .string()
      .describe(
        "Package URL, e.g. 'pkg:npm/express@4.18.2' or 'pkg:pypi/requests@2.31.0'",
      ),
  }),
  async execute(
    args: { purl: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `purl:${args.purl}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/purl/${encodeURIComponent(args.purl)}`,
    );
    cache.set(key, data);
    return json(data);
  },
};

export const depsdevTools: ToolDef[] = [
  depsPackage,
  depsVersion,
  depsDependencies,
  depsDependents,
  depsAdvisory,
  depsProject,
  depsQuery,
  depsRequirements,
  depsSimilarPackages,
  depsPurlLookup,
];
