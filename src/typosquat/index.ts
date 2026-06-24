import { z } from "zod";
import type { ToolDef, ToolContext, ToolResult } from "../types/index.js";
import { json, text } from "../types/index.js";

function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

const CONFUSABLES: Record<string, string[]> = {
  "0": ["o", "O"],
  "1": ["l", "I", "i"],
  l: ["1", "I", "i"],
  "-": ["_", "."],
  _: ["-", "."],
  rn: ["m"],
  vv: ["w"],
};

const TOP_NPM = [
  "express",
  "react",
  "lodash",
  "axios",
  "moment",
  "chalk",
  "commander",
  "debug",
  "uuid",
  "dotenv",
  "webpack",
  "typescript",
  "eslint",
  "prettier",
  "jest",
  "mocha",
  "next",
  "vue",
  "angular",
  "svelte",
  "jquery",
  "underscore",
  "async",
  "bluebird",
  "request",
  "node-fetch",
  "isomorphic-fetch",
  "body-parser",
  "cors",
  "helmet",
  "passport",
  "mongoose",
  "sequelize",
  "pg",
  "mysql2",
  "redis",
  "socket.io",
  "ws",
  "cheerio",
  "puppeteer",
  "sharp",
  "fs-extra",
  "glob",
  "minimatch",
  "yargs",
  "inquirer",
  "ora",
  "rxjs",
  "zod",
  "ajv",
];

const TOP_PYPI = [
  "requests",
  "numpy",
  "pandas",
  "flask",
  "django",
  "fastapi",
  "boto3",
  "setuptools",
  "pip",
  "wheel",
  "urllib3",
  "certifi",
  "charset-normalizer",
  "idna",
  "typing-extensions",
  "pydantic",
  "click",
  "jinja2",
  "markupsafe",
  "pyyaml",
  "cryptography",
  "pillow",
  "scipy",
  "matplotlib",
  "sqlalchemy",
  "celery",
  "redis",
  "psycopg2",
  "gunicorn",
  "uvicorn",
  "httpx",
  "aiohttp",
  "beautifulsoup4",
  "lxml",
  "scrapy",
  "pytest",
  "tox",
  "black",
  "mypy",
  "ruff",
  "poetry",
  "litellm",
  "openai",
  "langchain",
  "transformers",
  "torch",
  "tensorflow",
  "scikit-learn",
  "keras",
  "xgboost",
];

function getTopPackages(ecosystem: string): string[] {
  switch (ecosystem.toLowerCase()) {
    case "npm":
      return TOP_NPM;
    case "pypi":
      return TOP_PYPI;
    default:
      return TOP_NPM;
  }
}

function findConfusableWarnings(a: string, b: string): string[] {
  const warnings: string[] = [];
  for (const [char, confusables] of Object.entries(CONFUSABLES)) {
    for (const confusable of confusables) {
      // Check if replacing confusable in one name produces the other
      if (a.includes(char) && b.includes(confusable)) {
        const replaced = a.replaceAll(char, confusable);
        if (replaced === b) {
          warnings.push(
            `"${char}" in "${a}" is visually similar to "${confusable}" in "${b}"`,
          );
        }
      }
      if (a.includes(confusable) && b.includes(char)) {
        const replaced = a.replaceAll(confusable, char);
        if (replaced === b) {
          warnings.push(
            `"${confusable}" in "${a}" is visually similar to "${char}" in "${b}"`,
          );
        }
      }
    }
  }
  return warnings;
}

function charDiff(
  a: string,
  b: string,
): Array<{ position: number; a: string; b: string }> {
  const diffs: Array<{ position: number; a: string; b: string }> = [];
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    const ca = i < a.length ? a[i] : "";
    const cb = i < b.length ? b[i] : "";
    if (ca !== cb) {
      diffs.push({ position: i, a: ca || "(none)", b: cb || "(none)" });
    }
  }
  return diffs;
}

const typosquatCheck: ToolDef = {
  name: "typosquat_check",
  description:
    "Check if a package name is suspiciously similar to popular packages (potential typosquatting). Returns matches with edit distance <= 2.",
  schema: z.object({
    name: z.string().describe("Package name to check for typosquatting"),
    ecosystem: z
      .string()
      .optional()
      .default("npm")
      .describe('Package ecosystem: "npm" or "pypi" (default: "npm")'),
  }),
  async execute(
    args: { name: string; ecosystem?: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const ecosystem = args.ecosystem ?? "npm";
    const topPackages = getTopPackages(ecosystem);
    const name = args.name.toLowerCase();

    const matches: Array<{
      popular_package: string;
      edit_distance: number;
      similarity_pct: number;
      confusable_warnings: string[];
    }> = [];

    for (const pkg of topPackages) {
      // Skip exact match
      if (name === pkg.toLowerCase()) continue;

      const distance = levenshtein(name, pkg.toLowerCase());
      if (distance <= 2) {
        const maxLen = Math.max(name.length, pkg.length);
        const similarityPct =
          maxLen > 0
            ? Math.round((1 - distance / maxLen) * 100 * 100) / 100
            : 100;
        const confusableWarnings = findConfusableWarnings(name, pkg.toLowerCase());

        matches.push({
          popular_package: pkg,
          edit_distance: distance,
          similarity_pct: similarityPct,
          confusable_warnings: confusableWarnings,
        });
      }
    }

    // Sort by distance ascending (most similar first)
    matches.sort((a, b) => a.edit_distance - b.edit_distance);

    return json({
      package: args.name,
      ecosystem,
      is_suspicious: matches.length > 0,
      total_matches: matches.length,
      matches,
    });
  },
};

const typosquatCompare: ToolDef = {
  name: "typosquat_compare",
  description:
    "Compare two package names directly to assess typosquatting risk, showing edit distance, similarity percentage, character-level diff, and confusable character warnings",
  schema: z.object({
    name_a: z.string().describe("First package name"),
    name_b: z.string().describe("Second package name"),
  }),
  async execute(
    args: { name_a: string; name_b: string },
    _ctx: ToolContext,
  ): Promise<ToolResult> {
    const a = args.name_a.toLowerCase();
    const b = args.name_b.toLowerCase();
    const distance = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length);
    const similarityPct =
      maxLen > 0
        ? Math.round((1 - distance / maxLen) * 100 * 100) / 100
        : 100;

    const diff = charDiff(a, b);
    const confusableWarnings = findConfusableWarnings(a, b);

    return json({
      name_a: args.name_a,
      name_b: args.name_b,
      edit_distance: distance,
      max_length: maxLen,
      similarity_pct: similarityPct,
      character_diff: diff,
      confusable_warnings: confusableWarnings,
      risk_level:
        distance === 0
          ? "none"
          : distance === 1
            ? "high"
            : distance === 2
              ? "medium"
              : "low",
    });
  },
};

export const typosquatTools: ToolDef[] = [typosquatCheck, typosquatCompare];
