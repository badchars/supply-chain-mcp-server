import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const API = "https://www.bestpractices.dev";
const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(1_800_000);

// ---------------------------------------------------------------------------
// 1. badge_project
// ---------------------------------------------------------------------------
const badge_project: ToolDef = {
  name: "badge_project",
  description:
    "Get OpenSSF Best Practices badge status and criteria for a project by ID.",
  schema: z.object({
    id: z.number().describe("Best Practices project ID number"),
  }),
  async execute(
    args: { id: number },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const cacheKey = `badge:${args.id}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${API}/projects/${args.id}.json`);
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 2. badge_search
// ---------------------------------------------------------------------------
const badge_search: ToolDef = {
  name: "badge_search",
  description: "Search OpenSSF Best Practices badge projects.",
  schema: z.object({
    query: z.string().describe("Search query (project name or keyword)"),
  }),
  async execute(
    args: { query: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const cacheKey = `badge-search:${args.query}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/projects.json?q=${encodeURIComponent(args.query)}`,
    );
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 3. badge_by_repo
// ---------------------------------------------------------------------------
const badge_by_repo: ToolDef = {
  name: "badge_by_repo",
  description:
    "Find OpenSSF Best Practices badge by GitHub repository URL.",
  schema: z.object({
    repo_url: z
      .string()
      .describe(
        "GitHub repository URL, e.g. 'https://github.com/kubernetes/kubernetes'",
      ),
  }),
  async execute(
    args: { repo_url: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const cacheKey = `badge-repo:${args.repo_url}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${API}/projects.json?pq=${encodeURIComponent(args.repo_url)}`,
    );
    cache.set(cacheKey, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const badgeTools: ToolDef[] = [
  badge_project,
  badge_search,
  badge_by_repo,
];
