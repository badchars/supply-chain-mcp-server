import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch, apiFetchText } from "../utils/http.js";

const limiter = new RateLimiter(500);
const cache = new TTLCache<unknown>(900_000);

/**
 * Encode a Go module path for the module proxy.
 * The proxy uses lowercased paths with `!` prefix for uppercase letters.
 * e.g. github.com/Azure → github.com/!azure
 */
function encodeModulePath(mod: string): string {
  return mod.replace(/[A-Z]/g, (c) => `!${c.toLowerCase()}`);
}

const PROXY_BASE = "https://proxy.golang.org";
const SUM_BASE = "https://sum.golang.org";

const goModule: ToolDef = {
  name: "go_module",
  description:
    "Fetch Go module info from the module proxy: latest version and all available versions. Module paths are automatically encoded for the proxy.",
  schema: z.object({
    module: z
      .string()
      .describe("Go module path, e.g. 'golang.org/x/net' or 'github.com/gin-gonic/gin'"),
  }),
  async execute(args, ctx) {
    const { module } = args;
    const cacheKey = `mod:${module}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    const encoded = encodeModulePath(module);

    await limiter.acquire();

    const [versionListText, latestData] = await Promise.all([
      apiFetchText(`${PROXY_BASE}/${encoded}/@v/list`),
      apiFetch(`${PROXY_BASE}/${encoded}/@latest`),
    ]);

    const versions = versionListText
      .split("\n")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    const result = {
      module,
      latest: {
        version: latestData.Version,
        time: latestData.Time,
      },
      versions,
      total_versions: versions.length,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const goVersion: ToolDef = {
  name: "go_version",
  description:
    "Fetch info and go.mod contents for a specific Go module version. Returns version metadata and parsed dependency list from go.mod.",
  schema: z.object({
    module: z.string().describe("Go module path"),
    version: z.string().describe("Version string, e.g. 'v1.20.0'"),
  }),
  async execute(args, ctx) {
    const { module, version } = args;
    const cacheKey = `ver:${module}:${version}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    const encoded = encodeModulePath(module);

    await limiter.acquire();

    const [infoData, modText] = await Promise.all([
      apiFetch(`${PROXY_BASE}/${encoded}/@v/${version}.info`),
      apiFetchText(`${PROXY_BASE}/${encoded}/@v/${version}.mod`),
    ]);

    // Parse go.mod to extract require directives
    const requires: Array<{ path: string; version: string }> = [];
    const replaces: Array<{ from: string; to: string }> = [];
    let goVersion: string | null = null;

    const lines = modText.split("\n");
    let inRequireBlock = false;
    let inReplaceBlock = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("go ")) {
        goVersion = trimmed.replace("go ", "").trim();
        continue;
      }

      if (trimmed === "require (") {
        inRequireBlock = true;
        continue;
      }
      if (trimmed === "replace (") {
        inReplaceBlock = true;
        continue;
      }
      if (trimmed === ")") {
        inRequireBlock = false;
        inReplaceBlock = false;
        continue;
      }

      if (inRequireBlock) {
        const parts = trimmed.split(/\s+/);
        if (parts.length >= 2) {
          requires.push({ path: parts[0], version: parts[1] });
        }
      } else if (inReplaceBlock) {
        const parts = trimmed.split(/\s*=>\s*/);
        if (parts.length === 2) {
          replaces.push({ from: parts[0].trim(), to: parts[1].trim() });
        }
      } else if (trimmed.startsWith("require ")) {
        const parts = trimmed.replace("require ", "").trim().split(/\s+/);
        if (parts.length >= 2) {
          requires.push({ path: parts[0], version: parts[1] });
        }
      } else if (trimmed.startsWith("replace ")) {
        const parts = trimmed.replace("replace ", "").trim().split(/\s*=>\s*/);
        if (parts.length === 2) {
          replaces.push({ from: parts[0].trim(), to: parts[1].trim() });
        }
      }
    }

    const result = {
      module,
      version: infoData.Version,
      time: infoData.Time,
      goVersion,
      requires,
      replaces,
      goModRaw: modText,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const goSum: ToolDef = {
  name: "go_sum",
  description:
    "Look up a Go module version in the checksum database (sum.golang.org) for hash verification. Returns the checksum database entry.",
  schema: z.object({
    module: z.string().describe("Go module path"),
    version: z.string().describe("Version string, e.g. 'v1.20.0'"),
  }),
  async execute(args, ctx) {
    const { module, version } = args;
    const cacheKey = `sum:${module}:${version}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    const encoded = encodeModulePath(module);

    await limiter.acquire();
    const sumText = await apiFetchText(`${SUM_BASE}/lookup/${encoded}@${version}`);

    const lines = sumText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const result = {
      module,
      version,
      raw: sumText,
      lines,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

export const goTools: ToolDef[] = [goModule, goVersion, goSum];
