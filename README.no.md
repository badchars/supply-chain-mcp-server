<p align="center">
  <a href="README.md">English</a> |
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
  <strong>Norsk</strong> |
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
    <img alt="supply-chain-mcp-server" src="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">Programvareforsyningskjedesikkerhet for AI-agenter.</h3>

<p align="center">
  Sarbarhetsskanning, pakkeanalyse, opprinnelsesverifisering, typosquatting-deteksjon, avhengighetsintelligens &mdash; 90 verktoy fra 21 datakilder i en enkelt MCP-server.<br>
  Din AI-agent <b>oppdager forsyningskjederisiko pa foresporselen</b>, uten manuell gjennomgang av registre.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Lisens"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 verktoy">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 kilder">
</p>

---

## Oversikt

**supply-chain-mcp-server** gir AI-agenter 90 verktoy for programvareforsyningskjedesikkerhet gjennom [Model Context Protocol](https://modelcontextprotocol.io). Dekker sarbarhetsskanning (OSV, GHSA, NVD), pakkeanalyse (npm, PyPI, crates.io, Go, RubyGems, NuGet, Packagist), opprinnelsesverifisering (Sigstore Rekor), avhengighetsintelligens (deps.dev, Libraries.io), OpenSSF Scorecard, EPSS utnyttelsesprediksjoner, CISA KEV og typosquatting-deteksjon.

---

## Hurtigstart

### Alternativ 1: npx (ingen installasjon)

```bash
npx supply-chain-mcp-server
```

### Alternativ 2: Kloning

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Miljovariable (alle valgfrie)

```bash
export GITHUB_TOKEN=your-token         # Hoyere API-grenser for GHSA og Scorecard
export LIBRARIES_API_KEY=your-key      # Libraries.io API-tilgang
export NVD_API_KEY=your-key            # Hoyere API-grenser for NVD
```

Alle API-nokler er valgfrie. Uten nokler fungerer fortsatt OSV, deps.dev, npm, PyPI, crates.io, Go, EPSS, CISA KEV, Rekor, typosquatting-deteksjon og mye mer.

---

## Verktoyoversikt &mdash; 90 verktoy, 21 datakilder

Tilbyr 90 verktoy som dekker sarbarhetsintelligens, pakkemetadata, sikkerhetsscoring, lisensoverholdelse, opprinnelsesverifisering og typosquatting-deteksjon.

---

## Koble til AI-agent

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Legg til i `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / Andre MCP-klienter</b></summary>

Samme JSON-konfigurasjonsformat. Pek kommandoen til `npx supply-chain-mcp-server`.

</details>

---

## Datakilder (21)

| Kilde | Kategori | Hva den gir |
|-------|----------|-------------|
| [OSV.dev](https://osv.dev) | Sarbarheter | Multi-okosystem sarbarhetsdatabase |
| [GHSA](https://github.com/advisories) | Sarbarheter | GitHub sikkerhetsradgivninger |
| [NVD](https://nvd.nist.gov) | Sarbarheter | NIST sarbarhetsdatabase, CVE |
| [EPSS](https://www.first.org/epss) | Sarbarheter | Scoring av utnyttelsesprediksjoner |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Sarbarheter | Katalog over kjente utnyttede sarbarheter |
| [npm](https://www.npmjs.com) | Pakker | npm-registermetadata og radgivninger |
| [PyPI](https://pypi.org) | Pakker | Python pakkeindeks |
| [crates.io](https://crates.io) | Pakker | Rust pakkeregister |
| [RubyGems](https://rubygems.org) | Pakker | Ruby pakkeregister |
| [NuGet](https://www.nuget.org) | Pakker | .NET pakkeregister |
| [Packagist](https://packagist.org) | Pakker | PHP pakkeregister |
| [Go Proxy](https://proxy.golang.org) | Pakker | Go modulproxy |
| [Go Vuln DB](https://vuln.go.dev) | Sarbarheter | Go sarbarhetsdatabase |
| [deps.dev](https://deps.dev) | Avhengigheter | Avhengighetsgraf og metadata |
| [OpenSSF Scorecard](https://scorecard.dev) | Sikkerhet | OSS sikkerhetsscoring |
| [Best Practices](https://www.bestpractices.dev) | Sikkerhet | OpenSSF Best Practices-merke |
| [Libraries.io](https://libraries.io) | Avhengigheter | Pakkeavhengighetsintelligens |
| [ClearlyDefined](https://clearlydefined.io) | Lisenser | Data for lisensoverholdelse |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Opprinnelse | Byggopprinnelse og signaturtransparens |
| [Repology](https://repology.org) | Pakker | Pakkesporing pa tvers av distribusjoner |
| [Typosquat](https://en.wikipedia.org/wiki/Typosquatting) | Sikkerhet | Deteksjon av typosquatting i pakkenavn |

---

## Arkitektur

```
src/
  index.ts              # CLI-inngangspunkt (--help, --list, stdio-server)
  protocol/
    mcp-server.ts       # MCP-serveroppsett (stdio-transport)
    tools.ts            # Verktoyregister — alle 90 verktoy
  types/
    index.ts            # Delte typer
  utils/
    rate-limiter.ts     # Hastighetsbegrenser per tilbyder
    cache.ts            # TTL-hurtigbuffer for API-svar
  osv/                  # OSV.dev sarbarhetsverktoy
  ghsa/                 # GitHub sikkerhetsradgivningsverktoy
  nvd/                  # NVD sarbarhetsverktoy
  epss/                 # EPSS scoringverktoy
  kev/                  # CISA KEV-verktoy
  npm/                  # npm pakkeverktoy
  pypi/                 # PyPI pakkeverktoy
  crates/               # crates.io pakkeverktoy
  rubygems/             # RubyGems-verktoy
  nuget/                # NuGet-verktoy
  packagist/            # Packagist-verktoy
  go/                   # Go Proxy-verktoy
  govuln/               # Go Vuln DB-verktoy
  depsdev/              # deps.dev avhengighetsverktoy
  scorecard/            # OpenSSF Scorecard-verktoy
  badge/                # Best Practices-merkeverktoy
  libraries/            # Libraries.io-verktoy
  clearlydefined/       # ClearlyDefined lisensverktoy
  rekor/                # Sigstore Rekor opprinnelsesverktoy
  repology/             # Repology pakkesporingsverktoy
  typosquat/            # Typosquatting-deteksjonsverktoy
  meta/                 # Metaverktoy
```

---

## Del av MCP Security Suite

| Prosjekt | Domene | Verktoy |
|----------|--------|---------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Nettleserbasert sikkerhetstesting | 39 verktoy |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Skysikkerhet (AWS/Azure/GCP) | 38 verktoy |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub sikkerhetsposisjon | 39 verktoy |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Sarbarhetsintelligens | 23 verktoy |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT og rekognosering | 37 verktoy |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Darkweb og trusselintelligens | 66 verktoy |
| **supply-chain-mcp-server** | **Forsyningskjedesikkerhet** | **90 verktoy** |

---

<p align="center">
<b>Kun for ansvarlig sikkerhetstesting og vurdering.</b><br>
Sikre at du har riktig tillatelse for du utforer forsyningskjedeanalyse.
</p>

<p align="center">
  <a href="LICENSE">MIT-lisens</a> &bull; Bygget med Bun + TypeScript
</p>
