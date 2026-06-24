import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const BASE = "https://api.first.org/data/v1/epss";
const limiter = new RateLimiter(500);
const cache = new TTLCache<unknown>(30 * 60_000);

// ---------------------------------------------------------------------------
// 1. epss_score
// ---------------------------------------------------------------------------
const epss_score: ToolDef = {
  name: "epss_score",
  description:
    "Get EPSS exploit probability and percentile for a single CVE ID.",
  schema: z.object({
    cve_id: z.string().describe("CVE ID, e.g. 'CVE-2024-3094'"),
  }),
  async execute(
    args: { cve_id: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `score:${args.cve_id}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(
      `${BASE}?cve=${encodeURIComponent(args.cve_id)}`,
    );

    const entry = data?.data?.[0];
    if (!entry) return text(`No EPSS data found for ${args.cve_id}`);

    cache.set(key, entry);
    return json(entry);
  },
};

// ---------------------------------------------------------------------------
// 2. epss_batch
// ---------------------------------------------------------------------------
const epss_batch: ToolDef = {
  name: "epss_batch",
  description:
    "Batch EPSS scores for multiple CVEs (up to 100) in a single request.",
  schema: z.object({
    cve_ids: z.array(z.string()).describe("Array of CVE IDs (max 100)"),
  }),
  async execute(
    args: { cve_ids: string[] },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const ids = args.cve_ids.slice(0, 100);
    const key = `batch:${ids.join(",")}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(`${BASE}?cve=${ids.join(",")}`);

    cache.set(key, data?.data);
    return json(data?.data);
  },
};

// ---------------------------------------------------------------------------
// 3. epss_top
// ---------------------------------------------------------------------------
const epss_top: ToolDef = {
  name: "epss_top",
  description:
    "Get the highest EPSS-scoring CVEs (most likely to be exploited).",
  schema: z.object({
    limit: z
      .number()
      .default(25)
      .describe("Number of results (default 25, max 100)"),
  }),
  async execute(
    args: { limit: number },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const limit = Math.min(args.limit ?? 25, 100);
    const key = `top:${limit}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(`${BASE}?order=!epss&limit=${limit}`);

    cache.set(key, data?.data);
    return json(data?.data);
  },
};

// ---------------------------------------------------------------------------
// 4. epss_above_threshold
// ---------------------------------------------------------------------------
const epss_above_threshold: ToolDef = {
  name: "epss_above_threshold",
  description:
    "Find CVEs with EPSS score above a given threshold.",
  schema: z.object({
    threshold: z
      .number()
      .describe("EPSS threshold (0-1), e.g. 0.5 for top 50%"),
    limit: z
      .number()
      .default(50)
      .describe("Max results (default 50)"),
  }),
  async execute(
    args: { threshold: number; limit: number },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const limit = args.limit ?? 50;
    const key = `above:${args.threshold}:${limit}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(
      `${BASE}?epss-gt=${args.threshold}&limit=${limit}`,
    );

    cache.set(key, data?.data);
    return json(data?.data);
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const epssTools: ToolDef[] = [
  epss_score,
  epss_batch,
  epss_top,
  epss_above_threshold,
];
