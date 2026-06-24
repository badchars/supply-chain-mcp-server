import { z } from "zod";
import { RateLimiter } from "../utils/rate-limiter.js";
import { TTLCache } from "../utils/cache.js";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";
import { apiFetch } from "../utils/http.js";

const limiter = new RateLimiter(500);
const cache = new TTLCache<unknown>(900_000);

const VULN_BASE = "https://vuln.go.dev";

const goVulnId: ToolDef = {
  name: "go_vuln_id",
  description:
    "Fetch a Go vulnerability by its ID from the Go Vulnerability Database. Returns advisory details, affected modules, versions, and references.",
  schema: z.object({
    id: z.string().describe("Go vulnerability ID, e.g. 'GO-2024-2824'"),
  }),
  async execute(args, ctx) {
    const { id } = args;
    const cacheKey = `vuln:${id}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(
      `${VULN_BASE}/ID/${encodeURIComponent(id)}.json`,
    );

    cache.set(cacheKey, data);
    return json(data);
  },
};

const goVulnList: ToolDef = {
  name: "go_vuln_list",
  description:
    "List all Go vulnerability IDs from the database index. Returns an array of entry objects with id and modified fields.",
  schema: z.object({}),
  async execute(args, ctx) {
    const cacheKey = "vuln_list";
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${VULN_BASE}/index/vulns.json`);

    cache.set(cacheKey, data);
    return json(data);
  },
};

const goVulnDbInfo: ToolDef = {
  name: "go_vuln_db_info",
  description:
    "Get Go Vulnerability Database metadata including last modified time.",
  schema: z.object({}),
  async execute(args, ctx) {
    const cacheKey = "db_info";
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    await limiter.acquire();
    const data = await apiFetch(`${VULN_BASE}/index/db.json`);

    cache.set(cacheKey, data);
    return json(data);
  },
};

const goVulnByModule: ToolDef = {
  name: "go_vuln_by_module",
  description:
    "Find Go vulnerabilities affecting a specific module. Fetches the modules index and filters for entries matching the given module path.",
  schema: z.object({
    module: z
      .string()
      .describe(
        "Go module path, e.g. 'golang.org/x/net' or 'github.com/gin-gonic/gin'",
      ),
  }),
  async execute(args, ctx) {
    const { module } = args;
    const cacheKey = `mod_vuln:${module}`;
    const cached = cache.get(cacheKey);
    if (cached) return json(cached);

    // Fetch and cache the full modules index separately
    let modulesIndex = cache.get("modules_index") as
      | Array<{ path: string; vulns: string[] }>
      | undefined;

    if (!modulesIndex) {
      await limiter.acquire();
      modulesIndex = await apiFetch(`${VULN_BASE}/index/modules.json`);
      cache.set("modules_index", modulesIndex);
    }

    const entries = (modulesIndex as Array<{ path: string; vulns: string[] }>).filter(
      (entry) => entry.path === module,
    );

    const result = {
      module,
      total_vulnerabilities: entries.reduce((sum, e) => sum + e.vulns.length, 0),
      entries,
    };

    cache.set(cacheKey, result);
    return json(result);
  },
};

export const govulnTools: ToolDef[] = [
  goVulnId,
  goVulnList,
  goVulnDbInfo,
  goVulnByModule,
];
