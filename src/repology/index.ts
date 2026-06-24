import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const API = "https://repology.org/api/v1";
const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(1_800_000);

// ---------------------------------------------------------------------------
// 1. repology_project
// ---------------------------------------------------------------------------
const repology_project: ToolDef = {
  name: "repology_project",
  description:
    "Get package versions across all Linux distributions from Repology.",
  schema: z.object({
    name: z.string().describe("Project name, e.g. 'nginx' or 'python'"),
  }),
  async execute(
    args: { name: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const cacheKey = `repology:${args.name}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/project/${encodeURIComponent(args.name)}`,
    );
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 2. repology_problems
// ---------------------------------------------------------------------------
const repology_problems: ToolDef = {
  name: "repology_problems",
  description:
    "Find packaging problems/issues for a repository on Repology.",
  schema: z.object({
    repo: z
      .string()
      .describe(
        "Repository name, e.g. 'ubuntu_24' or 'fedora_40' or 'homebrew'",
      ),
  }),
  async execute(
    args: { repo: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const cacheKey = `repology-problems:${args.repo}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/repository/${encodeURIComponent(args.repo)}/problems`,
    );
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 3. repology_search
// ---------------------------------------------------------------------------
const repology_search: ToolDef = {
  name: "repology_search",
  description: "Search Repology projects by name.",
  schema: z.object({
    query: z.string().describe("Search query for project name"),
  }),
  async execute(
    args: { query: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const cacheKey = `repology-search:${args.query}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/projects/?search=${encodeURIComponent(args.query)}`,
    );
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const repologyTools: ToolDef[] = [
  repology_project,
  repology_problems,
  repology_search,
];
