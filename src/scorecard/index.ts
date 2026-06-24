import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const limiter = new RateLimiter(1000);
const cache = new TTLCache<unknown>(30 * 60 * 1000);

const API = "https://api.securityscorecards.dev";

const scorecardRepo: ToolDef = {
  name: "scorecard_repo",
  description:
    "Get the OpenSSF Scorecard security score for a GitHub repository, including individual check results",
  schema: z.object({
    owner: z.string().describe("GitHub repository owner"),
    repo: z.string().describe("GitHub repository name"),
  }),
  async execute(
    args: { owner: string; repo: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `sc:${args.owner}/${args.repo}`;
    const cached = cache.get(key);
    if (cached) return json(cached);

    await limiter.acquire();
    const headers: Record<string, string> = {};
    if (ctx.config.githubToken) {
      headers["Authorization"] = `Bearer ${ctx.config.githubToken}`;
    }
    const data = await apiFetch(
      `${API}/projects/github.com/${encodeURIComponent(args.owner)}/${encodeURIComponent(args.repo)}`,
      { headers },
    );
    cache.set(key, data);
    return json(data);
  },
};

const scorecardCompare: ToolDef = {
  name: "scorecard_compare",
  description:
    "Compare OpenSSF Scorecard security scores across 2-5 GitHub repositories side by side",
  schema: z.object({
    repos: z
      .array(
        z.object({
          owner: z.string().describe("GitHub repository owner"),
          repo: z.string().describe("GitHub repository name"),
        }),
      )
      .min(2)
      .max(5)
      .describe("Array of {owner, repo} objects to compare (2-5 repos)"),
  }),
  async execute(
    args: { repos: Array<{ owner: string; repo: string }> },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const headers: Record<string, string> = {};
    if (ctx.config.githubToken) {
      headers["Authorization"] = `Bearer ${ctx.config.githubToken}`;
    }

    const results = await Promise.allSettled(
      args.repos.map(async (r) => {
        const cacheKey = `sc:${r.owner}/${r.repo}`;
        const cached = cache.get(cacheKey);
        if (cached) return { repo: `${r.owner}/${r.repo}`, data: cached as Record<string, unknown> };

        await limiter.acquire();
        const data = await apiFetch(
          `${API}/projects/github.com/${encodeURIComponent(r.owner)}/${encodeURIComponent(r.repo)}`,
          { headers },
        );
        cache.set(cacheKey, data);
        return { repo: `${r.owner}/${r.repo}`, data: data as Record<string, unknown> };
      }),
    );

    const comparison: Array<{
      repo: string;
      score: number | string;
      checks: Record<string, number | string>;
      error?: string;
    }> = [];

    for (const result of results) {
      if (result.status === "fulfilled") {
        const { repo, data } = result.value;
        const checks: Record<string, number | string> = {};
        if (Array.isArray(data.checks)) {
          for (const check of data.checks as Array<{ name: string; score: number }>) {
            checks[check.name] = check.score;
          }
        }
        comparison.push({
          repo,
          score: (data.score as number) ?? "N/A",
          checks,
        });
      } else {
        comparison.push({
          repo: "unknown",
          score: "N/A",
          checks: {},
          error: result.reason?.message ?? String(result.reason),
        });
      }
    }

    // Build a text comparison table
    const allChecks = new Set<string>();
    for (const entry of comparison) {
      for (const checkName of Object.keys(entry.checks)) {
        allChecks.add(checkName);
      }
    }

    const lines: string[] = [];
    const repoNames = comparison.map((c) => c.repo);
    const header = ["Check", ...repoNames];
    lines.push(header.join(" | "));
    lines.push(header.map((h) => "-".repeat(h.length)).join(" | "));

    lines.push(
      ["Overall Score", ...comparison.map((c) => String(c.score))].join(" | "),
    );

    for (const check of [...allChecks].sort()) {
      const row = [
        check,
        ...comparison.map((c) => String(c.checks[check] ?? "N/A")),
      ];
      lines.push(row.join(" | "));
    }

    for (const entry of comparison) {
      if (entry.error) {
        lines.push(`\nError for ${entry.repo}: ${entry.error}`);
      }
    }

    return text(lines.join("\n"));
  },
};

export const scorecardTools: ToolDef[] = [scorecardRepo, scorecardCompare];
