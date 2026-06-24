<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <strong>Deutsch</strong> |
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

<h3 align="center">Software-Supply-Chain-Sicherheit fuer KI-Agenten.</h3>

<p align="center">
  Schwachstellen-Scanning, Paketanalyse, Herkunftsverifizierung, Typosquatting-Erkennung, Abhaengigkeitsintelligenz &mdash; ueber npm, PyPI, crates.io, Go und weitere Oekosysteme, vereint in einem einzigen MCP-Server.<br>
  Ihr KI-Agent erhaelt <b>umfassende Supply-Chain-Sicherheitsintelligenz auf Abruf</b>, statt manuell zwischen Dutzenden Registries und Datenbanken zu wechseln.
</p>

<br>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-93-ef4444" alt="93 Tools">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 Sources">
</p>

---

## Schnellstart

### Option 1: npx (keine Installation)

```bash
npx supply-chain-mcp-server
```

Die meisten Werkzeuge funktionieren kostenlos ohne API-Schluessel. OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor und mehr sind sofort einsatzbereit.

### Option 2: Klonen

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Umgebungsvariablen (optional)

```bash
export GITHUB_TOKEN=your-token          # GHSA + Scorecard hoehere Ratenlimits
export LIBRARIES_API_KEY=your-key       # Erforderlich fuer Libraries.io-Werkzeuge
export NVD_API_KEY=your-key             # NVD 50 Anf./30s (ohne Schluessel 5 Anf./30s)
```

Alle API-Schluessel sind optional. Ohne sie erhalten Sie weiterhin OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor, EPSS, KEV, Repology, Typosquatting-Erkennung und mehr.

### Mit Ihrem KI-Agenten verbinden

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Zu `~/Library/Application Support/Claude/claude_desktop_config.json` hinzufuegen:

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
<summary><b>Cursor / Windsurf / andere MCP-Clients</b></summary>

Gleiches JSON-Konfigurationsformat. Richten Sie den Befehl auf `npx supply-chain-mcp-server` oder Ihren lokalen Installationspfad.

</details>

---

## Werkzeug-Uebersicht (93 Werkzeuge, 21 Datenquellen + 1 Meta)

| Kategorie | Werkzeuge | Beschreibung |
|-----------|-----------|-------------|
| OSV.dev Schwachstellen | 5 | Vereinheitlichte Schwachstellendatenbank |
| GitHub Advisory (GHSA) | 4 | GitHub-Sicherheitsempfehlungen |
| NIST NVD | 3 | NIST-CVE-Datenbank |
| EPSS Exploit-Vorhersage | 4 | Exploit-Wahrscheinlichkeitsbewertung |
| CISA KEV | 4 | Bekannte ausgenutzte Schwachstellen |
| npm-Registry | 10 | npm-Registry + Herkunft + Audit |
| PyPI | 4 | Python-Paketindex |
| crates.io | 4 | Rust-Crate-Registry |
| RubyGems | 4 | Ruby-Gem-Registry |
| NuGet | 4 | .NET-Paket-Registry |
| Packagist | 4 | PHP/Composer-Registry |
| Go Vulnerability DB | 4 | Go-Schwachstellendatenbank |
| Go Proxy | 3 | Go-Modul-Proxy + Pruefsummen-DB |
| deps.dev | 10 | Google Dependency Insights |
| OpenSSF Scorecard | 2 | OpenSSF-Sicherheitsbewertung |
| OpenSSF Best Practices | 3 | OpenSSF-Best-Practices-Badge |
| Libraries.io | 4 | Oekosystemuebergreifende Intelligenz |
| ClearlyDefined | 3 | Lizenz- und Zuordnungsdaten |
| Sigstore Rekor | 5 | Sigstore-Transparenzprotokoll |
| Repology | 3 | Distributionsuebergreifende Paketverfolgung |
| Typosquatting-Erkennung | 2 | Integrierte Typosquatting-Erkennung |
| Meta | 1 | Datenquellenliste |

---

## Datenquellen (21)

| Quelle | Auth | Bereitgestellte Daten |
|--------|------|----------------------|
| [OSV.dev](https://osv.dev) | Keine | Vereinheitlichte Schwachstellendatenbank (npm, PyPI, Go, crates.io usw.) |
| [GitHub Advisory](https://github.com/advisories) | Optional | GitHub-Sicherheitsempfehlungen (GHSA) |
| [NIST NVD](https://nvd.nist.gov) | Optional | CVE-Schwachstellendetails, CPE-Matching |
| [EPSS](https://www.first.org/epss) | Keine | Exploit-Wahrscheinlichkeitsbewertung |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Keine | Katalog bekannter ausgenutzter Schwachstellen |
| [npm](https://www.npmjs.com) | Keine | Paketmetadaten, Versionen, Herkunft, Audit |
| [PyPI](https://pypi.org) | Keine | Python-Paketmetadaten und -versionen |
| [crates.io](https://crates.io) | Keine | Rust-Crate-Metadaten und -versionen |
| [RubyGems](https://rubygems.org) | Keine | Ruby-Gem-Metadaten und -versionen |
| [NuGet](https://www.nuget.org) | Keine | .NET-Paketmetadaten und -versionen |
| [Packagist](https://packagist.org) | Keine | PHP/Composer-Paketmetadaten |
| [Go Vuln DB](https://vuln.go.dev) | Keine | Go-spezifische Schwachstellen |
| [Go Proxy](https://proxy.golang.org) | Keine | Go-Modulversionen und Pruefsummen |
| [deps.dev](https://deps.dev) | Keine | Abhaengigkeitsgraph, Empfehlungen, Versionen |
| [OpenSSF Scorecard](https://scorecard.dev) | Optional | Sicherheitsbewertungen fuer Open-Source-Projekte |
| [OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org) | Keine | CII-Best-Practices-Badge-Status |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Oekosystemuebergreifende Abhaengigkeitsintelligenz |
| [ClearlyDefined](https://clearlydefined.io) | Keine | Lizenz- und Zuordnungsdaten |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Keine | Build-Herkunft und Signatur-Transparenzprotokoll |
| [Repology](https://repology.org) | Keine | Distributionsuebergreifende Paketversions-Verfolgung |
| Typosquatting-Erkennung | Keine | Integrierte Editierdistanz- + Zeichenersetzungs-Analyse |

---

## Architektur

```
src/
  index.ts                # CLI-Einstiegspunkt (--help, --list, stdio-Server)
  protocol/
    mcp-server.ts         # MCP-Server-Setup (stdio-Transport)
    tools.ts              # Werkzeug-Registry — alle 93 Werkzeuge hier
  types/
    index.ts              # Gemeinsame Typen (ToolDef, ToolContext, ToolResult)
  utils/
    rate-limiter.ts       # Pro-Provider-Ratenbegrenzer
    cache.ts              # TTL-Cache fuer API-Antworten
  osv/                    # OSV.dev-Werkzeuge (5)
  ghsa/                   # GitHub-Advisory-Werkzeuge (4)
  nvd/                    # NIST-NVD-Werkzeuge (3)
  epss/                   # EPSS-Werkzeuge (4)
  kev/                    # CISA-KEV-Werkzeuge (4)
  npm/                    # npm-Werkzeuge (10)
  pypi/                   # PyPI-Werkzeuge (4)
  crates/                 # crates.io-Werkzeuge (4)
  rubygems/               # RubyGems-Werkzeuge (4)
  nuget/                  # NuGet-Werkzeuge (4)
  packagist/              # Packagist-Werkzeuge (4)
  govuln/                 # Go-Vuln-DB-Werkzeuge (4)
  go/                     # Go-Proxy-Werkzeuge (3)
  depsdev/                # deps.dev-Werkzeuge (10)
  scorecard/              # OpenSSF-Scorecard-Werkzeuge (2)
  badge/                  # OpenSSF-Best-Practices-Werkzeuge (3)
  libraries/              # Libraries.io-Werkzeuge (4)
  clearlydefined/         # ClearlyDefined-Werkzeuge (3)
  rekor/                  # Sigstore-Rekor-Werkzeuge (5)
  repology/               # Repology-Werkzeuge (3)
  typosquat/              # Typosquatting-Erkennungswerkzeuge (2)
  meta/                   # Meta-Werkzeuge (1)
```

---

## Teil der MCP-Sicherheits-Suite

| Projekt | Bereich | Werkzeuge |
|---------|---------|-----------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Browserbasierte Sicherheitstests | 39 Werkzeuge, Firefox, Injection-Tests |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Cloud-Sicherheit (AWS/Azure/GCP) | 38 Werkzeuge, 60+ Pruefungen |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub-Sicherheitslage | 39 Werkzeuge, 45 Pruefungen |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Schwachstellenintelligenz | 23 Werkzeuge, 5 Quellen |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT und Aufklaerung | 37 Werkzeuge, 12 Quellen |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark-Web- und Bedrohungsintelligenz | 66 Werkzeuge, 16 Quellen |
| **supply-chain-mcp-server** | **Software-Supply-Chain-Sicherheit** | **93 Werkzeuge, 21 Quellen** |

---

<p align="center">
<b>Nur fuer autorisierte Sicherheitstests und -bewertungen.</b><br>
Stellen Sie immer sicher, dass Sie die entsprechende Genehmigung haben, bevor Sie Supply-Chain-Analysen durchfuehren.
</p>

<p align="center">
  <a href="LICENSE">MIT-Lizenz</a> &bull; Erstellt mit Bun + TypeScript
</p>
