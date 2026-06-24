<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <strong>繁體中文</strong> |
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

<h3 align="center">為 AI 代理打造的軟體供應鏈安全。</h3>

<p align="center">
  弱點掃描、套件分析、來源驗證、仿冒偵測、依賴情報 &mdash; 橫跨 npm、PyPI、crates.io、Go 等生態系統，統一在一個 MCP 伺服器中。<br>
  您的 AI 代理獲得<b>全方位的供應鏈安全情報</b>，而非在十幾個註冊表和資料庫之間手動切換。
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

## 快速開始

### 方式一：npx（無需安裝）

```bash
npx supply-chain-mcp-server
```

大多數工具無需 API 金鑰即可免費使用。OSV、deps.dev、npm、PyPI、crates.io、Go、Rekor 等開箱即用。

### 方式二：複製

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### 環境變數（選用）

```bash
export GITHUB_TOKEN=your-token          # GHSA + Scorecard 更高速率限制
export LIBRARIES_API_KEY=your-key       # Libraries.io 工具必需
export NVD_API_KEY=your-key             # NVD 50 請求/30秒（無金鑰 5 請求/30秒）
```

所有 API 金鑰均為選用。無金鑰時仍可使用 OSV、deps.dev、npm、PyPI、crates.io、Go、Rekor、EPSS、KEV、Repology、仿冒偵測等。

### 連接到 AI 代理

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

新增至 `~/Library/Application Support/Claude/claude_desktop_config.json`：

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
<summary><b>Cursor / Windsurf / 其他 MCP 用戶端</b></summary>

相同的 JSON 設定格式。將指令指向 `npx supply-chain-mcp-server` 或本地安裝路徑。

</details>

---

## 工具總覽（93 個工具，21 個資料來源 + 1 元工具）

| 類別 | 工具數 | 描述 |
|------|--------|------|
| OSV.dev 弱點庫 | 5 | 統一弱點資料庫查詢 |
| GitHub Advisory (GHSA) | 4 | GitHub 安全公告 |
| NIST NVD | 3 | NIST CVE 資料庫 |
| EPSS 漏洞利用預測 | 4 | 漏洞利用機率評分 |
| CISA KEV | 4 | 已知被利用弱點 |
| npm 註冊表 | 10 | npm 註冊表 + 來源驗證 + 稽核 |
| PyPI | 4 | Python 套件索引 |
| crates.io | 4 | Rust 套件註冊表 |
| RubyGems | 4 | Ruby gem 註冊表 |
| NuGet | 4 | .NET 套件註冊表 |
| Packagist | 4 | PHP/Composer 註冊表 |
| Go 弱點庫 | 4 | Go 弱點資料庫 |
| Go 代理 | 3 | Go 模組代理 + 校驗和資料庫 |
| deps.dev | 10 | Google 依賴洞察 |
| OpenSSF Scorecard | 2 | OpenSSF 安全評分 |
| OpenSSF 最佳實踐 | 3 | OpenSSF 最佳實踐徽章 |
| Libraries.io | 4 | 跨生態系統情報 |
| ClearlyDefined | 3 | 授權與歸屬資料 |
| Sigstore Rekor | 5 | Sigstore 透明日誌 |
| Repology | 3 | 跨發行版套件追蹤 |
| 仿冒偵測 | 2 | 內建仿冒偵測 |
| 元工具 | 1 | 資料來源清單 |

---

## 資料來源（21）

| 來源 | 認證 | 提供的資料 |
|------|------|-----------|
| [OSV.dev](https://osv.dev) | 無 | 統一弱點資料庫（npm、PyPI、Go、crates.io 等） |
| [GitHub Advisory](https://github.com/advisories) | 選用 | GitHub 安全公告（GHSA） |
| [NIST NVD](https://nvd.nist.gov) | 選用 | CVE 弱點詳情、CPE 匹配 |
| [EPSS](https://www.first.org/epss) | 無 | 漏洞利用機率評分 |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | 無 | 已知被利用弱點目錄 |
| [npm](https://www.npmjs.com) | 無 | 套件中繼資料、版本、來源、稽核 |
| [PyPI](https://pypi.org) | 無 | Python 套件中繼資料與版本 |
| [crates.io](https://crates.io) | 無 | Rust crate 中繼資料與版本 |
| [RubyGems](https://rubygems.org) | 無 | Ruby gem 中繼資料與版本 |
| [NuGet](https://www.nuget.org) | 無 | .NET 套件中繼資料與版本 |
| [Packagist](https://packagist.org) | 無 | PHP/Composer 套件中繼資料 |
| [Go 弱點庫](https://vuln.go.dev) | 無 | Go 特有弱點 |
| [Go 代理](https://proxy.golang.org) | 無 | Go 模組版本與校驗和 |
| [deps.dev](https://deps.dev) | 無 | 依賴圖、公告、版本 |
| [OpenSSF Scorecard](https://scorecard.dev) | 選用 | 開源專案安全評分 |
| [OpenSSF 最佳實踐](https://bestpractices.coreinfrastructure.org) | 無 | CII 最佳實踐徽章狀態 |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | 跨生態系統依賴情報 |
| [ClearlyDefined](https://clearlydefined.io) | 無 | 授權與歸屬資料 |
| [Sigstore Rekor](https://rekor.sigstore.dev) | 無 | 建構來源與簽章透明日誌 |
| [Repology](https://repology.org) | 無 | 跨發行版套件版本追蹤 |
| 仿冒偵測 | 無 | 內建編輯距離 + 字元替換分析 |

---

## 架構

```
src/
  index.ts                # CLI 進入點（--help、--list、stdio 伺服器）
  protocol/
    mcp-server.ts         # MCP 伺服器設定（stdio 傳輸）
    tools.ts              # 工具註冊表 — 93 個工具在此彙集
  types/
    index.ts              # 共用型別（ToolDef、ToolContext、ToolResult）
  utils/
    rate-limiter.ts       # 按提供者的速率限制器
    cache.ts              # API 回應的 TTL 快取
  osv/                    # OSV.dev 工具 (5)
  ghsa/                   # GitHub Advisory 工具 (4)
  nvd/                    # NIST NVD 工具 (3)
  epss/                   # EPSS 工具 (4)
  kev/                    # CISA KEV 工具 (4)
  npm/                    # npm 工具 (10)
  pypi/                   # PyPI 工具 (4)
  crates/                 # crates.io 工具 (4)
  rubygems/               # RubyGems 工具 (4)
  nuget/                  # NuGet 工具 (4)
  packagist/              # Packagist 工具 (4)
  govuln/                 # Go 弱點庫工具 (4)
  go/                     # Go 代理工具 (3)
  depsdev/                # deps.dev 工具 (10)
  scorecard/              # OpenSSF Scorecard 工具 (2)
  badge/                  # OpenSSF 最佳實踐工具 (3)
  libraries/              # Libraries.io 工具 (4)
  clearlydefined/         # ClearlyDefined 工具 (3)
  rekor/                  # Sigstore Rekor 工具 (5)
  repology/               # Repology 工具 (3)
  typosquat/              # 仿冒偵測工具 (2)
  meta/                   # 元工具 (1)
```

---

## MCP 安全套件

| 專案 | 領域 | 工具 |
|------|------|------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | 基於瀏覽器的安全測試 | 39 工具，Firefox，注入測試 |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | 雲端安全（AWS/Azure/GCP） | 38 工具，60+ 檢查 |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub 安全態勢 | 39 工具，45 檢查 |
| [cve-mcp](https://github.com/badchars/cve-mcp) | 弱點情報 | 23 工具，5 來源 |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT 與偵察 | 37 工具，12 來源 |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | 暗網與威脅情報 | 66 工具，16 來源 |
| **supply-chain-mcp-server** | **軟體供應鏈安全** | **93 工具，21 來源** |

---

<p align="center">
<b>僅用於授權的安全測試和評估。</b><br>
在對任何目標執行供應鏈分析之前，請始終確保獲得適當授權。
</p>

<p align="center">
  <a href="LICENSE">MIT 授權</a> &bull; 使用 Bun + TypeScript 建構
</p>
