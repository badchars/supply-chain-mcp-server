import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch, apiFetchText } from "../utils/http.js";

const limiter = new RateLimiter(500);
const cache = new TTLCache<unknown>(300_000);

const SUSPICIOUS_PATTERNS = [
  /\bcurl\b/i,
  /\bwget\b/i,
  /\beval\b/,
  /\bexec\b/,
  /\bchild_process\b/,
  /\bpowershell\b/i,
  /\bbase64\b/i,
  /\b(nc|netcat)\b/,
  /\|\s*sh\b/,
  /\|\s*bash\b/,
  /\.sh\b/,
  /\bhttp[s]?:\/\//,
];

const LIFECYCLE_SCRIPTS = [
  "preinstall",
  "install",
  "postinstall",
  "preuninstall",
  "uninstall",
  "postuninstall",
  "prepare",
  "prepublish",
  "prepublishOnly",
];

const npmPackage: ToolDef = {
  name: "npm_package",
  description:
    "Fetch npm package metadata including description, latest version, maintainers, license, repository, homepage, and publish timeline.",
  schema: z.object({
    name: z.string().describe("npm package name, e.g. 'express' or '@scope/pkg'"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `pkg:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
      headers: { Accept: "application/json" },
    });

    const latest = data["dist-tags"]?.latest;
    const result = {
      name: data.name,
      description: data.description,
      latest,
      "dist-tags": data["dist-tags"],
      license: data.license,
      maintainers: data.maintainers,
      repository: data.repository,
      homepage: data.homepage,
      time: data.time,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const npmVersion: ToolDef = {
  name: "npm_version",
  description:
    "Fetch metadata for a specific npm package version including dependencies, dist info (tarball, shasum, integrity), scripts, and deprecation status.",
  schema: z.object({
    name: z.string().describe("npm package name"),
    version: z.string().describe("Exact semver version, e.g. '4.18.2'"),
  }),
  async execute(args, ctx) {
    const { name, version } = args;
    const cacheKey = `ver:${name}:${version}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://registry.npmjs.org/${encodeURIComponent(name)}/${version}`,
    );

    const result = {
      name: data.name,
      version: data.version,
      dependencies: data.dependencies,
      devDependencies: data.devDependencies,
      dist: data.dist,
      scripts: data.scripts,
      deprecated: data.deprecated ?? false,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const npmDownloads: ToolDef = {
  name: "npm_downloads",
  description:
    "Fetch npm download counts for a package over a given period (last-day, last-week, last-month).",
  schema: z.object({
    name: z.string().describe("npm package name"),
    period: z
      .enum(["last-day", "last-week", "last-month"])
      .default("last-month")
      .describe("Download count period"),
  }),
  async execute(args, ctx) {
    const { name, period } = args;
    const cacheKey = `dl:${name}:${period}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://api.npmjs.org/downloads/point/${period}/${encodeURIComponent(name)}`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const npmSearch: ToolDef = {
  name: "npm_search",
  description: "Search the npm registry for packages matching a query string.",
  schema: z.object({
    query: z.string().describe("Search query text"),
    limit: z.number().default(20).describe("Max number of results (default 20)"),
  }),
  async execute(args, ctx) {
    const { query, limit } = args;
    const cacheKey = `search:${query}:${limit}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=${limit}`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const npmMaintainers: ToolDef = {
  name: "npm_maintainers",
  description:
    "Extract maintainers and publish timeline from an npm package. Critical for detecting maintainer takeover attacks like the event-stream incident.",
  schema: z.object({
    name: z.string().describe("npm package name"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `maint:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
      headers: { Accept: "application/json" },
    });

    const result = {
      name: data.name,
      maintainers: data.maintainers ?? [],
      time: data.time ?? {},
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const npmScripts: ToolDef = {
  name: "npm_scripts",
  description:
    "Extract and analyze lifecycle scripts from a specific npm package version. Flags suspicious commands (curl, wget, eval, exec, etc.) commonly used in supply-chain attacks.",
  schema: z.object({
    name: z.string().describe("npm package name"),
    version: z.string().describe("Exact semver version"),
  }),
  async execute(args, ctx) {
    const { name, version } = args;
    const cacheKey = `scripts:${name}:${version}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://registry.npmjs.org/${encodeURIComponent(name)}/${version}`,
    );

    const scripts: Record<string, string> = data.scripts ?? {};
    const warnings: string[] = [];

    for (const [scriptName, scriptBody] of Object.entries(scripts)) {
      const isLifecycle = LIFECYCLE_SCRIPTS.includes(scriptName);
      for (const pattern of SUSPICIOUS_PATTERNS) {
        if (pattern.test(scriptBody)) {
          const severity = isLifecycle ? "HIGH" : "MEDIUM";
          warnings.push(
            `[${severity}] Script "${scriptName}" contains suspicious pattern: ${pattern.source}`,
          );
        }
      }
      if (isLifecycle && scriptBody.length > 0) {
        warnings.push(`[INFO] Lifecycle script "${scriptName}" is defined: ${scriptBody}`);
      }
    }

    const result = {
      name: data.name,
      version: data.version,
      scripts,
      lifecycleScripts: Object.fromEntries(
        Object.entries(scripts).filter(([k]) => LIFECYCLE_SCRIPTS.includes(k)),
      ),
      warnings,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const npmProvenance: ToolDef = {
  name: "npm_provenance",
  description:
    "Check whether an npm package version has Sigstore provenance attestations and signatures. Key for detecting unauthorized publishes like the Axios-style attacks.",
  schema: z.object({
    name: z.string().describe("npm package name"),
    version: z.string().describe("Exact semver version"),
  }),
  async execute(args, ctx) {
    const { name, version } = args;
    const cacheKey = `prov:${name}:${version}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://registry.npmjs.org/${encodeURIComponent(name)}/${version}`,
    );

    const dist = data.dist ?? {};
    const hasAttestations = !!dist.attestations;
    const hasSignatures = !!(dist.signatures && dist.signatures.length > 0);

    const result = {
      name: data.name,
      version: data.version,
      hasProvenance: hasAttestations,
      hasSignatures,
      attestations: dist.attestations ?? null,
      signatures: dist.signatures ?? null,
      integrity: dist.integrity ?? null,
      shasum: dist.shasum ?? null,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const npmAuditBulk: ToolDef = {
  name: "npm_audit_bulk",
  description:
    'Bulk query npm security advisories for a set of packages and versions. Provide an object mapping package names to version arrays, e.g. {"express":["4.17.1"]}.',
  schema: z.object({
    packages: z
      .record(z.string(), z.array(z.string()))
      .describe(
        'Object of package names to arrays of versions, e.g. {"express":["4.17.1"]}',
      ),
  }),
  async execute(args, ctx) {
    const { packages } = args;

    await limiter.acquire();
    const data = await apiFetch(
      "https://registry.npmjs.org/-/npm/v1/security/advisories/bulk",
      {
        method: "POST",
        body: packages,
      },
    );

    return json(data);
  },
};

const npmAttestations: ToolDef = {
  name: "npm_attestations",
  description:
    "Fetch full Sigstore attestation bundles for an npm package version. Returns SLSA provenance and publish attestations when available.",
  schema: z.object({
    name: z.string().describe("npm package name, e.g. 'express' or '@scope/pkg'"),
    version: z.string().describe("Exact semver version, e.g. '4.18.2'"),
  }),
  async execute(args, ctx) {
    const { name, version } = args;
    const cacheKey = `attest:${name}:${version}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://registry.npmjs.org/-/npm/v1/attestations/${encodeURIComponent(name)}@${encodeURIComponent(version)}`,
    );
    cache.set(cacheKey, data);
    return json(data);
  },
};

const npmDownloadRange: ToolDef = {
  name: "npm_download_range",
  description:
    "Get day-by-day npm download counts for a date range. Useful for detecting download anomalies or sudden spikes that may indicate dependency confusion attacks.",
  schema: z.object({
    name: z.string().describe("npm package name"),
    start: z.string().describe("Start date in YYYY-MM-DD format"),
    end: z.string().describe("End date in YYYY-MM-DD format"),
  }),
  async execute(args, ctx) {
    const { name, start, end } = args;
    const cacheKey = `dlrange:${name}:${start}:${end}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://api.npmjs.org/downloads/range/${start}:${end}/${encodeURIComponent(name)}`,
    );
    cache.set(cacheKey, data);
    return json(data);
  },
};

export const npmTools: ToolDef[] = [
  npmPackage,
  npmVersion,
  npmDownloads,
  npmSearch,
  npmMaintainers,
  npmScripts,
  npmProvenance,
  npmAuditBulk,
  npmAttestations,
  npmDownloadRange,
];
