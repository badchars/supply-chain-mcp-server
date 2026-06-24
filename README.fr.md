<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <strong>Français</strong> |
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

<h3 align="center">Securite de la chaine d'approvisionnement logicielle pour les agents IA.</h3>

<p align="center">
  Analyse de vulnerabilites, analyse de paquets, verification de provenance, detection de typosquatting, intelligence des dependances &mdash; a travers npm, PyPI, crates.io, Go et d'autres ecosystemes, unifies dans un seul serveur MCP.<br>
  Votre agent IA obtient une <b>intelligence complete de securite de chaine d'approvisionnement a la demande</b>, au lieu de naviguer manuellement entre des dizaines de registres et bases de donnees.
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

## Demarrage rapide

### Option 1 : npx (sans installation)

```bash
npx supply-chain-mcp-server
```

La plupart des outils fonctionnent gratuitement sans cle API. OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor et plus sont prets a l'emploi.

### Option 2 : Cloner

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Variables d'environnement (optionnelles)

```bash
export GITHUB_TOKEN=your-token          # GHSA + Scorecard limites de taux plus elevees
export LIBRARIES_API_KEY=your-key       # Requis pour les outils Libraries.io
export NVD_API_KEY=your-key             # NVD 50 req./30s (sans cle 5 req./30s)
```

Toutes les cles API sont optionnelles. Sans elles, vous avez toujours acces a OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor, EPSS, KEV, Repology, detection de typosquatting et plus.

### Connecter a votre agent IA

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Ajouter a `~/Library/Application Support/Claude/claude_desktop_config.json` :

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
<summary><b>Cursor / Windsurf / autres clients MCP</b></summary>

Meme format de configuration JSON. Pointez la commande vers `npx supply-chain-mcp-server` ou votre chemin d'installation local.

</details>

---

## Apercu des outils (93 outils, 21 sources de donnees + 1 meta)

| Categorie | Outils | Description |
|-----------|--------|-------------|
| Vulnerabilites OSV.dev | 5 | Base de donnees de vulnerabilites unifiee |
| GitHub Advisory (GHSA) | 4 | Avis de securite GitHub |
| NIST NVD | 3 | Base de donnees CVE du NIST |
| Prediction d'exploits EPSS | 4 | Score de probabilite d'exploitation |
| CISA KEV | 4 | Vulnerabilites exploitees connues |
| Registre npm | 10 | Registre npm + provenance + audit |
| PyPI | 4 | Index des paquets Python |
| crates.io | 4 | Registre des crates Rust |
| RubyGems | 4 | Registre des gems Ruby |
| NuGet | 4 | Registre des paquets .NET |
| Packagist | 4 | Registre PHP/Composer |
| Go Vulnerability DB | 4 | Base de donnees de vulnerabilites Go |
| Go Proxy | 3 | Proxy de modules Go + DB de checksums |
| deps.dev | 10 | Google Dependency Insights |
| OpenSSF Scorecard | 2 | Score de securite OpenSSF |
| OpenSSF Best Practices | 3 | Badge de meilleures pratiques OpenSSF |
| Libraries.io | 4 | Intelligence inter-ecosystemes |
| ClearlyDefined | 3 | Donnees de licences et d'attribution |
| Sigstore Rekor | 5 | Journal de transparence Sigstore |
| Repology | 3 | Suivi de paquets inter-distributions |
| Detection de typosquatting | 2 | Detection de typosquatting integree |
| Meta | 1 | Liste des sources de donnees |

---

## Sources de donnees (21)

| Source | Authentification | Donnees fournies |
|--------|-----------------|-----------------|
| [OSV.dev](https://osv.dev) | Aucune | Base de donnees de vulnerabilites unifiee (npm, PyPI, Go, crates.io, etc.) |
| [GitHub Advisory](https://github.com/advisories) | Optionnel | Avis de securite GitHub (GHSA) |
| [NIST NVD](https://nvd.nist.gov) | Optionnel | Details des vulnerabilites CVE, correspondance CPE |
| [EPSS](https://www.first.org/epss) | Aucune | Score de probabilite d'exploitation |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Aucune | Catalogue des vulnerabilites exploitees connues |
| [npm](https://www.npmjs.com) | Aucune | Metadonnees de paquets, versions, provenance, audit |
| [PyPI](https://pypi.org) | Aucune | Metadonnees et versions de paquets Python |
| [crates.io](https://crates.io) | Aucune | Metadonnees et versions de crates Rust |
| [RubyGems](https://rubygems.org) | Aucune | Metadonnees et versions de gems Ruby |
| [NuGet](https://www.nuget.org) | Aucune | Metadonnees et versions de paquets .NET |
| [Packagist](https://packagist.org) | Aucune | Metadonnees de paquets PHP/Composer |
| [Go Vuln DB](https://vuln.go.dev) | Aucune | Vulnerabilites specifiques a Go |
| [Go Proxy](https://proxy.golang.org) | Aucune | Versions de modules Go et checksums |
| [deps.dev](https://deps.dev) | Aucune | Graphe de dependances, avis, versions |
| [OpenSSF Scorecard](https://scorecard.dev) | Optionnel | Scores de securite pour projets open source |
| [OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org) | Aucune | Statut du badge CII Best Practices |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Intelligence de dependances inter-ecosystemes |
| [ClearlyDefined](https://clearlydefined.io) | Aucune | Donnees de licences et d'attribution |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Aucune | Provenance de build et journal de transparence des signatures |
| [Repology](https://repology.org) | Aucune | Suivi des versions de paquets inter-distributions |
| Detection de typosquatting | Aucune | Analyse integree de distance d'edition + substitution de caracteres |

---

## Architecture

```
src/
  index.ts                # Point d'entree CLI (--help, --list, serveur stdio)
  protocol/
    mcp-server.ts         # Configuration du serveur MCP (transport stdio)
    tools.ts              # Registre d'outils — les 93 outils assembles ici
  types/
    index.ts              # Types partages (ToolDef, ToolContext, ToolResult)
  utils/
    rate-limiter.ts       # Limiteur de taux par fournisseur
    cache.ts              # Cache TTL pour les reponses API
  osv/                    # Outils OSV.dev (5)
  ghsa/                   # Outils GitHub Advisory (4)
  nvd/                    # Outils NIST NVD (3)
  epss/                   # Outils EPSS (4)
  kev/                    # Outils CISA KEV (4)
  npm/                    # Outils npm (10)
  pypi/                   # Outils PyPI (4)
  crates/                 # Outils crates.io (4)
  rubygems/               # Outils RubyGems (4)
  nuget/                  # Outils NuGet (4)
  packagist/              # Outils Packagist (4)
  govuln/                 # Outils Go Vuln DB (4)
  go/                     # Outils Go Proxy (3)
  depsdev/                # Outils deps.dev (10)
  scorecard/              # Outils OpenSSF Scorecard (2)
  badge/                  # Outils OpenSSF Best Practices (3)
  libraries/              # Outils Libraries.io (4)
  clearlydefined/         # Outils ClearlyDefined (3)
  rekor/                  # Outils Sigstore Rekor (5)
  repology/               # Outils Repology (3)
  typosquat/              # Outils de detection de typosquatting (2)
  meta/                   # Outils meta (1)
```

---

## Suite de securite MCP

| Projet | Domaine | Outils |
|--------|---------|--------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Tests de securite bases sur navigateur | 39 outils, Firefox, tests d'injection |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Securite cloud (AWS/Azure/GCP) | 38 outils, 60+ verifications |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Posture de securite GitHub | 39 outils, 45 verifications |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Intelligence de vulnerabilites | 23 outils, 5 sources |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT et reconnaissance | 37 outils, 12 sources |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Intelligence dark web et menaces | 66 outils, 16 sources |
| **supply-chain-mcp-server** | **Securite de la chaine d'approvisionnement logicielle** | **93 outils, 21 sources** |

---

<p align="center">
<b>Uniquement pour les tests et evaluations de securite autorises.</b><br>
Assurez-vous toujours d'avoir l'autorisation appropriee avant d'effectuer des analyses de chaine d'approvisionnement.
</p>

<p align="center">
  <a href="LICENSE">Licence MIT</a> &bull; Construit avec Bun + TypeScript
</p>
