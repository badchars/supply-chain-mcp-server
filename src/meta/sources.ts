// Meta — Data source listing tool + source definitions
import { z } from "zod";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json } from "../types/index.js";

export interface DataSource {
  name: string;
  url: string;
  authRequired: boolean;
  envVar: string | null;
  tools: string[];
  configured: boolean;
}

const SOURCE_DEFINITIONS: {
  name: string;
  url: string;
  authRequired: boolean;
  envVar: string | null;
  configKey: keyof ToolContext["config"] | null;
  tools: string[];
}[] = [
  {
    name: "OSV.dev",
    url: "https://api.osv.dev",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["osv_query", "osv_query_commit", "osv_query_purl", "osv_batch", "osv_id"],
  },
  {
    name: "GitHub Advisory Database (GHSA)",
    url: "https://api.github.com/advisories",
    authRequired: false,
    envVar: "GITHUB_TOKEN",
    configKey: "githubToken",
    tools: ["ghsa_id", "ghsa_search", "ghsa_package", "ghsa_recent"],
  },
  {
    name: "NIST NVD",
    url: "https://services.nvd.nist.gov",
    authRequired: false,
    envVar: "NVD_API_KEY",
    configKey: "nvdApiKey",
    tools: ["nvd_cve", "nvd_search", "nvd_recent"],
  },
  {
    name: "npm Registry",
    url: "https://registry.npmjs.org",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: [
      "npm_package", "npm_version", "npm_downloads", "npm_search",
      "npm_maintainers", "npm_scripts", "npm_provenance", "npm_audit_bulk",
      "npm_attestations", "npm_download_range",
    ],
  },
  {
    name: "PyPI",
    url: "https://pypi.org",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["pypi_package", "pypi_version", "pypi_releases", "pypi_maintainers"],
  },
  {
    name: "crates.io",
    url: "https://crates.io/api/v1",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["crate_info", "crate_versions", "crate_deps", "crate_owners"],
  },
  {
    name: "Go Module Proxy",
    url: "https://proxy.golang.org",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["go_module", "go_version", "go_sum"],
  },
  {
    name: "Google deps.dev",
    url: "https://api.deps.dev",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: [
      "deps_package", "deps_version", "deps_dependencies", "deps_dependents",
      "deps_advisory", "deps_project", "deps_query", "deps_requirements",
      "deps_similar_packages", "deps_purl_lookup",
    ],
  },
  {
    name: "OpenSSF Scorecard",
    url: "https://api.securityscorecards.dev",
    authRequired: false,
    envVar: "GITHUB_TOKEN",
    configKey: "githubToken",
    tools: ["scorecard_repo", "scorecard_compare"],
  },
  {
    name: "Libraries.io",
    url: "https://libraries.io/api",
    authRequired: true,
    envVar: "LIBRARIES_API_KEY",
    configKey: "librariesApiKey",
    tools: ["libraries_package", "libraries_deps", "libraries_dependents", "libraries_sourcerank"],
  },
  {
    name: "Sigstore Rekor",
    url: "https://rekor.sigstore.dev",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["rekor_search", "rekor_entry", "rekor_log_info", "rekor_entries_search", "rekor_verify"],
  },
  {
    name: "Typosquatting Detection (built-in)",
    url: "N/A",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["typosquat_check", "typosquat_compare"],
  },
  {
    name: "EPSS (Exploit Prediction)",
    url: "https://api.first.org/data/v1/epss",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["epss_score", "epss_batch", "epss_top", "epss_above_threshold"],
  },
  {
    name: "CISA KEV",
    url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["kev_lookup", "kev_search", "kev_recent", "kev_stats"],
  },
  {
    name: "Go Vulnerability Database",
    url: "https://vuln.go.dev",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["go_vuln_id", "go_vuln_list", "go_vuln_db_info", "go_vuln_by_module"],
  },
  {
    name: "ClearlyDefined",
    url: "https://api.clearlydefined.io",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["license_lookup", "license_batch", "license_search"],
  },
  {
    name: "OpenSSF Best Practices",
    url: "https://www.bestpractices.dev",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["badge_project", "badge_search", "badge_by_repo"],
  },
  {
    name: "Repology",
    url: "https://repology.org/api/v1",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["repology_project", "repology_problems", "repology_search"],
  },
  {
    name: "RubyGems",
    url: "https://rubygems.org/api/v1",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["gem_info", "gem_versions", "gem_search", "gem_reverse_deps"],
  },
  {
    name: "NuGet",
    url: "https://api.nuget.org/v3",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["nuget_package", "nuget_search", "nuget_versions", "nuget_catalog_entry"],
  },
  {
    name: "Packagist",
    url: "https://packagist.org",
    authRequired: false,
    envVar: null,
    configKey: null,
    tools: ["composer_package", "composer_search", "composer_stats", "composer_advisories"],
  },
];

function listSources(config: ToolContext["config"]): DataSource[] {
  return SOURCE_DEFINITIONS.map((source) => {
    let configured = false;
    if (source.configKey === null) {
      configured = true;
    } else {
      const value = config[source.configKey];
      configured = value !== undefined && value !== "" && value !== null;
    }
    return {
      name: source.name,
      url: source.url,
      authRequired: source.authRequired,
      envVar: source.envVar,
      tools: source.tools,
      configured,
    };
  });
}

const supplychain_list_sources: ToolDef = {
  name: "supplychain_list_sources",
  description:
    "List all 21 supply chain security data sources with their configuration status, required environment variables, available tools, and API base URLs.",
  schema: {},
  async execute(
    _args: Record<string, unknown>,
    ctx: ToolContext,
  ): Promise<ToolResult> {
    const sources = listSources(ctx.config);
    const totalTools = sources.reduce((sum, s) => sum + s.tools.length, 0);
    return json({
      total_sources: sources.length,
      total_tools: totalTools,
      sources,
    });
  },
};

export const metaTools: ToolDef[] = [supplychain_list_sources];
