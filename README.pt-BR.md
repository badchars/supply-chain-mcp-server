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
  <a href="README.no.md">Norsk</a> |
  <strong>Português (Brasil)</strong> |
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

<h3 align="center">Seguranca da cadeia de suprimentos de software para agentes de IA.</h3>

<p align="center">
  Varredura de vulnerabilidades, analise de pacotes, verificacao de procedencia, deteccao de typosquatting, inteligencia de dependencias &mdash; 90 ferramentas de 21 fontes de dados em um unico servidor MCP.<br>
  Seu agente de IA <b>detecta riscos na cadeia de suprimentos sob demanda</b>, sem navegacao manual em registros.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Licenca"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 ferramentas">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 fontes">
</p>

---

## Visao Geral

**supply-chain-mcp-server** fornece aos agentes de IA 90 ferramentas para seguranca da cadeia de suprimentos de software atraves do [Model Context Protocol](https://modelcontextprotocol.io). Abrange varredura de vulnerabilidades (OSV, GHSA, NVD), analise de pacotes (npm, PyPI, crates.io, Go, RubyGems, NuGet, Packagist), verificacao de procedencia (Sigstore Rekor), inteligencia de dependencias (deps.dev, Libraries.io), OpenSSF Scorecard, predicoes de exploracao EPSS, CISA KEV e deteccao de typosquatting.

---

## Inicio Rapido

### Opcao 1: npx (sem instalacao)

```bash
npx supply-chain-mcp-server
```

### Opcao 2: Clonar

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Variaveis de Ambiente (todas opcionais)

```bash
export GITHUB_TOKEN=your-token         # Limites de API mais altos para GHSA e Scorecard
export LIBRARIES_API_KEY=your-key      # Acesso a API do Libraries.io
export NVD_API_KEY=your-key            # Limites de API mais altos para NVD
```

Todas as chaves de API sao opcionais. Sem chaves, OSV, deps.dev, npm, PyPI, crates.io, Go, EPSS, CISA KEV, Rekor, deteccao de typosquatting e muito mais continuam funcionando.

---

## Resumo das Ferramentas &mdash; 90 ferramentas, 21 fontes de dados

Fornece 90 ferramentas cobrindo inteligencia de vulnerabilidades, metadados de pacotes, pontuacao de seguranca, conformidade de licencas, verificacao de procedencia e deteccao de typosquatting.

---

## Conectar ao Agente de IA

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Adicione em `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / Outros clientes MCP</b></summary>

Mesmo formato de configuracao JSON. Aponte o comando para `npx supply-chain-mcp-server`.

</details>

---

## Fontes de Dados (21)

| Fonte | Categoria | O que fornece |
|-------|-----------|---------------|
| [OSV.dev](https://osv.dev) | Vulnerabilidades | Banco de dados de vulnerabilidades multi-ecossistema |
| [GHSA](https://github.com/advisories) | Vulnerabilidades | Avisos de seguranca do GitHub |
| [NVD](https://nvd.nist.gov) | Vulnerabilidades | Banco de dados de vulnerabilidades NIST, CVE |
| [EPSS](https://www.first.org/epss) | Vulnerabilidades | Pontuacao de predicao de exploracao |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Vulnerabilidades | Catalogo de vulnerabilidades exploradas conhecidas |
| [npm](https://www.npmjs.com) | Pacotes | Metadados do registro npm e avisos |
| [PyPI](https://pypi.org) | Pacotes | Indice de pacotes Python |
| [crates.io](https://crates.io) | Pacotes | Registro de pacotes Rust |
| [RubyGems](https://rubygems.org) | Pacotes | Registro de pacotes Ruby |
| [NuGet](https://www.nuget.org) | Pacotes | Registro de pacotes .NET |
| [Packagist](https://packagist.org) | Pacotes | Registro de pacotes PHP |
| [Go Proxy](https://proxy.golang.org) | Pacotes | Proxy de modulos Go |
| [Go Vuln DB](https://vuln.go.dev) | Vulnerabilidades | Banco de dados de vulnerabilidades Go |
| [deps.dev](https://deps.dev) | Dependencias | Grafo de dependencias e metadados |
| [OpenSSF Scorecard](https://scorecard.dev) | Seguranca | Pontuacao de seguranca OSS |
| [Best Practices](https://www.bestpractices.dev) | Seguranca | Selo OpenSSF Best Practices |
| [Libraries.io](https://libraries.io) | Dependencias | Inteligencia de dependencias de pacotes |
| [ClearlyDefined](https://clearlydefined.io) | Licencas | Dados de conformidade de licencas |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Procedencia | Procedencia de build e transparencia de assinaturas |
| [Repology](https://repology.org) | Pacotes | Rastreamento de pacotes entre distribuicoes |
| [Typosquat](https://en.wikipedia.org/wiki/Typosquatting) | Seguranca | Deteccao de typosquatting em nomes de pacotes |

---

## Arquitetura

```
src/
  index.ts              # Ponto de entrada CLI (--help, --list, servidor stdio)
  protocol/
    mcp-server.ts       # Configuracao do servidor MCP (transporte stdio)
    tools.ts            # Registro de ferramentas — todas as 90 ferramentas
  types/
    index.ts            # Tipos compartilhados
  utils/
    rate-limiter.ts     # Limitador de taxa por provedor
    cache.ts            # Cache TTL para respostas de API
  osv/                  # Ferramentas de vulnerabilidades OSV.dev
  ghsa/                 # Ferramentas de avisos de seguranca GitHub
  nvd/                  # Ferramentas de vulnerabilidades NVD
  epss/                 # Ferramentas de pontuacao EPSS
  kev/                  # Ferramentas CISA KEV
  npm/                  # Ferramentas de pacotes npm
  pypi/                 # Ferramentas de pacotes PyPI
  crates/               # Ferramentas de pacotes crates.io
  rubygems/             # Ferramentas RubyGems
  nuget/                # Ferramentas NuGet
  packagist/            # Ferramentas Packagist
  go/                   # Ferramentas Go Proxy
  govuln/               # Ferramentas Go Vuln DB
  depsdev/              # Ferramentas de dependencias deps.dev
  scorecard/            # Ferramentas OpenSSF Scorecard
  badge/                # Ferramentas de selo Best Practices
  libraries/            # Ferramentas Libraries.io
  clearlydefined/       # Ferramentas de licenca ClearlyDefined
  rekor/                # Ferramentas de procedencia Sigstore Rekor
  repology/             # Ferramentas de rastreamento Repology
  typosquat/            # Ferramentas de deteccao de typosquatting
  meta/                 # Ferramentas meta
```

---

## Parte do MCP Security Suite

| Projeto | Dominio | Ferramentas |
|---------|---------|-------------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Testes de seguranca via navegador | 39 ferramentas |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Seguranca na nuvem (AWS/Azure/GCP) | 38 ferramentas |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Postura de seguranca do GitHub | 39 ferramentas |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Inteligencia de vulnerabilidades | 23 ferramentas |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT e reconhecimento | 37 ferramentas |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark web e inteligencia de ameacas | 66 ferramentas |
| **supply-chain-mcp-server** | **Seguranca da cadeia de suprimentos** | **90 ferramentas** |

---

<p align="center">
<b>Apenas para testes de seguranca e avaliacao responsaveis.</b><br>
Certifique-se de ter a autorizacao adequada antes de realizar analise de cadeia de suprimentos.
</p>

<p align="center">
  <a href="LICENSE">Licenca MIT</a> &bull; Construido com Bun + TypeScript
</p>
