<p align="center">
  <strong>English</strong> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.pt-BR.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.el.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.hi.md">हिन्दी</a>
</p>

<p align="center">
  <br>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-light.svg">
    <img alt="supply-chain-mcp-server" src="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">Supply chain security intelligence for AI agents.</h3>

<p align="center">
  OSV, GHSA, NVD, EPSS, CISA KEV, npm, PyPI, crates.io, RubyGems, NuGet, Packagist, Go, deps.dev, Scorecard, Libraries.io, ClearlyDefined, Rekor, Repology, typosquatting detection &mdash; unified into a single MCP server.<br>
  Your AI agent gets <b>full-spectrum supply chain intelligence on demand</b>, not 21 browser tabs and manual correlation.
</p>

<br>

<p align="center">
  <a href="#the-problem">The Problem</a> &bull;
  <a href="#how-its-different">How It's Different</a> &bull;
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="#what-the-ai-can-do">What The AI Can Do</a> &bull;
  <a href="#tools-reference-90-tools">Tools (90)</a> &bull;
  <a href="#data-sources-21">Data Sources</a> &bull;
  <a href="#architecture">Architecture</a> &bull;
  <a href="CHANGELOG.md">Changelog</a> &bull;
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 Tools">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 Sources">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/demo.gif" alt="supply-chain-mcp-server demo" width="800">
</p>

---

## The Problem

Supply chain security intelligence is the missing layer in modern software development. Vulnerability databases, package registries, provenance verification, exploit prediction scoring, license compliance, security scorecards, typosquatting detection &mdash; the data you need is scattered across dozens of platforms, each with its own API, its own auth, its own rate limits, its own output format. Today you check OSV in one tab, NVD in another, pull up npm advisories, check EPSS scores on FIRST.org, verify Sigstore provenance in yet another tab, look up OpenSSF Scorecard, cross-reference CISA KEV, and then spend an hour manually piecing it all together.

```
Traditional supply chain security workflow:
  check vulnerabilities            ->  OSV + NVD + GitHub Advisories (3 separate UIs)
  assess exploit likelihood        ->  EPSS scores (separate API)
  check active exploitation        ->  CISA KEV catalog (separate JSON feed)
  verify package provenance        ->  Sigstore/Rekor + npm attestations (multiple CLIs)
  check security practices         ->  OpenSSF Scorecard + Best Practices Badge (2 UIs)
  audit dependencies               ->  deps.dev + Libraries.io (2 more UIs)
  check registry metadata          ->  npm + PyPI + crates.io + Go (4 registries)
  check for typosquatting          ->  manual name comparison (error-prone)
  verify license compliance        ->  ClearlyDefined (another UI)
  check distro packaging           ->  Repology (yet another UI)
  ────────────────────────────────
  Total: 45+ minutes per package audit, most of it switching contexts
```

**supply-chain-mcp-server** gives your AI agent 90 tools across 21 data sources via the [Model Context Protocol](https://modelcontextprotocol.io). The agent queries all sources in parallel, correlates vulnerability data with exploit predictions, verifies provenance, checks security posture, and presents a unified supply chain risk assessment &mdash; in a single conversation.

```
With supply-chain-mcp-server:
  You: "Audit the security posture of the express npm package"

  Agent: -> osv_query: 2 active vulnerabilities found
         -> epss_score: CVE-2024-XXXX has 0.85 EPSS (97th percentile)
         -> kev_lookup: Not in CISA KEV (good)
         -> npm_provenance: Sigstore provenance verified ✓
         -> scorecard_repo: 8.2/10 OpenSSF score
         -> npm_scripts: No suspicious lifecycle scripts
         -> deps_dependencies: 32 transitive deps, all clean
         -> "express has a strong security posture. 2 known vulns but
            neither actively exploited (not in KEV). High EPSS on one
            CVE warrants patching priority. Provenance verified via
            Sigstore. OpenSSF Scorecard 8.2/10."
```

---

## How It's Different

Existing tools give you raw data one source at a time. supply-chain-mcp-server gives your AI agent the ability to **reason across vulnerability, provenance, and package intelligence simultaneously**.

<table>
<thead>
<tr>
<th></th>
<th>Traditional Approach</th>
<th>supply-chain-mcp-server</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Interface</b></td>
<td>21 different web UIs, CLIs, and APIs</td>
<td>MCP &mdash; AI agent calls tools conversationally</td>
</tr>
<tr>
<td><b>Vulnerability data</b></td>
<td>Check OSV, NVD, GHSA separately</td>
<td>Agent queries all 3 + EPSS + KEV in parallel</td>
</tr>
<tr>
<td><b>Package registries</b></td>
<td>npm, PyPI, crates.io, Go, RubyGems, NuGet, Packagist separately</td>
<td>7 ecosystems in one server &mdash; agent picks the right one</td>
</tr>
<tr>
<td><b>Provenance</b></td>
<td>Manual Sigstore/Rekor verification, npm attestation checks</td>
<td>Agent checks npm provenance + Rekor log + attestation bundles</td>
</tr>
<tr>
<td><b>License compliance</b></td>
<td>Manual ClearlyDefined lookups, one package at a time</td>
<td>Agent resolves licenses across ecosystems with batch support</td>
</tr>
<tr>
<td><b>Security posture</b></td>
<td>OpenSSF Scorecard + Best Practices Badge separately</td>
<td>Agent combines Scorecard + Badge + deps.dev + Libraries.io SourceRank</td>
</tr>
<tr>
<td><b>Typosquatting</b></td>
<td>Manual name comparison, easy to miss</td>
<td>Built-in Levenshtein + confusable character detection</td>
</tr>
<tr>
<td><b>API keys</b></td>
<td>Required for most platforms</td>
<td>18 of 21 sources work free &mdash; API keys unlock higher rate limits</td>
</tr>
<tr>
<td><b>Setup</b></td>
<td>Install multiple tools, manage each config</td>
<td><code>npx supply-chain-mcp-server</code> &mdash; one command, zero config</td>
</tr>
</tbody>
</table>

---

## Quick Start

### Option 1: npx (no install)

```bash
npx supply-chain-mcp-server
```

All tools work immediately. No API keys required for most data sources &mdash; 18 of 21 sources are fully free.

### Option 2: Clone

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Environment variables (optional)

```bash
export GITHUB_TOKEN=your-token        # GHSA + Scorecard higher rate limits
export LIBRARIES_API_KEY=your-key     # Required for Libraries.io tools
export NVD_API_KEY=your-key           # 50 req/30s vs 5 req/30s without key
```

All API keys are optional. Without them, you still get OSV, npm, PyPI, crates.io, RubyGems, NuGet, Packagist, Go, Go Vulnerability Database, deps.dev, EPSS, CISA KEV, Sigstore Rekor, Repology, ClearlyDefined, OpenSSF Scorecard, OpenSSF Best Practices, and typosquatting detection &mdash; 86 of 90 tools work without any keys.

### Connect to your AI agent

<details open>
<summary><b>Claude Code</b></summary>

```bash
# With npx
claude mcp add supply-chain-mcp-server -- npx supply-chain-mcp-server

# With local clone
claude mcp add supply-chain-mcp-server -- bun run /path/to/supply-chain-mcp-server/src/index.ts
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "supply-chain": {
      "command": "npx",
      "args": ["-y", "supply-chain-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "optional",
        "LIBRARIES_API_KEY": "optional",
        "NVD_API_KEY": "optional"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Cursor / Windsurf / other MCP clients</b></summary>

Same JSON config format. Point the command to `npx supply-chain-mcp-server` or your local installation path.

</details>

### Start querying

```
You: "Check if express@4.17.1 has any known vulnerabilities and verify its provenance"
```

That's it. The agent handles vulnerability lookups, EPSS scoring, KEV checks, provenance verification, and more automatically.

---

## What The AI Can Do

### Full Package Audit

```
You: "Do a complete security audit of the lodash npm package"

Agent: -> npm_package {name: "lodash"}
       -> osv_query {ecosystem: "npm", name: "lodash"}
       -> ghsa_package {ecosystem: "npm", name: "lodash"}
       -> npm_provenance {name: "lodash", version: "4.17.21"}
       -> scorecard_repo {owner: "lodash", repo: "lodash"}
       -> npm_scripts {name: "lodash", version: "4.17.21"}
       -> deps_dependencies {ecosystem: "npm", name: "lodash", version: "4.17.21"}
       -> license_lookup {type: "npm", name: "lodash", version: "4.17.21"}
       -> "lodash@4.17.21 security audit:
          Vulnerabilities: 3 historical (all fixed in 4.17.21),
          including prototype pollution CVE-2020-8203.
          Provenance: No Sigstore attestation (published pre-provenance era).
          OpenSSF Scorecard: 6.1/10 — no branch protection, no fuzzing.
          Dependencies: Zero runtime deps (self-contained).
          License: MIT (ClearlyDefined confirmed).
          Lifecycle scripts: None — clean.
          Recommendation: Safe to use at latest version. Consider
          migrating to lodash-es for tree-shaking."
```

### Vulnerability Triage

```
You: "Triage CVE-2024-3094 — how urgent is this?"

Agent: -> nvd_cve {cve_id: "CVE-2024-3094"}
       -> epss_score {cve_id: "CVE-2024-3094"}
       -> kev_lookup {cve_id: "CVE-2024-3094"}
       -> ghsa_id {ghsa_id: "CVE-2024-3094"}
       -> osv_id {id: "CVE-2024-3094"}
       -> "CVE-2024-3094 (xz-utils backdoor):
          CVSS: 10.0 Critical — backdoor in xz-utils 5.6.0/5.6.1
          EPSS: 0.95 (99th percentile) — extremely likely to be exploited
          CISA KEV: YES — actively exploited, deadline March 2024
          Affects: xz-utils/liblzma on Linux (sshd via systemd)
          This is CRITICAL. Immediate action required:
          1. Downgrade xz-utils to 5.4.x or remove 5.6.0/5.6.1
          2. Check all systems for affected versions
          3. This was a sophisticated supply chain attack via
             a compromised maintainer."
```

### Dependency Risk Assessment

```
You: "Assess the supply chain risk of adding fastapi to our Python project"

Agent: -> pypi_package {name: "fastapi"}
       -> osv_query {ecosystem: "PyPI", name: "fastapi"}
       -> deps_dependencies {ecosystem: "pypi", name: "fastapi", version: "0.115.0"}
       -> scorecard_repo {owner: "tiangolo", repo: "fastapi"}
       -> badge_by_repo {repo_url: "https://github.com/tiangolo/fastapi"}
       -> pypi_maintainers {name: "fastapi"}
       -> typosquat_check {name: "fastapi", ecosystem: "pypi"}
       -> "fastapi supply chain risk assessment:
          Vulnerabilities: 1 low-severity (fixed in latest).
          Dependencies: 5 direct (starlette, pydantic, etc.), 23 transitive.
          OpenSSF Scorecard: 7.4/10 — good CI/CD, signed releases.
          Maintainer: single primary maintainer (tiangolo).
          Typosquatting: 'fast-api' and 'fastapi2' exist — verify
          you're installing the correct package.
          Risk: LOW. Well-maintained, active community, good security
          practices. Single-maintainer risk is mitigated by strong
          automation and community oversight."
```

### Typosquatting Detection

```
You: "I'm about to install 'reqeusts' from PyPI — is this safe?"

Agent: -> typosquat_check {name: "reqeusts", ecosystem: "pypi"}
       -> typosquat_compare {name_a: "reqeusts", name_b: "requests"}
       -> pypi_package {name: "reqeusts"}
       -> "WARNING: 'reqeusts' is a likely typosquat of 'requests'.
          Edit distance: 2 (transposed 'ue' -> 'eu')
          Similarity: 87.5%
          The legitimate package is 'requests' (800M+ monthly downloads).
          'reqeusts' has very low downloads and was likely published
          to exploit typos. DO NOT install this package.
          Correct command: pip install requests"
```

---

## Tools Reference (90 tools)

<details open>
<summary><b>OSV.dev Vulnerabilities (5) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `osv_query` | Query OSV database for known vulnerabilities affecting a specific package and optional version |
| `osv_query_commit` | Query OSV database for vulnerabilities associated with a specific git commit hash |
| `osv_query_purl` | Query OSV database using a Package URL (purl) for known vulnerabilities |
| `osv_batch` | Batch query OSV database for vulnerabilities across multiple packages at once |
| `osv_id` | Fetch full vulnerability details from OSV by ID (OSV, CVE, GHSA, RUSTSEC, PYSEC, etc.) |

</details>

<details>
<summary><b>GitHub Advisory GHSA (4) &mdash; No API key (GITHUB_TOKEN optional for higher rate limits)</b></summary>

| Tool | Description |
|------|-------------|
| `ghsa_id` | Fetch a GitHub Security Advisory by its GHSA or CVE identifier |
| `ghsa_search` | Search GitHub Security Advisories by keyword, ecosystem, and severity |
| `ghsa_package` | List GitHub Security Advisories affecting a specific package in a given ecosystem |
| `ghsa_recent` | List the most recently updated GitHub Security Advisories |

</details>

<details>
<summary><b>NIST NVD (3) &mdash; No API key (NVD_API_KEY optional for higher rate limits)</b></summary>

| Tool | Description |
|------|-------------|
| `nvd_cve` | Fetch full CVE details from NVD (NIST National Vulnerability Database) by CVE ID |
| `nvd_search` | Search NVD for CVEs by keyword and optional CVSS v3 severity |
| `nvd_recent` | Fetch recently published CVEs from NVD within a given number of days |

</details>

<details>
<summary><b>EPSS Exploit Prediction (4) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `epss_score` | Get EPSS exploit probability and percentile for a single CVE ID |
| `epss_batch` | Batch EPSS scores for multiple CVEs (up to 100) in a single request |
| `epss_top` | Get the highest EPSS-scoring CVEs (most likely to be exploited) |
| `epss_above_threshold` | Find CVEs with EPSS score above a given threshold |

</details>

<details>
<summary><b>CISA KEV (4) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `kev_lookup` | Check if a CVE is in the CISA Known Exploited Vulnerabilities (KEV) catalog |
| `kev_search` | Search KEV entries by keyword (matched against vendor, product, name, description) |
| `kev_recent` | Get recently added KEV entries within the last N days |
| `kev_stats` | Get KEV catalog statistics: total count, top vendors, entries per year, and ransomware usage breakdown |

</details>

<details>
<summary><b>npm Registry (10) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `npm_package` | Fetch npm package metadata including description, latest version, maintainers, license, repository, homepage, and publish timeline |
| `npm_version` | Fetch metadata for a specific npm package version including dependencies, dist info (tarball, shasum, integrity), scripts, and deprecation status |
| `npm_downloads` | Fetch npm download counts for a package over a given period (last-day, last-week, last-month) |
| `npm_search` | Search the npm registry for packages matching a query string |
| `npm_maintainers` | Extract maintainers and publish timeline from an npm package &mdash; critical for detecting maintainer takeover attacks |
| `npm_scripts` | Extract and analyze lifecycle scripts from a specific npm package version &mdash; flags suspicious commands (curl, wget, eval, exec, etc.) commonly used in supply-chain attacks |
| `npm_provenance` | Check whether an npm package version has Sigstore provenance attestations and signatures |
| `npm_audit_bulk` | Bulk query npm security advisories for a set of packages and versions |
| `npm_attestations` | Fetch full Sigstore attestation bundles for an npm package version &mdash; returns SLSA provenance and publish attestations |
| `npm_download_range` | Get day-by-day npm download counts for a date range &mdash; useful for detecting download anomalies or dependency confusion attacks |

</details>

<details>
<summary><b>PyPI (4) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `pypi_package` | Fetch PyPI package metadata including author, license, summary, project URLs, classifiers, and Python version requirements |
| `pypi_version` | Fetch metadata for a specific PyPI package version including release URLs with upload times, file sizes, digests, and yanked status |
| `pypi_releases` | List all releases of a PyPI package with upload dates, sizes, and yanked status &mdash; useful for detecting suspicious rapid version bumps |
| `pypi_maintainers` | Extract author and maintainer information from a PyPI package &mdash; useful for detecting ownership changes |

</details>

<details>
<summary><b>crates.io (4) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `crate_info` | Fetch crates.io crate metadata including description, download counts, max version, repository, homepage, categories, and keywords |
| `crate_versions` | List all versions of a crate with version number, yanked status, license, crate size, creation date, and download count |
| `crate_deps` | Fetch dependencies for a specific crate version including dependency kind (normal/dev/build), version requirement, and optional flag |
| `crate_owners` | List owners of a crate on crates.io &mdash; useful for detecting ownership changes |

</details>

<details>
<summary><b>RubyGems (4) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `gem_info` | Fetch RubyGems gem metadata including name, version, authors, description, download counts, project URI, and source code URI |
| `gem_versions` | List all versions of a RubyGems gem with release dates, platform info, and version numbers |
| `gem_search` | Search the RubyGems registry for gems matching a query string |
| `gem_reverse_deps` | Get reverse dependencies of a RubyGems gem &mdash; useful for assessing blast radius of a compromised package |

</details>

<details>
<summary><b>NuGet (4) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `nuget_package` | Fetch NuGet package registration metadata including all versions, dependency groups, descriptions, and catalog entries |
| `nuget_search` | Search the NuGet registry for packages matching a query string |
| `nuget_versions` | List all published versions of a NuGet package from the flat container index |
| `nuget_catalog_entry` | Get specific version details from NuGet including dependency groups, description, license, and catalog metadata |

</details>

<details>
<summary><b>Packagist / Composer (4) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `composer_package` | Get PHP/Composer package metadata from Packagist including versions, description, maintainers, and repository information |
| `composer_search` | Search Packagist for PHP packages matching a query string |
| `composer_stats` | Get Packagist package download statistics including total, monthly, and daily download counts |
| `composer_advisories` | Get security advisories for PHP packages from Packagist &mdash; returns known vulnerabilities and CVEs |

</details>

<details>
<summary><b>Go Module Proxy (3) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `go_module` | Fetch Go module info from the module proxy: latest version and all available versions |
| `go_version` | Fetch info and go.mod contents for a specific Go module version &mdash; returns parsed dependency list |
| `go_sum` | Look up a Go module version in the checksum database (sum.golang.org) for hash verification |

</details>

<details>
<summary><b>Go Vulnerability Database (4) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `go_vuln_id` | Fetch a Go vulnerability by its ID from the Go Vulnerability Database |
| `go_vuln_list` | List all Go vulnerability IDs from the database index |
| `go_vuln_db_info` | Get Go Vulnerability Database metadata including last modified time |
| `go_vuln_by_module` | Find Go vulnerabilities affecting a specific module |

</details>

<details>
<summary><b>Google deps.dev (10) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `deps_package` | Look up a package on deps.dev to get metadata, versions, and security information |
| `deps_version` | Get detailed info about a specific package version from deps.dev including links, licenses, and advisories |
| `deps_dependencies` | Get the dependency tree for a specific package version from deps.dev |
| `deps_dependents` | Get packages that depend on a specific package version from deps.dev |
| `deps_advisory` | Fetch a security advisory by key (e.g. GHSA-xxxx-xxxx-xxxx) from deps.dev |
| `deps_project` | Get project information from deps.dev by repository URL |
| `deps_query` | Look up a package by its SHA256 artifact hash on deps.dev |
| `deps_requirements` | Get the requirements (version constraints) for a specific package version from deps.dev |
| `deps_similar_packages` | Find similarly named packages on deps.dev for typosquatting detection |
| `deps_purl_lookup` | Look up a package by Package URL (purl) on deps.dev |

</details>

<details>
<summary><b>OpenSSF Scorecard (2) &mdash; No API key (GITHUB_TOKEN optional for higher rate limits)</b></summary>

| Tool | Description |
|------|-------------|
| `scorecard_repo` | Get the OpenSSF Scorecard security score for a GitHub repository, including individual check results |
| `scorecard_compare` | Compare OpenSSF Scorecard security scores across 2-5 GitHub repositories side by side |

</details>

<details>
<summary><b>OpenSSF Best Practices (3) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `badge_project` | Get OpenSSF Best Practices badge status and criteria for a project by ID |
| `badge_search` | Search OpenSSF Best Practices badge projects |
| `badge_by_repo` | Find OpenSSF Best Practices badge by GitHub repository URL |

</details>

<details>
<summary><b>Libraries.io (4) &mdash; Requires LIBRARIES_API_KEY</b></summary>

| Tool | Description |
|------|-------------|
| `libraries_package` | Get package metadata from Libraries.io including repository info, versions, and popularity metrics |
| `libraries_deps` | Get dependencies for a specific package version from Libraries.io |
| `libraries_dependents` | Get packages that depend on a specific package from Libraries.io |
| `libraries_sourcerank` | Get the SourceRank quality score breakdown for a package from Libraries.io |

</details>

<details>
<summary><b>ClearlyDefined (3) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `license_lookup` | Get curated license data for a software component from ClearlyDefined |
| `license_batch` | Batch license lookup for multiple components via ClearlyDefined |
| `license_search` | Search ClearlyDefined for components by pattern |

</details>

<details>
<summary><b>Sigstore Rekor (5) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `rekor_search` | Search the Rekor transparency log by email, SHA256 hash, or public key fingerprint |
| `rekor_entry` | Retrieve a specific Rekor transparency log entry by UUID, including body, attestation, and inclusion proof |
| `rekor_log_info` | Get the current Rekor transparency log status including rootHash, treeSize, and signedTreeHead |
| `rekor_entries_search` | Retrieve multiple Rekor log entries by their UUIDs or log indexes in a single request |
| `rekor_verify` | Verify whether a SHA256 artifact hash has been recorded in the Rekor transparency log |

</details>

<details>
<summary><b>Repology (3) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `repology_project` | Get package versions across all Linux distributions from Repology |
| `repology_problems` | Find packaging problems/issues for a repository on Repology |
| `repology_search` | Search Repology projects by name |

</details>

<details>
<summary><b>Typosquatting Detection (2) &mdash; No API key (built-in)</b></summary>

| Tool | Description |
|------|-------------|
| `typosquat_check` | Check if a package name is suspiciously similar to popular packages (potential typosquatting) &mdash; returns matches with edit distance <= 2 |
| `typosquat_compare` | Compare two package names directly to assess typosquatting risk, showing edit distance, similarity percentage, character-level diff, and confusable character warnings |

</details>

<details>
<summary><b>Meta (1) &mdash; No API key</b></summary>

| Tool | Description |
|------|-------------|
| `supplychain_list_sources` | List all 21 supply chain security data sources with configuration status, API key status, and tool counts |

</details>

---

### CLI Usage

```bash
# List all available tools
npx supply-chain-mcp-server --list

# Run any tool directly
npx supply-chain-mcp-server --tool osv_query '{"ecosystem":"npm","name":"express"}'
npx supply-chain-mcp-server --tool epss_score '{"cve_id":"CVE-2024-3094"}'
npx supply-chain-mcp-server --tool kev_lookup '{"cve_id":"CVE-2024-3094"}'
npx supply-chain-mcp-server --tool npm_provenance '{"name":"express","version":"4.21.2"}'
npx supply-chain-mcp-server --tool scorecard_repo '{"owner":"expressjs","repo":"express"}'
npx supply-chain-mcp-server --tool typosquat_check '{"name":"reqeusts","ecosystem":"pypi"}'
npx supply-chain-mcp-server --tool npm_scripts '{"name":"express","version":"4.21.2"}'

# Tools requiring API keys
LIBRARIES_API_KEY=your-key npx supply-chain-mcp-server --tool libraries_package '{"platform":"NPM","name":"express"}'
```

---

## Data Sources (21)

| Source | Auth | Rate Limit | What it provides |
|--------|------|-----------|-----------------|
| [OSV.dev](https://osv.dev) | None | 1 req/s | Cross-ecosystem vulnerability database (npm, PyPI, Go, Rust, etc.) |
| [GitHub Advisory Database](https://github.com/advisories) | Optional | 1 req/s | Security advisories for GitHub-tracked packages |
| [NIST NVD](https://nvd.nist.gov) | Optional | 5 req/30s (50 with key) | CVE details, CVSS scores, CPE matching, keyword search |
| [FIRST EPSS](https://www.first.org/epss) | None | 2 req/s | Exploit Prediction Scoring System &mdash; probability of CVE exploitation |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | None | 0.5 req/s | Known Exploited Vulnerabilities catalog with remediation deadlines |
| [npm Registry](https://www.npmjs.com) | None | 2 req/s | Package metadata, versions, scripts, provenance, attestations, advisories |
| [PyPI](https://pypi.org) | None | 2 req/s | Python package metadata, versions, releases, maintainer info |
| [crates.io](https://crates.io) | None | 1 req/s | Rust crate metadata, versions, dependencies, owners |
| [RubyGems](https://rubygems.org) | None | 1 req/s | Ruby gem metadata, versions, reverse dependencies |
| [NuGet](https://www.nuget.org) | None | 2 req/s | .NET package metadata, versions, dependency groups |
| [Packagist](https://packagist.org) | None | 1 req/s | PHP/Composer packages, download stats, security advisories |
| [Go Module Proxy](https://proxy.golang.org) | None | 2 req/s | Go module versions, go.mod contents, checksum verification |
| [Go Vulnerability Database](https://vuln.go.dev) | None | 2 req/s | Go-specific vulnerability advisories by module |
| [Google deps.dev](https://deps.dev) | None | 5 req/s | Cross-ecosystem dependency graphs, advisories, project info, purl lookup |
| [OpenSSF Scorecard](https://securityscorecards.dev) | Optional | 1 req/s | Repository security scoring across 18 checks |
| [OpenSSF Best Practices](https://www.bestpractices.dev) | None | 1 req/s | Best Practices badge status and criteria |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | 1 req/s | Package popularity, SourceRank, cross-platform dependency data |
| [ClearlyDefined](https://clearlydefined.io) | None | 2 req/s | Curated license data across ecosystems |
| [Sigstore Rekor](https://rekor.sigstore.dev) | None | 2 req/s | Transparency log for software signing &mdash; provenance verification |
| [Repology](https://repology.org) | None | 1 req/s | Package versions across Linux distributions |
| [Typosquatting Detection](https://github.com/badchars/supply-chain-mcp-server) | None | N/A | Built-in Levenshtein distance + confusable character analysis |

---

## Architecture

```
src/
  index.ts                # CLI entrypoint (--help, --list, --tool, stdio server)
  protocol/
    mcp-server.ts         # MCP server setup (stdio transport)
    tools.ts              # Tool registry — all 90 tools assembled here
  types/
    index.ts              # Shared types (ToolDef, ToolContext, ToolResult)
  utils/
    rate-limiter.ts       # Per-provider rate limiter
    cache.ts              # TTL cache for API responses
    http.ts               # Native fetch() wrapper with error handling
    require-key.ts        # API key validation helper
  osv/                    # OSV.dev Vulnerability tools (5)
  ghsa/                   # GitHub Advisory tools (4)
  nvd/                    # NIST NVD tools (3)
  epss/                   # EPSS Exploit Prediction tools (4)
  kev/                    # CISA KEV tools (4)
  npm/                    # npm Registry tools (10)
  pypi/                   # PyPI tools (4)
  crates/                 # crates.io tools (4)
  rubygems/               # RubyGems tools (4)
  nuget/                  # NuGet tools (4)
  packagist/              # Packagist/Composer tools (4)
  go/                     # Go Module Proxy tools (3)
  govuln/                 # Go Vulnerability Database tools (4)
  depsdev/                # Google deps.dev tools (10)
  scorecard/              # OpenSSF Scorecard tools (2)
  badge/                  # OpenSSF Best Practices tools (3)
  libraries/              # Libraries.io tools (4)
  clearlydefined/         # ClearlyDefined license tools (3)
  rekor/                  # Sigstore Rekor tools (5)
  repology/               # Repology tools (3)
  typosquat/              # Typosquatting Detection tools (2)
  meta/                   # Meta tools (1)
```

**Design decisions:**

- **21 providers, 1 server** &mdash; Every data source is an independent module. The agent picks which tools to use based on the query.
- **Per-provider rate limiters** &mdash; Each data source has its own `RateLimiter` instance calibrated to that API's limits. No shared bottleneck.
- **TTL caching** &mdash; Vulnerability data (5-30min), package metadata (5-15min), KEV catalog (60min), scorecard data (30min) are cached to avoid redundant API calls during multi-tool workflows.
- **Graceful degradation** &mdash; Missing API keys don't crash the server. Tools return descriptive error messages: "Set LIBRARIES_API_KEY to enable Libraries.io tools."
- **2 dependencies** &mdash; `@modelcontextprotocol/sdk` and `zod`. All HTTP via native `fetch()`. No external HTTP libraries needed.
- **Built-in intelligence** &mdash; Typosquatting detection uses Levenshtein distance and confusable character maps with curated lists of popular packages &mdash; no external API required.
- **Package URL (purl) support** &mdash; Multiple tools accept purl format (`pkg:npm/express@4.18.2`) for standardized package identification.

---

## Limitations

- Libraries.io tools require a (free) API key from libraries.io
- NVD free tier is limited to 5 requests per 30 seconds (50 with API key)
- GHSA and Scorecard benefit from `GITHUB_TOKEN` for higher rate limits
- CISA KEV is fetched as a single JSON file (~2MB) and cached for 60 minutes
- Typosquatting detection compares against a curated list of top npm/PyPI packages (not exhaustive)
- Go checksum database (sum.golang.org) may return 404 for very old or vendored-only modules
- Repology API has strict rate limits and may throttle aggressive querying
- ClearlyDefined coverage varies by ecosystem &mdash; npm and Maven have best coverage
- macOS / Linux tested (Windows not tested)

---

## Part of the MCP Security Suite

| Project | Domain | Tools |
|---|---|---|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Browser-based security testing | 39 tools, Firefox, injection testing |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Cloud security (AWS/Azure/GCP) | 38 tools, 60+ checks |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub security posture | 39 tools, 45 checks |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Vulnerability intelligence | 23 tools, 5 sources |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT & reconnaissance | 37 tools, 12 sources |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark web & threat intelligence | 66 tools, 16 sources |
| **supply-chain-mcp-server** | **Software supply chain security** | **90 tools, 21 sources** |

---

<p align="center">
<b>For authorized security testing and assessment only.</b><br>
Always ensure you have proper authorization before performing supply chain analysis on any target.
</p>

<p align="center">
  <a href="LICENSE">MIT License</a> &bull; Built with Bun + TypeScript
</p>
