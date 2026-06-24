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
  <strong>Bosanski</strong> |
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
    <img alt="supply-chain-mcp-server" src="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">Sigurnost lanca snabdijevanja softvera za AI agente.</h3>

<p align="center">
  Skeniranje ranjivosti, analiza paketa, verifikacija porijekla, detekcija typosquattinga, obavjestajni podaci o zavisnostima &mdash; 90 alata iz 21 izvora podataka u jednom MCP serveru.<br>
  Vas AI agent <b>otkriva rizike lanca snabdijevanja na zahtjev</b>, bez rucnog pregledanja registara.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Licenca"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 alata">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 izvor">
</p>

---

## Pregled

**supply-chain-mcp-server** pruza AI agentima 90 alata za sigurnost lanca snabdijevanja softvera putem [Model Context Protocol](https://modelcontextprotocol.io). Pokriva skeniranje ranjivosti (OSV, GHSA, NVD), analizu paketa (npm, PyPI, crates.io, Go, RubyGems, NuGet, Packagist), verifikaciju porijekla (Sigstore Rekor), obavjestajne podatke o zavisnostima (deps.dev, Libraries.io), OpenSSF Scorecard, EPSS predvidjanje eksploatacije, CISA KEV i detekciju typosquattinga.

---

## Brzi pocetak

### Opcija 1: npx (bez instalacije)

```bash
npx supply-chain-mcp-server
```

### Opcija 2: Kloniranje

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Varijable okruzenja (sve opcionalne)

```bash
export GITHUB_TOKEN=your-token         # Visi limiti API-ja za GHSA i Scorecard
export LIBRARIES_API_KEY=your-key      # Pristup Libraries.io API-ju
export NVD_API_KEY=your-key            # Visi limiti API-ja za NVD
```

Svi API kljucevi su opcionalni. Bez kljuceva i dalje rade OSV, deps.dev, npm, PyPI, crates.io, Go, EPSS, CISA KEV, Rekor, detekcija typosquattinga i jos mnogo toga.

---

## Pregled alata &mdash; 90 alata, 21 izvor podataka

Pruza 90 alata koji pokrivaju obavjestajne podatke o ranjivostima, metapodatke paketa, sigurnosno ocjenjivanje, uskladenost licenci, verifikaciju porijekla i detekciju typosquattinga.

---

## Povezivanje sa AI agentom

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Dodajte u `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / Drugi MCP klijenti</b></summary>

Isti JSON format konfiguracije. Usmjerite komandu na `npx supply-chain-mcp-server`.

</details>

---

## Izvori podataka (21)

| Izvor | Kategorija | Sta pruza |
|-------|------------|-----------|
| [OSV.dev](https://osv.dev) | Ranjivosti | Multi-ekosistemska baza ranjivosti |
| [GHSA](https://github.com/advisories) | Ranjivosti | GitHub sigurnosni savjeti |
| [NVD](https://nvd.nist.gov) | Ranjivosti | NIST baza ranjivosti, CVE |
| [EPSS](https://www.first.org/epss) | Ranjivosti | Ocjena predvidjanja eksploatacije |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Ranjivosti | Katalog poznatih eksploatisanih ranjivosti |
| [npm](https://www.npmjs.com) | Paketi | Metapodaci npm registra i savjeti |
| [PyPI](https://pypi.org) | Paketi | Python indeks paketa |
| [crates.io](https://crates.io) | Paketi | Rust registar paketa |
| [RubyGems](https://rubygems.org) | Paketi | Ruby registar paketa |
| [NuGet](https://www.nuget.org) | Paketi | .NET registar paketa |
| [Packagist](https://packagist.org) | Paketi | PHP registar paketa |
| [Go Proxy](https://proxy.golang.org) | Paketi | Go modul proxy |
| [Go Vuln DB](https://vuln.go.dev) | Ranjivosti | Go baza ranjivosti |
| [deps.dev](https://deps.dev) | Zavisnosti | Graf zavisnosti i metapodaci |
| [OpenSSF Scorecard](https://scorecard.dev) | Sigurnost | OSS sigurnosno ocjenjivanje |
| [Best Practices](https://www.bestpractices.dev) | Sigurnost | OpenSSF Best Practices znacka |
| [Libraries.io](https://libraries.io) | Zavisnosti | Obavjestajni podaci o zavisnostima paketa |
| [ClearlyDefined](https://clearlydefined.io) | Licence | Podaci o uskladenosti licenci |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Porijeklo | Porijeklo izgradnje i transparentnost potpisa |
| [Repology](https://repology.org) | Paketi | Pracenje paketa medu distribucijama |
| [Typosquat](https://en.wikipedia.org/wiki/Typosquatting) | Sigurnost | Detekcija typosquattinga naziva paketa |

---

## Arhitektura

```
src/
  index.ts              # CLI ulazna tacka (--help, --list, stdio server)
  protocol/
    mcp-server.ts       # Podesavanje MCP servera (stdio transport)
    tools.ts            # Registar alata — svih 90 alata
  types/
    index.ts            # Dijeljeni tipovi
  utils/
    rate-limiter.ts     # Ogranicavac brzine po provajderu
    cache.ts            # TTL kes za API odgovore
  osv/                  # OSV.dev alati za ranjivosti
  ghsa/                 # GitHub sigurnosni savjeti alati
  nvd/                  # NVD alati za ranjivosti
  epss/                 # EPSS alati za ocjenu
  kev/                  # CISA KEV alati
  npm/                  # npm alati za pakete
  pypi/                 # PyPI alati za pakete
  crates/               # crates.io alati za pakete
  rubygems/             # RubyGems alati
  nuget/                # NuGet alati
  packagist/            # Packagist alati
  go/                   # Go Proxy alati
  govuln/               # Go Vuln DB alati
  depsdev/              # deps.dev alati za zavisnosti
  scorecard/            # OpenSSF Scorecard alati
  badge/                # Best Practices znacka alati
  libraries/            # Libraries.io alati
  clearlydefined/       # ClearlyDefined alati za licence
  rekor/                # Sigstore Rekor alati za porijeklo
  repology/             # Repology alati za pracenje paketa
  typosquat/            # Alati za detekciju typosquattinga
  meta/                 # Meta alati
```

---

## Dio MCP Security Suite paketa

| Projekat | Domena | Alati |
|----------|--------|-------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Sigurnosno testiranje putem browsera | 39 alata |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Cloud sigurnost (AWS/Azure/GCP) | 38 alata |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub sigurnosni polozaj | 39 alata |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Obavjestajni podaci o ranjivostima | 23 alata |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT i izvidjanje | 37 alata |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark web i obavjestajni podaci o prijetnjama | 66 alata |
| **supply-chain-mcp-server** | **Sigurnost lanca snabdijevanja** | **90 alata** |

---

<p align="center">
<b>Samo za odgovorno sigurnosno testiranje i procjenu.</b><br>
Obezbijedite odgovarajuce dozvole prije sprovodjenja analize lanca snabdijevanja.
</p>

<p align="center">
  <a href="LICENSE">MIT Licenca</a> &bull; Izgradjeno sa Bun + TypeScript
</p>
