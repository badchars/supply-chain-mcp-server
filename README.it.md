<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <strong>Italiano</strong> |
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

<h3 align="center">Sicurezza della supply chain software per agenti IA.</h3>

<p align="center">
  Scansione vulnerabilita, analisi pacchetti, verifica provenienza, rilevamento typosquatting, intelligence sulle dipendenze &mdash; attraverso npm, PyPI, crates.io, Go e altri ecosistemi, unificati in un unico server MCP.<br>
  Il vostro agente IA ottiene <b>intelligence completa sulla sicurezza della supply chain su richiesta</b>, invece di navigare manualmente tra decine di registri e database.
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

## Avvio rapido

### Opzione 1: npx (nessuna installazione)

```bash
npx supply-chain-mcp-server
```

La maggior parte degli strumenti funziona gratuitamente senza chiave API. OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor e altro sono pronti all'uso.

### Opzione 2: Clonare

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Variabili d'ambiente (opzionali)

```bash
export GITHUB_TOKEN=your-token          # GHSA + Scorecard limiti di frequenza piu alti
export LIBRARIES_API_KEY=your-key       # Richiesto per gli strumenti Libraries.io
export NVD_API_KEY=your-key             # NVD 50 rich./30s (senza chiave 5 rich./30s)
```

Tutte le chiavi API sono opzionali. Senza di esse, avrete comunque accesso a OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor, EPSS, KEV, Repology, rilevamento typosquatting e altro.

### Collegare al vostro agente IA

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Aggiungere a `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / altri client MCP</b></summary>

Stesso formato di configurazione JSON. Puntare il comando su `npx supply-chain-mcp-server` o il percorso di installazione locale.

</details>

---

## Panoramica strumenti (93 strumenti, 21 fonti dati + 1 meta)

| Categoria | Strumenti | Descrizione |
|-----------|-----------|-------------|
| Vulnerabilita OSV.dev | 5 | Database vulnerabilita unificato |
| GitHub Advisory (GHSA) | 4 | Avvisi di sicurezza GitHub |
| NIST NVD | 3 | Database CVE del NIST |
| Previsione exploit EPSS | 4 | Punteggio probabilita di sfruttamento |
| CISA KEV | 4 | Vulnerabilita sfruttate note |
| Registro npm | 10 | Registro npm + provenienza + audit |
| PyPI | 4 | Indice pacchetti Python |
| crates.io | 4 | Registro crate Rust |
| RubyGems | 4 | Registro gem Ruby |
| NuGet | 4 | Registro pacchetti .NET |
| Packagist | 4 | Registro PHP/Composer |
| Go Vulnerability DB | 4 | Database vulnerabilita Go |
| Go Proxy | 3 | Proxy moduli Go + DB checksum |
| deps.dev | 10 | Google Dependency Insights |
| OpenSSF Scorecard | 2 | Punteggio sicurezza OpenSSF |
| OpenSSF Best Practices | 3 | Badge migliori pratiche OpenSSF |
| Libraries.io | 4 | Intelligence inter-ecosistema |
| ClearlyDefined | 3 | Dati licenze e attribuzione |
| Sigstore Rekor | 5 | Registro trasparenza Sigstore |
| Repology | 3 | Tracciamento pacchetti inter-distribuzione |
| Rilevamento typosquatting | 2 | Rilevamento typosquatting integrato |
| Meta | 1 | Elenco fonti dati |

---

## Fonti dati (21)

| Fonte | Autenticazione | Dati forniti |
|-------|---------------|-------------|
| [OSV.dev](https://osv.dev) | Nessuna | Database vulnerabilita unificato (npm, PyPI, Go, crates.io, ecc.) |
| [GitHub Advisory](https://github.com/advisories) | Opzionale | Avvisi di sicurezza GitHub (GHSA) |
| [NIST NVD](https://nvd.nist.gov) | Opzionale | Dettagli vulnerabilita CVE, corrispondenza CPE |
| [EPSS](https://www.first.org/epss) | Nessuna | Punteggio probabilita di sfruttamento |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Nessuna | Catalogo vulnerabilita sfruttate note |
| [npm](https://www.npmjs.com) | Nessuna | Metadati pacchetti, versioni, provenienza, audit |
| [PyPI](https://pypi.org) | Nessuna | Metadati e versioni pacchetti Python |
| [crates.io](https://crates.io) | Nessuna | Metadati e versioni crate Rust |
| [RubyGems](https://rubygems.org) | Nessuna | Metadati e versioni gem Ruby |
| [NuGet](https://www.nuget.org) | Nessuna | Metadati e versioni pacchetti .NET |
| [Packagist](https://packagist.org) | Nessuna | Metadati pacchetti PHP/Composer |
| [Go Vuln DB](https://vuln.go.dev) | Nessuna | Vulnerabilita specifiche di Go |
| [Go Proxy](https://proxy.golang.org) | Nessuna | Versioni moduli Go e checksum |
| [deps.dev](https://deps.dev) | Nessuna | Grafo dipendenze, avvisi, versioni |
| [OpenSSF Scorecard](https://scorecard.dev) | Opzionale | Punteggi sicurezza per progetti open source |
| [OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org) | Nessuna | Stato badge CII Best Practices |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Intelligence dipendenze inter-ecosistema |
| [ClearlyDefined](https://clearlydefined.io) | Nessuna | Dati licenze e attribuzione |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Nessuna | Provenienza build e registro trasparenza firme |
| [Repology](https://repology.org) | Nessuna | Tracciamento versioni pacchetti inter-distribuzione |
| Rilevamento typosquatting | Nessuna | Analisi integrata distanza di edit + sostituzione caratteri |

---

## Architettura

```
src/
  index.ts                # Punto di ingresso CLI (--help, --list, server stdio)
  protocol/
    mcp-server.ts         # Configurazione server MCP (trasporto stdio)
    tools.ts              # Registro strumenti — tutti i 93 strumenti qui
  types/
    index.ts              # Tipi condivisi (ToolDef, ToolContext, ToolResult)
  utils/
    rate-limiter.ts       # Limitatore di frequenza per provider
    cache.ts              # Cache TTL per risposte API
  osv/                    # Strumenti OSV.dev (5)
  ghsa/                   # Strumenti GitHub Advisory (4)
  nvd/                    # Strumenti NIST NVD (3)
  epss/                   # Strumenti EPSS (4)
  kev/                    # Strumenti CISA KEV (4)
  npm/                    # Strumenti npm (10)
  pypi/                   # Strumenti PyPI (4)
  crates/                 # Strumenti crates.io (4)
  rubygems/               # Strumenti RubyGems (4)
  nuget/                  # Strumenti NuGet (4)
  packagist/              # Strumenti Packagist (4)
  govuln/                 # Strumenti Go Vuln DB (4)
  go/                     # Strumenti Go Proxy (3)
  depsdev/                # Strumenti deps.dev (10)
  scorecard/              # Strumenti OpenSSF Scorecard (2)
  badge/                  # Strumenti OpenSSF Best Practices (3)
  libraries/              # Strumenti Libraries.io (4)
  clearlydefined/         # Strumenti ClearlyDefined (3)
  rekor/                  # Strumenti Sigstore Rekor (5)
  repology/               # Strumenti Repology (3)
  typosquat/              # Strumenti rilevamento typosquatting (2)
  meta/                   # Strumenti meta (1)
```

---

## Suite di sicurezza MCP

| Progetto | Dominio | Strumenti |
|----------|---------|-----------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Test di sicurezza basati su browser | 39 strumenti, Firefox, test di iniezione |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Sicurezza cloud (AWS/Azure/GCP) | 38 strumenti, 60+ verifiche |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Postura di sicurezza GitHub | 39 strumenti, 45 verifiche |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Intelligence vulnerabilita | 23 strumenti, 5 fonti |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT e ricognizione | 37 strumenti, 12 fonti |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Intelligence dark web e minacce | 66 strumenti, 16 fonti |
| **supply-chain-mcp-server** | **Sicurezza della supply chain software** | **93 strumenti, 21 fonti** |

---

<p align="center">
<b>Solo per test e valutazioni di sicurezza autorizzati.</b><br>
Assicuratevi sempre di avere l'autorizzazione appropriata prima di eseguire analisi della supply chain.
</p>

<p align="center">
  <a href="LICENSE">Licenza MIT</a> &bull; Costruito con Bun + TypeScript
</p>
