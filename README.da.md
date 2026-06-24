<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <strong>Dansk</strong> |
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

<h3 align="center">Software-forsyningskaede-sikkerhed for AI-agenter.</h3>

<p align="center">
  Saarbarhedsscanning, pakkeanalyse, proveniens-verificering, typosquatting-detektion, afhaengighedsintelligens &mdash; paa tvaers af npm, PyPI, crates.io, Go og flere oekosystemer, samlet i en enkelt MCP-server.<br>
  Din AI-agent faar <b>omfattende forsyningskaede-sikkerhedsintelligens paa foresporgsel</b>, i stedet for manuelt at skifte mellem dusinvis af registre og databaser.
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

## Hurtig start

### Mulighed 1: npx (ingen installation)

```bash
npx supply-chain-mcp-server
```

De fleste vaerktoejer fungerer gratis uden API-noegle. OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor og mere er klar til brug.

### Mulighed 2: Klon

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Miljovariabler (valgfri)

```bash
export GITHUB_TOKEN=your-token          # GHSA + Scorecard hoejere hastighedsgraenser
export LIBRARIES_API_KEY=your-key       # Paakraevet for Libraries.io-vaerktoejer
export NVD_API_KEY=your-key             # NVD 50 forsp./30s (uden noegle 5 forsp./30s)
```

Alle API-noegler er valgfrie. Uden dem faar du stadig OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor, EPSS, KEV, Repology, typosquatting-detektion og mere.

### Forbind til din AI-agent

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Tilfoej til `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / andre MCP-klienter</b></summary>

Samme JSON-konfigurationsformat. Peg kommandoen til `npx supply-chain-mcp-server` eller din lokale installationssti.

</details>

---

## Vaerktojsoversigt (93 vaerktoejer, 21 datakilder + 1 meta)

| Kategori | Vaerktoejer | Beskrivelse |
|----------|------------|-------------|
| OSV.dev Saarbarheder | 5 | Samlet saarbarhedsdatabase |
| GitHub Advisory (GHSA) | 4 | GitHub-sikkerhedsraadgivninger |
| NIST NVD | 3 | NIST CVE-database |
| EPSS Exploit-forudsigelse | 4 | Exploit-sandsynlighedsscore |
| CISA KEV | 4 | Kendte udnyttede saarbarheder |
| npm-registret | 10 | npm-registret + proveniens + audit |
| PyPI | 4 | Python Package Index |
| crates.io | 4 | Rust crate-registret |
| RubyGems | 4 | Ruby gem-registret |
| NuGet | 4 | .NET pakke-registret |
| Packagist | 4 | PHP/Composer-registret |
| Go Vulnerability DB | 4 | Go-saarbarhedsdatabase |
| Go Proxy | 3 | Go-modulproxy + checksum-DB |
| deps.dev | 10 | Google Dependency Insights |
| OpenSSF Scorecard | 2 | OpenSSF-sikkerhedsscore |
| OpenSSF Best Practices | 3 | OpenSSF bedste praksis-badge |
| Libraries.io | 4 | Intelligens paa tvaers af oekosystemer |
| ClearlyDefined | 3 | Licens- og attributionsdata |
| Sigstore Rekor | 5 | Sigstore-transparenslog |
| Repology | 3 | Pakkesporing paa tvaers af distributioner |
| Typosquatting-detektion | 2 | Indbygget typosquatting-detektion |
| Meta | 1 | Datakilde-liste |

---

## Datakilder (21)

| Kilde | Autentificering | Leverede data |
|-------|----------------|--------------|
| [OSV.dev](https://osv.dev) | Ingen | Samlet saarbarhedsdatabase (npm, PyPI, Go, crates.io osv.) |
| [GitHub Advisory](https://github.com/advisories) | Valgfri | GitHub-sikkerhedsraadgivninger (GHSA) |
| [NIST NVD](https://nvd.nist.gov) | Valgfri | CVE-saarbarhedsdetaljer, CPE-matching |
| [EPSS](https://www.first.org/epss) | Ingen | Exploit-sandsynlighedsscore |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Ingen | Katalog over kendte udnyttede saarbarheder |
| [npm](https://www.npmjs.com) | Ingen | Pakkemetadata, versioner, proveniens, audit |
| [PyPI](https://pypi.org) | Ingen | Python-pakkemetadata og -versioner |
| [crates.io](https://crates.io) | Ingen | Rust crate-metadata og -versioner |
| [RubyGems](https://rubygems.org) | Ingen | Ruby gem-metadata og -versioner |
| [NuGet](https://www.nuget.org) | Ingen | .NET-pakkemetadata og -versioner |
| [Packagist](https://packagist.org) | Ingen | PHP/Composer-pakkemetadata |
| [Go Vuln DB](https://vuln.go.dev) | Ingen | Go-specifikke saarbarheder |
| [Go Proxy](https://proxy.golang.org) | Ingen | Go-modulversioner og checksums |
| [deps.dev](https://deps.dev) | Ingen | Afhaengighedsgraf, raadgivninger, versioner |
| [OpenSSF Scorecard](https://scorecard.dev) | Valgfri | Sikkerhedsscorer for open source-projekter |
| [OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org) | Ingen | CII Best Practices badge-status |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Afhaengighedsintelligens paa tvaers af oekosystemer |
| [ClearlyDefined](https://clearlydefined.io) | Ingen | Licens- og attributionsdata |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Ingen | Build-proveniens og signatur-transparenslog |
| [Repology](https://repology.org) | Ingen | Pakkeversions-sporing paa tvaers af distributioner |
| Typosquatting-detektion | Ingen | Indbygget redigeringsafstands- + tegnsubstitutionsanalyse |

---

## Arkitektur

```
src/
  index.ts                # CLI-indgangspunkt (--help, --list, stdio-server)
  protocol/
    mcp-server.ts         # MCP-server-opsaetning (stdio-transport)
    tools.ts              # Vaerktoejsregister — alle 93 vaerktoejer samlet her
  types/
    index.ts              # Delte typer (ToolDef, ToolContext, ToolResult)
  utils/
    rate-limiter.ts       # Hastighedsbegraenser per udbyder
    cache.ts              # TTL-cache for API-svar
  osv/                    # OSV.dev-vaerktoejer (5)
  ghsa/                   # GitHub Advisory-vaerktoejer (4)
  nvd/                    # NIST NVD-vaerktoejer (3)
  epss/                   # EPSS-vaerktoejer (4)
  kev/                    # CISA KEV-vaerktoejer (4)
  npm/                    # npm-vaerktoejer (10)
  pypi/                   # PyPI-vaerktoejer (4)
  crates/                 # crates.io-vaerktoejer (4)
  rubygems/               # RubyGems-vaerktoejer (4)
  nuget/                  # NuGet-vaerktoejer (4)
  packagist/              # Packagist-vaerktoejer (4)
  govuln/                 # Go Vuln DB-vaerktoejer (4)
  go/                     # Go Proxy-vaerktoejer (3)
  depsdev/                # deps.dev-vaerktoejer (10)
  scorecard/              # OpenSSF Scorecard-vaerktoejer (2)
  badge/                  # OpenSSF Best Practices-vaerktoejer (3)
  libraries/              # Libraries.io-vaerktoejer (4)
  clearlydefined/         # ClearlyDefined-vaerktoejer (3)
  rekor/                  # Sigstore Rekor-vaerktoejer (5)
  repology/               # Repology-vaerktoejer (3)
  typosquat/              # Typosquatting-detektionsvaerktoejer (2)
  meta/                   # Meta-vaerktoejer (1)
```

---

## Del af MCP-sikkerhedssuiten

| Projekt | Omraade | Vaerktoejer |
|---------|---------|------------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Browserbaseret sikkerhedstest | 39 vaerktoejer, Firefox, injektionstest |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Cloud-sikkerhed (AWS/Azure/GCP) | 38 vaerktoejer, 60+ tjek |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub-sikkerhedsstatus | 39 vaerktoejer, 45 tjek |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Saarbarhedsintelligens | 23 vaerktoejer, 5 kilder |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT og rekognoscering | 37 vaerktoejer, 12 kilder |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark web- og trusselsintelligens | 66 vaerktoejer, 16 kilder |
| **supply-chain-mcp-server** | **Software-forsyningskaede-sikkerhed** | **93 vaerktoejer, 21 kilder** |

---

<p align="center">
<b>Kun til autoriseret sikkerhedstest og -vurdering.</b><br>
Soerg altid for at have korrekt autorisation, foer du udfoerer forsyningskaede-analyser.
</p>

<p align="center">
  <a href="LICENSE">MIT-licens</a> &bull; Bygget med Bun + TypeScript
</p>
