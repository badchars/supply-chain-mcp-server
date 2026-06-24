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
  <strong>Русский</strong> |
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

<h3 align="center">Безопасность цепочки поставок ПО для ИИ-агентов.</h3>

<p align="center">
  Сканирование уязвимостей, анализ пакетов, верификация происхождения, обнаружение тайпсквоттинга, аналитика зависимостей &mdash; 90 инструментов из 21 источника данных в одном MCP-сервере.<br>
  Ваш ИИ-агент <b>обнаруживает риски цепочки поставок по запросу</b>, без ручного обхода реестров.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Лицензия"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 инструментов">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 источник">
</p>

---

## Обзор

**supply-chain-mcp-server** предоставляет ИИ-агентам 90 инструментов для безопасности цепочки поставок программного обеспечения через [Model Context Protocol](https://modelcontextprotocol.io). Охватывает сканирование уязвимостей (OSV, GHSA, NVD), анализ пакетов (npm, PyPI, crates.io, Go, RubyGems, NuGet, Packagist), верификацию происхождения (Sigstore Rekor), аналитику зависимостей (deps.dev, Libraries.io), OpenSSF Scorecard, прогнозирование эксплойтов EPSS, CISA KEV и обнаружение тайпсквоттинга.

---

## Быстрый старт

### Вариант 1: npx (без установки)

```bash
npx supply-chain-mcp-server
```

### Вариант 2: Клонирование

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Переменные окружения (все необязательные)

```bash
export GITHUB_TOKEN=your-token         # Повышенные лимиты API для GHSA и Scorecard
export LIBRARIES_API_KEY=your-key      # Доступ к API Libraries.io
export NVD_API_KEY=your-key            # Повышенные лимиты API для NVD
```

Все API-ключи необязательны. Без ключей по-прежнему работают OSV, deps.dev, npm, PyPI, crates.io, Go, EPSS, CISA KEV, Rekor, обнаружение тайпсквоттинга и многое другое.

---

## Обзор инструментов &mdash; 90 инструментов, 21 источник данных

Предоставляет 90 инструментов, охватывающих аналитику уязвимостей, метаданные пакетов, оценку безопасности, соответствие лицензий, верификацию происхождения и обнаружение тайпсквоттинга.

---

## Подключение к ИИ-агенту

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Добавьте в `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / Другие MCP-клиенты</b></summary>

Тот же формат JSON-конфигурации. Укажите команду `npx supply-chain-mcp-server`.

</details>

---

## Источники данных (21)

| Источник | Категория | Что предоставляет |
|----------|-----------|-------------------|
| [OSV.dev](https://osv.dev) | Уязвимости | Мультиэкосистемная база уязвимостей |
| [GHSA](https://github.com/advisories) | Уязвимости | Рекомендации по безопасности GitHub |
| [NVD](https://nvd.nist.gov) | Уязвимости | База уязвимостей NIST, CVE |
| [EPSS](https://www.first.org/epss) | Уязвимости | Оценка вероятности эксплуатации |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Уязвимости | Каталог известных эксплуатируемых уязвимостей |
| [npm](https://www.npmjs.com) | Пакеты | Метаданные реестра npm и рекомендации |
| [PyPI](https://pypi.org) | Пакеты | Индекс пакетов Python |
| [crates.io](https://crates.io) | Пакеты | Реестр пакетов Rust |
| [RubyGems](https://rubygems.org) | Пакеты | Реестр пакетов Ruby |
| [NuGet](https://www.nuget.org) | Пакеты | Реестр пакетов .NET |
| [Packagist](https://packagist.org) | Пакеты | Реестр пакетов PHP |
| [Go Proxy](https://proxy.golang.org) | Пакеты | Прокси модулей Go |
| [Go Vuln DB](https://vuln.go.dev) | Уязвимости | База уязвимостей Go |
| [deps.dev](https://deps.dev) | Зависимости | Граф зависимостей и метаданные |
| [OpenSSF Scorecard](https://scorecard.dev) | Безопасность | Оценка безопасности OSS |
| [Best Practices](https://www.bestpractices.dev) | Безопасность | Бейдж OpenSSF Best Practices |
| [Libraries.io](https://libraries.io) | Зависимости | Аналитика зависимостей пакетов |
| [ClearlyDefined](https://clearlydefined.io) | Лицензии | Данные соответствия лицензий |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Происхождение | Происхождение сборки и прозрачность подписей |
| [Repology](https://repology.org) | Пакеты | Отслеживание пакетов между дистрибутивами |
| [Typosquat](https://en.wikipedia.org/wiki/Typosquatting) | Безопасность | Обнаружение тайпсквоттинга имён пакетов |

---

## Архитектура

```
src/
  index.ts              # Точка входа CLI (--help, --list, stdio-сервер)
  protocol/
    mcp-server.ts       # Настройка MCP-сервера (stdio-транспорт)
    tools.ts            # Реестр инструментов — все 90 инструментов
  types/
    index.ts            # Общие типы
  utils/
    rate-limiter.ts     # Ограничитель скорости для каждого провайдера
    cache.ts            # TTL-кэш для ответов API
  osv/                  # Инструменты уязвимостей OSV.dev
  ghsa/                 # Инструменты рекомендаций GitHub
  nvd/                  # Инструменты уязвимостей NVD
  epss/                 # Инструменты оценки EPSS
  kev/                  # Инструменты CISA KEV
  npm/                  # Инструменты пакетов npm
  pypi/                 # Инструменты пакетов PyPI
  crates/               # Инструменты пакетов crates.io
  rubygems/             # Инструменты RubyGems
  nuget/                # Инструменты NuGet
  packagist/            # Инструменты Packagist
  go/                   # Инструменты Go Proxy
  govuln/               # Инструменты Go Vuln DB
  depsdev/              # Инструменты зависимостей deps.dev
  scorecard/            # Инструменты OpenSSF Scorecard
  badge/                # Инструменты бейджа Best Practices
  libraries/            # Инструменты Libraries.io
  clearlydefined/       # Инструменты лицензий ClearlyDefined
  rekor/                # Инструменты происхождения Sigstore Rekor
  repology/             # Инструменты отслеживания Repology
  typosquat/            # Инструменты обнаружения тайпсквоттинга
  meta/                 # Мета-инструменты
```

---

## Часть пакета MCP Security Suite

| Проект | Область | Инструменты |
|--------|---------|-------------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Тестирование безопасности через браузер | 39 инструментов |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Безопасность облака (AWS/Azure/GCP) | 38 инструментов |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Безопасность GitHub | 39 инструментов |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Аналитика уязвимостей | 23 инструмента |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT и разведка | 37 инструментов |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Даркнет и анализ угроз | 66 инструментов |
| **supply-chain-mcp-server** | **Безопасность цепочки поставок** | **90 инструментов** |

---

<p align="center">
<b>Только для ответственного тестирования и оценки безопасности.</b><br>
Убедитесь, что у вас есть соответствующие разрешения перед проведением анализа цепочки поставок.
</p>

<p align="center">
  <a href="LICENSE">Лицензия MIT</a> &bull; Создано на Bun + TypeScript
</p>
