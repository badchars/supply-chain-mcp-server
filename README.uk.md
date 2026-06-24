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
  <a href="README.pt-BR.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <strong>Українська</strong> |
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

<h3 align="center">Безпека ланцюга постачання програмного забезпечення для ШІ-агентів.</h3>

<p align="center">
  Сканування вразливостей, аналіз пакетів, перевірка походження, виявлення тайпосквотингу, розвідка залежностей &mdash; для npm, PyPI, crates.io, Go та інших в єдиному MCP-сервері.<br>
  Ваш ШІ-агент отримує <b>повну розвідку безпеки ланцюга постачання на вимогу</b>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Ліцензія"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 інструментів">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 джерело">
</p>

---

## Що це

**supply-chain-mcp-server** надає вашому ШІ-агенту **90 інструментів** з 21 джерела даних через [Model Context Protocol](https://modelcontextprotocol.io). Агент сканує вразливості пакетів, аналізує залежності, перевіряє походження програмного забезпечення, виявляє атаки тайпосквотингу та формує єдину картину безпеки &mdash; в одній розмові.

API-ключі необов'язкові. Багато джерел (OSV.dev, GHSA, EPSS, CISA KEV, npm, PyPI, crates.io, Go тощо) працюють безкоштовно.

---

## Швидкий старт

### npx (без встановлення)

```bash
npx supply-chain-mcp-server
```

### Змінні середовища (необов'язково)

```bash
export GITHUB_TOKEN=your-token         # Підвищує ліміти для GHSA та Scorecard
export LIBRARIES_API_KEY=your-key      # Вмикає розвідку залежностей Libraries.io
export NVD_API_KEY=your-key            # Підвищує ліміти для NVD CVE
```

### Підключення до ШІ-агента

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Додайте до `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / інші MCP-клієнти</b></summary>

Той самий формат JSON-конфігурації. Вкажіть команду `npx supply-chain-mcp-server` або шлях до локальної установки.

</details>

---

## Огляд інструментів (90 інструментів, 21 джерело)

| Категорія | Кількість | Опис |
|-----------|-----------|------|
| OSV.dev | Запити вразливостей | Міжекосистемна база даних вразливостей відкритого коду |
| GHSA | Рекомендації GitHub | База даних рекомендацій з безпеки GitHub |
| NVD | Пошук CVE | Національна база даних вразливостей NIST |
| EPSS | Оцінка ймовірності експлойту | Система оцінки прогнозування експлойтів |
| CISA KEV | Відомі експлуатовані вразливості | Каталог відомих експлуатованих вразливостей CISA |
| npm | Безпека пакетів | Аналіз безпеки реєстру npm |
| PyPI | Безпека пакетів | Аналіз індексу пакетів Python |
| crates.io | Безпека пакетів | Аналіз реєстру пакетів Rust |
| RubyGems | Безпека пакетів | Аналіз реєстру пакетів Ruby |
| NuGet | Безпека пакетів | Аналіз реєстру пакетів .NET |
| Packagist | Безпека пакетів | Аналіз реєстру пакетів PHP |
| Go Proxy | Безпека пакетів | Аналіз проксі модулів Go |
| Go Vuln DB | База вразливостей | База даних вразливостей Go |
| deps.dev | Граф залежностей | Розвідка залежностей відкритого коду від Google |
| Scorecard | Безпека проєкту | Картка безпеки OpenSSF |
| Best Practices | Безпека проєкту | Значок найкращих практик OpenSSF |
| Libraries.io | Розвідка залежностей | Метрики здоров'я пакетів і залежностей |
| ClearlyDefined | Аналіз ліцензій | Чіткість ліцензій та авторських прав |
| Rekor | Перевірка походження | Журнал прозорості Sigstore |
| Repology | Відстеження пакетів | Відстеження версій пакетів між дистрибутивами |
| Typosquat | Виявлення тайпосквотингу | Виявлення тайпосквотингу назв пакетів |

---

## Джерела даних

| Джерело | Автентифікація | Що надає |
|---------|----------------|----------|
| [OSV.dev](https://osv.dev) | Немає | Міжекосистемні запити вразливостей |
| [GitHub Advisory (GHSA)](https://github.com/advisories) | `GITHUB_TOKEN` необов'язково | Рекомендації з безпеки та дані вразливостей |
| [NVD](https://nvd.nist.gov) | `NVD_API_KEY` необов'язково | Деталі CVE, оцінки CVSS, зіставлення CPE |
| [EPSS](https://www.first.org/epss) | Немає | Оцінки ймовірності експлойту |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Немає | Каталог відомих експлуатованих вразливостей |
| [npm](https://www.npmjs.com) | Немає | Метадані JavaScript-пакетів та аудит безпеки |
| [PyPI](https://pypi.org) | Немає | Метадані Python-пакетів та інформація про безпеку |
| [crates.io](https://crates.io) | Немає | Метадані Rust-пакетів та інформація про версії |
| [RubyGems](https://rubygems.org) | Немає | Метадані Ruby-пакетів |
| [NuGet](https://www.nuget.org) | Немає | Метадані .NET-пакетів |
| [Packagist](https://packagist.org) | Немає | Метадані PHP/Composer-пакетів |
| [Go Proxy](https://proxy.golang.org) | Немає | Метадані модулів Go та інформація про версії |
| [Go Vuln DB](https://vuln.go.dev) | Немає | База даних вразливостей, специфічних для Go |
| [deps.dev](https://deps.dev) | Немає | Графи залежностей, зіставлення рекомендацій |
| [OpenSSF Scorecard](https://securityscorecards.dev) | `GITHUB_TOKEN` необов'язково | Оцінки безпеки проєктів відкритого коду |
| [OpenSSF Best Practices](https://www.bestpractices.dev) | Немає | Значок зрілості проєкту |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Здоров'я залежностей, відстеження версій |
| [ClearlyDefined](https://clearlydefined.io) | Немає | Чіткість ліцензій та дані авторських прав |
| [Rekor](https://rekor.sigstore.dev) | Немає | Журнал прозорості Sigstore, перевірка підписів |
| [Repology](https://repology.org) | Немає | Відстеження версій пакетів між дистрибутивами |
| Виявлення тайпосквотингу | Немає | Виявлення тайпосквотингу назв пакетів та плутанини залежностей |

---

## Частина пакету безпеки MCP

| Проєкт | Сфера | Інструменти |
|--------|-------|-------------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Тестування безпеки на основі браузера | 39 інструментів |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Хмарна безпека (AWS/Azure/GCP) | 38 інструментів |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Безпека GitHub | 39 інструментів |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Розвідка вразливостей | 23 інструменти |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT та розвідка | 37 інструментів |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Даркнет та розвідка загроз | 66 інструментів |
| **supply-chain-mcp-server** | **Безпека ланцюга постачання ПЗ** | **90 інструментів, 21 джерело** |

---

<p align="center">
<b>Лише для авторизованого тестування та оцінки безпеки.</b><br>
Завжди переконуйтесь, що у вас є належний дозвіл перед проведенням аналізу безпеки будь-якої цілі.
</p>

<p align="center">
  <a href="LICENSE">Ліцензія MIT</a> &bull; Створено з Bun + TypeScript
</p>
