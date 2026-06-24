import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch, apiFetchText } from "../utils/http.js";

const limiter = new RateLimiter(500);
const cache = new TTLCache<unknown>(300_000);

const pypiPackage: ToolDef = {
  name: "pypi_package",
  description:
    "Fetch PyPI package metadata including author, license, summary, project URLs, classifiers, and Python version requirements.",
  schema: z.object({
    name: z.string().describe("PyPI package name, e.g. 'requests' or 'django'"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `pkg:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`https://pypi.org/pypi/${encodeURIComponent(name)}/json`);

    const info = data.info ?? {};
    const result = {
      name: info.name,
      summary: info.summary,
      version: info.version,
      author: info.author,
      author_email: info.author_email,
      maintainer: info.maintainer,
      maintainer_email: info.maintainer_email,
      license: info.license,
      requires_python: info.requires_python,
      project_urls: info.project_urls,
      classifiers: info.classifiers,
      homepage: info.home_page,
      package_url: info.package_url,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const pypiVersion: ToolDef = {
  name: "pypi_version",
  description:
    "Fetch metadata for a specific PyPI package version including release URLs with upload times, file sizes, digests, and yanked status.",
  schema: z.object({
    name: z.string().describe("PyPI package name"),
    version: z.string().describe("Exact version string, e.g. '2.31.0'"),
  }),
  async execute(args, ctx) {
    const { name, version } = args;
    const cacheKey = `ver:${name}:${version}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `https://pypi.org/pypi/${encodeURIComponent(name)}/${version}/json`,
    );

    const info = data.info ?? {};
    const urls = (data.urls ?? []).map((u: Record<string, unknown>) => ({
      filename: u.filename,
      packagetype: u.packagetype,
      upload_time: u.upload_time,
      size: u.size,
      digests: u.digests,
      yanked: u.yanked ?? false,
      yanked_reason: u.yanked_reason ?? null,
      url: u.url,
    }));

    const result = {
      name: info.name,
      version: info.version,
      summary: info.summary,
      author: info.author,
      license: info.license,
      requires_python: info.requires_python,
      requires_dist: info.requires_dist,
      urls,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const pypiReleases: ToolDef = {
  name: "pypi_releases",
  description:
    "List all releases of a PyPI package with upload dates, sizes, and yanked status. Useful for detecting suspicious rapid version bumps or yanked releases.",
  schema: z.object({
    name: z.string().describe("PyPI package name"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `rel:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`https://pypi.org/pypi/${encodeURIComponent(name)}/json`);

    const releases: Record<string, unknown[]> = data.releases ?? {};
    const parsed: Record<string, unknown> = {};

    for (const [ver, files] of Object.entries(releases)) {
      const fileArray = files as Array<Record<string, unknown>>;
      if (fileArray.length === 0) {
        parsed[ver] = { files: [], upload_time: null, yanked: false };
        continue;
      }
      parsed[ver] = {
        upload_time: fileArray[0]?.upload_time ?? null,
        size: fileArray.reduce((sum, f) => sum + ((f.size as number) ?? 0), 0),
        yanked: fileArray[0]?.yanked ?? false,
        yanked_reason: fileArray[0]?.yanked_reason ?? null,
        file_count: fileArray.length,
      };
    }

    const result = {
      name: data.info?.name ?? name,
      total_releases: Object.keys(parsed).length,
      releases: parsed,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

const pypiMaintainers: ToolDef = {
  name: "pypi_maintainers",
  description:
    "Extract author and maintainer information from a PyPI package. Useful for detecting ownership changes or suspicious maintainer patterns.",
  schema: z.object({
    name: z.string().describe("PyPI package name"),
  }),
  async execute(args, ctx) {
    const { name } = args;
    const cacheKey = `maint:${name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`https://pypi.org/pypi/${encodeURIComponent(name)}/json`);

    const info = data.info ?? {};
    const result = {
      name: info.name,
      author: info.author ?? null,
      author_email: info.author_email ?? null,
      maintainer: info.maintainer ?? null,
      maintainer_email: info.maintainer_email ?? null,
      project_urls: info.project_urls ?? {},
      homepage: info.home_page ?? null,
      package_url: info.package_url ?? null,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

export const pypiTools: ToolDef[] = [
  pypiPackage,
  pypiVersion,
  pypiReleases,
  pypiMaintainers,
];
