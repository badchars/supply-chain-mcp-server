import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const CATALOG_URL =
  "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";
const limiter = new RateLimiter(2000);
const cache = new TTLCache<unknown>(60 * 60_000);

interface KevEntry {
  cveID: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction: string;
  dueDate: string;
  knownRansomwareCampaignUse: string;
  notes: string;
}

interface KevCatalog {
  title: string;
  catalogVersion: string;
  dateReleased: string;
  count: number;
  vulnerabilities: KevEntry[];
}

async function fetchCatalog(): Promise<KevCatalog> {
  const hit = cache.get("catalog");
  if (hit) return hit as KevCatalog;

  await limiter.acquire();

  const data = (await apiFetch(CATALOG_URL)) as KevCatalog;
  cache.set("catalog", data);
  return data;
}

// ---------------------------------------------------------------------------
// 1. kev_lookup
// ---------------------------------------------------------------------------
const kev_lookup: ToolDef = {
  name: "kev_lookup",
  description:
    "Check if a CVE is in the CISA Known Exploited Vulnerabilities (KEV) catalog.",
  schema: z.object({
    cve_id: z
      .string()
      .describe("CVE ID to check, e.g. 'CVE-2024-3094'"),
  }),
  async execute(
    args: { cve_id: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const catalog = await fetchCatalog();
    const entry = catalog.vulnerabilities.find(
      (v) => v.cveID === args.cve_id,
    );

    if (!entry) {
      return text(`CVE ${args.cve_id} is NOT in the CISA KEV catalog.`);
    }

    return json(entry);
  },
};

// ---------------------------------------------------------------------------
// 2. kev_search
// ---------------------------------------------------------------------------
const kev_search: ToolDef = {
  name: "kev_search",
  description:
    "Search KEV entries by keyword (matched against vendor, product, name, description).",
  schema: z.object({
    keyword: z
      .string()
      .describe(
        "Search keyword (matched against vendor, product, name, description)",
      ),
    limit: z.number().default(25).describe("Max results"),
  }),
  async execute(
    args: { keyword: string; limit: number },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const catalog = await fetchCatalog();
    const kw = args.keyword.toLowerCase();
    const limit = args.limit ?? 25;

    const matches = catalog.vulnerabilities.filter(
      (v) =>
        v.vendorProject.toLowerCase().includes(kw) ||
        v.product.toLowerCase().includes(kw) ||
        v.vulnerabilityName.toLowerCase().includes(kw) ||
        v.shortDescription.toLowerCase().includes(kw),
    );

    return json({
      total_matches: matches.length,
      results: matches.slice(0, limit),
    });
  },
};

// ---------------------------------------------------------------------------
// 3. kev_recent
// ---------------------------------------------------------------------------
const kev_recent: ToolDef = {
  name: "kev_recent",
  description: "Get recently added KEV entries within the last N days.",
  schema: z.object({
    days: z
      .number()
      .default(30)
      .describe("Number of days to look back (default 30)"),
  }),
  async execute(
    args: { days: number },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const catalog = await fetchCatalog();
    const days = args.days ?? 30;
    const cutoff = new Date(Date.now() - days * 86_400_000);

    const entries = catalog.vulnerabilities
      .filter((v) => new Date(v.dateAdded) >= cutoff)
      .sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
      );

    return json({ count: entries.length, entries });
  },
};

// ---------------------------------------------------------------------------
// 4. kev_stats
// ---------------------------------------------------------------------------
const kev_stats: ToolDef = {
  name: "kev_stats",
  description:
    "Get KEV catalog statistics: total count, top vendors, entries per year, and ransomware usage breakdown.",
  schema: z.object({}),
  async execute(
    _args: Record<string, never>,
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const catalog = await fetchCatalog();
    const vulns = catalog.vulnerabilities;

    // Top 10 vendors by count
    const vendorCounts = new Map<string, number>();
    for (const v of vulns) {
      vendorCounts.set(
        v.vendorProject,
        (vendorCounts.get(v.vendorProject) ?? 0) + 1,
      );
    }
    const topVendors = [...vendorCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([vendor, count]) => ({ vendor, count }));

    // Entries per year
    const yearCounts = new Map<string, number>();
    for (const v of vulns) {
      const year = v.dateAdded.substring(0, 4);
      yearCounts.set(year, (yearCounts.get(year) ?? 0) + 1);
    }
    const entriesPerYear = Object.fromEntries(
      [...yearCounts.entries()].sort((a, b) => a[0].localeCompare(b[0])),
    );

    // Ransomware usage breakdown
    const ransomwareCounts = new Map<string, number>();
    for (const v of vulns) {
      const val = v.knownRansomwareCampaignUse || "Unknown";
      ransomwareCounts.set(val, (ransomwareCounts.get(val) ?? 0) + 1);
    }
    const ransomwareBreakdown = Object.fromEntries(ransomwareCounts);

    return json({
      total: vulns.length,
      catalog_version: catalog.catalogVersion,
      date_released: catalog.dateReleased,
      top_vendors: topVendors,
      entries_per_year: entriesPerYear,
      ransomware_usage: ransomwareBreakdown,
    });
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const kevTools: ToolDef[] = [
  kev_lookup,
  kev_search,
  kev_recent,
  kev_stats,
];
