#!/usr/bin/env node

import { z } from "zod";
import type { ToolContext } from "./types/index.js";
import { startMcpStdio } from "./protocol/mcp-server.js";
import { allTools } from "./protocol/tools.js";

// ─── Build ToolContext from Environment ───

function buildToolContext(): ToolContext {
  return {
    config: {
      githubToken: process.env.GITHUB_TOKEN,
      librariesApiKey: process.env.LIBRARIES_API_KEY,
      nvdApiKey: process.env.NVD_API_KEY,
    },
  };
}

// ─── Tool Categories for --list display ───

const TOOL_CATEGORIES: { category: string; prefix: string }[] = [
  { category: "OSV.dev Vulnerabilities", prefix: "osv_" },
  { category: "GitHub Advisory (GHSA)", prefix: "ghsa_" },
  { category: "NIST NVD", prefix: "nvd_" },
  { category: "EPSS Exploit Prediction", prefix: "epss_" },
  { category: "CISA KEV", prefix: "kev_" },
  { category: "npm Registry", prefix: "npm_" },
  { category: "PyPI", prefix: "pypi_" },
  { category: "crates.io", prefix: "crate_" },
  { category: "RubyGems", prefix: "gem_" },
  { category: "NuGet", prefix: "nuget_" },
  { category: "Packagist/Composer", prefix: "composer_" },
  { category: "Go Vulnerability DB", prefix: "go_vuln_" },
  { category: "Go Module Proxy", prefix: "go_" },
  { category: "Google deps.dev", prefix: "deps_" },
  { category: "OpenSSF Scorecard", prefix: "scorecard_" },
  { category: "OpenSSF Best Practices", prefix: "badge_" },
  { category: "Libraries.io", prefix: "libraries_" },
  { category: "ClearlyDefined Licenses", prefix: "license_" },
  { category: "Sigstore Rekor", prefix: "rekor_" },
  { category: "Repology", prefix: "repology_" },
  { category: "Typosquatting Detection", prefix: "typosquat_" },
  { category: "Meta", prefix: "supplychain_" },
];

function categorize(toolName: string): string {
  for (const { category, prefix } of TOOL_CATEGORIES) {
    if (toolName.startsWith(prefix)) return category;
  }
  return "Other";
}

// ─── CLI: --help ───

function printHelp(): void {
  console.log(`supply-chain-mcp — Software Supply Chain Security MCP Server

USAGE:
  supply-chain-mcp-server              Start MCP server on stdio
  supply-chain-mcp-server --help       Show this help message
  supply-chain-mcp-server --list       List all ${allTools.length} tools grouped by category
  supply-chain-mcp-server --tool NAME  Run a single tool with JSON args

ENVIRONMENT VARIABLES:
  GITHUB_TOKEN         GitHub token (GHSA + Scorecard higher rate limits)
  LIBRARIES_API_KEY    Libraries.io API key (required for Libraries.io tools)
  NVD_API_KEY          NVD API key (50 req/30s vs 5 req/30s without key)

PROVIDERS (${allTools.length} tools across 21 data sources + 1 meta):
  OSV.dev              Unified vulnerability database (5 tools)
  GHSA                 GitHub Security Advisories (4 tools)
  NVD                  NIST CVE database (3 tools)
  EPSS                 Exploit Prediction Scoring System (4 tools)
  CISA KEV             Known Exploited Vulnerabilities (4 tools)
  npm                  npm registry + provenance + audit (10 tools)
  PyPI                 Python Package Index (4 tools)
  crates.io            Rust crate registry (4 tools)
  RubyGems             Ruby gem registry (4 tools)
  NuGet                .NET package registry (4 tools)
  Packagist            PHP/Composer registry (4 tools)
  Go Vuln DB           Go vulnerability database (4 tools)
  Go Proxy             Go module proxy + checksum DB (3 tools)
  deps.dev             Google dependency insights (10 tools)
  Scorecard            OpenSSF security scores (2 tools)
  Best Practices       OpenSSF best practices badge (3 tools)
  Libraries.io         Cross-ecosystem intelligence (4 tools)
  ClearlyDefined       License & attribution data (3 tools)
  Rekor                Sigstore transparency log (5 tools)
  Repology             Cross-distro package tracking (3 tools)
  Typosquat            Built-in typosquatting detection (2 tools)
  Meta                 Source listing (1 tool)
`);
}

// ─── CLI: --list ───

function printToolList(): void {
  const grouped = new Map<string, typeof allTools>();

  for (const tool of allTools) {
    const cat = categorize(tool.name);
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(tool);
  }

  console.log(`\nsupply-chain-mcp — ${allTools.length} tools\n`);

  for (const [category, tools] of grouped) {
    console.log(`━━━ ${category} (${tools.length}) ━━━`);
    for (const tool of tools) {
      const shape = tool.schema instanceof z.ZodObject
        ? (tool.schema as z.AnyZodObject).shape
        : tool.schema;
      const schemaKeys = Object.keys(shape);
      const params = schemaKeys.length > 0 ? `(${schemaKeys.join(", ")})` : "()";
      console.log(`  ${tool.name}${params}`);
      console.log(`    ${tool.description.split(".")[0]}.`);
    }
    console.log();
  }
}

// ─── CLI: --tool ───

async function runSingleTool(name: string, argsJson: string): Promise<void> {
  const tool = allTools.find((t) => t.name === name);
  if (!tool) {
    console.error(`Unknown tool: ${name}`);
    console.error(`Run with --list to see all available tools.`);
    process.exit(1);
  }

  let args: Record<string, unknown>;
  try {
    args = JSON.parse(argsJson);
  } catch {
    console.error(`Invalid JSON arguments: ${argsJson}`);
    process.exit(1);
  }

  const ctx = buildToolContext();
  const result = await tool.execute(args, ctx);

  for (const item of result.content) {
    console.log(item.text);
  }
}

// ─── Main ───

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  if (args.includes("--list") || args.includes("-l")) {
    printToolList();
    return;
  }

  const toolIdx = args.indexOf("--tool");
  if (toolIdx !== -1) {
    const toolName = args[toolIdx + 1];
    const toolArgs = args[toolIdx + 2] ?? "{}";
    if (!toolName) {
      console.error("--tool requires a tool name. Run with --list to see available tools.");
      process.exit(1);
    }
    await runSingleTool(toolName, toolArgs);
    return;
  }

  // Default: start MCP server on stdio
  const ctx = buildToolContext();
  await startMcpStdio(ctx);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
