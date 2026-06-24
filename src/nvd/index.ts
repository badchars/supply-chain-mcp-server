import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const BASE = "https://services.nvd.nist.gov/rest/json/cves/2.0";
const limiter = new RateLimiter(6000);
const cache = new TTLCache<unknown>(30 * 60_000);

function nvdHeaders(ctx: ToolContext): Record<string, string> {
  const headers: Record<string, string> = {};
  if (ctx.config.nvdApiKey) {
    headers["apiKey"] = ctx.config.nvdApiKey;
  }
  return headers;
}

// ---------------------------------------------------------------------------
// 1. nvd_cve
// ---------------------------------------------------------------------------
const nvd_cve: ToolDef = {
  name: "nvd_cve",
  description:
    "Fetch full CVE details from NVD (NIST National Vulnerability Database) by CVE ID.",
  schema: z.object({
    cve_id: z
      .string()
      .describe("CVE identifier (e.g. CVE-2023-44487)"),
  }),
  async execute(
    args: { cve_id: string },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const key = `cve:${args.cve_id}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const params = new URLSearchParams();
    params.set("cveId", args.cve_id);

    const data = await apiFetch(`${BASE}?${params.toString()}`, {
      headers: nvdHeaders(ctx),
    });

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 2. nvd_search
// ---------------------------------------------------------------------------
const nvd_search: ToolDef = {
  name: "nvd_search",
  description:
    "Search NVD for CVEs by keyword and optional CVSS v3 severity.",
  schema: z.object({
    keyword: z.string().describe("Search keyword (e.g. 'log4j', 'xss nginx')"),
    severity: z
      .string()
      .optional()
      .describe("CVSS v3 severity filter (LOW, MEDIUM, HIGH, CRITICAL)"),
    results_per_page: z
      .number()
      .optional()
      .default(25)
      .describe("Number of results to return (default 25)"),
  }),
  async execute(
    args: { keyword: string; severity?: string; results_per_page?: number },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const params = new URLSearchParams();
    params.set("keywordSearch", args.keyword);
    if (args.severity) params.set("cvssV3Severity", args.severity);
    params.set("resultsPerPage", String(args.results_per_page ?? 25));

    const key = `search:${params.toString()}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(`${BASE}?${params.toString()}`, {
      headers: nvdHeaders(ctx),
    });

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// 3. nvd_recent
// ---------------------------------------------------------------------------
const nvd_recent: ToolDef = {
  name: "nvd_recent",
  description:
    "Fetch recently published CVEs from NVD within a given number of days.",
  schema: z.object({
    days: z
      .number()
      .optional()
      .default(7)
      .describe("Number of days back to search (default 7)"),
    results_per_page: z
      .number()
      .optional()
      .default(25)
      .describe("Number of results to return (default 25)"),
  }),
  async execute(
    args: { days?: number; results_per_page?: number },
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const days = args.days ?? 7;
    const resultsPerPage = args.results_per_page ?? 25;

    const pubStartDate = new Date(
      Date.now() - days * 86_400_000,
    ).toISOString();
    const pubEndDate = new Date().toISOString();

    const params = new URLSearchParams();
    params.set("pubStartDate", pubStartDate);
    params.set("pubEndDate", pubEndDate);
    params.set("resultsPerPage", String(resultsPerPage));

    const key = `recent:${days}:${resultsPerPage}`;
    const hit = cache.get(key);
    if (hit) return json(hit);

    await limiter.acquire();

    const data = await apiFetch(`${BASE}?${params.toString()}`, {
      headers: nvdHeaders(ctx),
    });

    cache.set(key, data);
    return json(data);
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const nvdTools: ToolDef[] = [nvd_cve, nvd_search, nvd_recent];
