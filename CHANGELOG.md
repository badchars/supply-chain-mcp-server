# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-23

### Added

- Initial release with 90 tools across 21 data sources
- MCP server with stdio transport for AI agent integration
- **OSV.dev** (5 tools) -- vulnerability query, commit lookup, purl lookup, batch query, ID lookup
- **GHSA** (4 tools) -- advisory lookup, search, package advisories, recent advisories
- **NIST NVD** (3 tools) -- CVE lookup, keyword search, recent CVEs
- **EPSS** (4 tools) -- exploit probability score, batch scores, top exploited, threshold filter
- **CISA KEV** (4 tools) -- CVE lookup, keyword search, recent additions, catalog statistics
- **npm** (10 tools) -- package info, version details, downloads, search, maintainers, script analysis, provenance check, bulk audit, attestations, download range
- **PyPI** (4 tools) -- package info, version details, releases, maintainers
- **crates.io** (4 tools) -- crate info, versions, dependencies, owners
- **RubyGems** (4 tools) -- gem info, versions, search, reverse dependencies
- **NuGet** (4 tools) -- package registration, search, version list, catalog entry
- **Packagist** (4 tools) -- package info, search, download stats, security advisories
- **Go Module Proxy** (3 tools) -- module info, version details, checksum verification
- **Go Vulnerability DB** (4 tools) -- vuln by ID, vuln list, DB info, module lookup
- **Google deps.dev** (10 tools) -- package, version, dependencies, dependents, advisory, project, hash query, requirements, similar packages, purl lookup
- **OpenSSF Scorecard** (2 tools) -- repo score, multi-repo comparison
- **OpenSSF Best Practices** (3 tools) -- project badge, search, repo lookup
- **Libraries.io** (4 tools) -- package info, dependencies, dependents, sourcerank
- **ClearlyDefined** (3 tools) -- license lookup, batch lookup, search
- **Sigstore Rekor** (5 tools) -- search, entry lookup, log info, batch entries, hash verification
- **Repology** (3 tools) -- project versions, repo problems, project search
- **Typosquatting Detection** (2 tools) -- name check, name comparison
- **Meta** (1 tool) -- data source listing
- CLI with `--list`, `--help`, `--tool` flags
- Per-provider rate limiting and TTL caching
- README translations in 23 languages
- Dark/light mode SVG banners
- Social preview image
