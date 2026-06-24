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
  <strong>Polski</strong> |
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
    <img alt="supply-chain-mcp-server" src="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">Bezpieczenstwo lancucha dostaw oprogramowania dla agentow AI.</h3>

<p align="center">
  Skanowanie podatnosci, analiza pakietow, weryfikacja pochodzenia, wykrywanie typosquattingu, inteligencja zaleznosci &mdash; 90 narzedzi z 21 zrodel danych w jednym serwerze MCP.<br>
  Twoj agent AI <b>wykrywa ryzyka w lancuchu dostaw na zadanie</b>, bez recznego przegladania rejestrow.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Licencja"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 narzedzi">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 zrodel">
</p>

---

## Przeglad

**supply-chain-mcp-server** udostepnia agentom AI 90 narzedzi do bezpieczenstwa lancucha dostaw oprogramowania przez [Model Context Protocol](https://modelcontextprotocol.io). Obejmuje skanowanie podatnosci (OSV, GHSA, NVD), analize pakietow (npm, PyPI, crates.io, Go, RubyGems, NuGet, Packagist), weryfikacje pochodzenia (Sigstore Rekor), inteligencje zaleznosci (deps.dev, Libraries.io), OpenSSF Scorecard, predykcje exploitow EPSS, CISA KEV oraz wykrywanie typosquattingu.

---

## Szybki start

### Opcja 1: npx (bez instalacji)

```bash
npx supply-chain-mcp-server
```

### Opcja 2: Klonowanie

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Zmienne srodowiskowe (wszystkie opcjonalne)

```bash
export GITHUB_TOKEN=your-token         # Wyzsze limity API dla GHSA i Scorecard
export LIBRARIES_API_KEY=your-key      # Dostep do API Libraries.io
export NVD_API_KEY=your-key            # Wyzsze limity API dla NVD
```

Wszystkie klucze API sa opcjonalne. Bez kluczy nadal dzialaja OSV, deps.dev, npm, PyPI, crates.io, Go, EPSS, CISA KEV, Rekor, wykrywanie typosquattingu i wiele wiecej.

---

## Podsumowanie narzedzi &mdash; 90 narzedzi, 21 zrodel danych

Zapewnia 90 narzedzi obejmujacych inteligencje podatnosci, metadane pakietow, scoring bezpieczenstwa, zgodnosc licencji, weryfikacje pochodzenia i wykrywanie typosquattingu.

---

## Polaczenie z agentem AI

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Dodaj do `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / Inne klienty MCP</b></summary>

Ten sam format konfiguracji JSON. Uzyj polecenia `npx supply-chain-mcp-server`.

</details>

---

## Zrodla danych (21)

| Zrodlo | Kategoria | Co zapewnia |
|--------|-----------|-------------|
| [OSV.dev](https://osv.dev) | Podatnosci | Wieloekosystemowa baza podatnosci |
| [GHSA](https://github.com/advisories) | Podatnosci | Poradniki bezpieczenstwa GitHub |
| [NVD](https://nvd.nist.gov) | Podatnosci | Baza podatnosci NIST, CVE |
| [EPSS](https://www.first.org/epss) | Podatnosci | Scoring predykcji exploitow |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Podatnosci | Katalog znanych wykorzystywanych podatnosci |
| [npm](https://www.npmjs.com) | Pakiety | Metadane rejestru npm i poradniki |
| [PyPI](https://pypi.org) | Pakiety | Indeks pakietow Python |
| [crates.io](https://crates.io) | Pakiety | Rejestr pakietow Rust |
| [RubyGems](https://rubygems.org) | Pakiety | Rejestr pakietow Ruby |
| [NuGet](https://www.nuget.org) | Pakiety | Rejestr pakietow .NET |
| [Packagist](https://packagist.org) | Pakiety | Rejestr pakietow PHP |
| [Go Proxy](https://proxy.golang.org) | Pakiety | Proxy modulow Go |
| [Go Vuln DB](https://vuln.go.dev) | Podatnosci | Baza podatnosci Go |
| [deps.dev](https://deps.dev) | Zaleznosci | Graf zaleznosci i metadane |
| [OpenSSF Scorecard](https://scorecard.dev) | Bezpieczenstwo | Scoring bezpieczenstwa OSS |
| [Best Practices](https://www.bestpractices.dev) | Bezpieczenstwo | Odznaka OpenSSF Best Practices |
| [Libraries.io](https://libraries.io) | Zaleznosci | Inteligencja zaleznosci pakietow |
| [ClearlyDefined](https://clearlydefined.io) | Licencje | Dane zgodnosci licencji |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Pochodzenie | Pochodzenie budowy i przejrzystosc podpisow |
| [Repology](https://repology.org) | Pakiety | Sledzenie pakietow miedzy dystrybucjami |
| [Typosquat](https://en.wikipedia.org/wiki/Typosquatting) | Bezpieczenstwo | Wykrywanie typosquattingu nazw pakietow |

---

## Architektura

```
src/
  index.ts              # Punkt wejscia CLI (--help, --list, serwer stdio)
  protocol/
    mcp-server.ts       # Konfiguracja serwera MCP (transport stdio)
    tools.ts            # Rejestr narzedzi — wszystkie 90 narzedzi
  types/
    index.ts            # Wspoldzielone typy
  utils/
    rate-limiter.ts     # Limiter szybkosci na dostawce
    cache.ts            # Pamiec podreczna TTL dla odpowiedzi API
  osv/                  # Narzedzia podatnosci OSV.dev
  ghsa/                 # Narzedzia poradnikow bezpieczenstwa GitHub
  nvd/                  # Narzedzia podatnosci NVD
  epss/                 # Narzedzia scoringu EPSS
  kev/                  # Narzedzia CISA KEV
  npm/                  # Narzedzia pakietow npm
  pypi/                 # Narzedzia pakietow PyPI
  crates/               # Narzedzia pakietow crates.io
  rubygems/             # Narzedzia RubyGems
  nuget/                # Narzedzia NuGet
  packagist/            # Narzedzia Packagist
  go/                   # Narzedzia Go Proxy
  govuln/               # Narzedzia Go Vuln DB
  depsdev/              # Narzedzia zaleznosci deps.dev
  scorecard/            # Narzedzia OpenSSF Scorecard
  badge/                # Narzedzia odznaki Best Practices
  libraries/            # Narzedzia Libraries.io
  clearlydefined/       # Narzedzia licencji ClearlyDefined
  rekor/                # Narzedzia pochodzenia Sigstore Rekor
  repology/             # Narzedzia sledzenia pakietow Repology
  typosquat/            # Narzedzia wykrywania typosquattingu
  meta/                 # Narzedzia meta
```

---

## Czesc pakietu MCP Security Suite

| Projekt | Domena | Narzedzia |
|---------|--------|-----------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Testy bezpieczenstwa w przegladarce | 39 narzedzi |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Bezpieczenstwo chmury (AWS/Azure/GCP) | 38 narzedzi |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Bezpieczenstwo GitHub | 39 narzedzi |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Inteligencja podatnosci | 23 narzedzi |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT i rozpoznanie | 37 narzedzi |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark web i inteligencja zagrozen | 66 narzedzi |
| **supply-chain-mcp-server** | **Bezpieczenstwo lancucha dostaw** | **90 narzedzi** |

---

<p align="center">
<b>Wylacznie do odpowiedzialnych testow bezpieczenstwa i oceny.</b><br>
Upewnij sie, ze masz odpowiednie uprawnienia przed przeprowadzeniem analizy lancucha dostaw.
</p>

<p align="center">
  <a href="LICENSE">Licencja MIT</a> &bull; Zbudowane z Bun + TypeScript
</p>
