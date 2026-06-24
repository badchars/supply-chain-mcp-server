<p align="center">
  <a href="README.md">English</a> |
  <strong>简体中文</strong> |
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

<h3 align="center">面向 AI 代理的软件供应链安全。</h3>

<p align="center">
  漏洞扫描、包分析、来源验证、仿冒检测、依赖情报 &mdash; 跨越 npm、PyPI、crates.io、Go 等生态系统，统一在一个 MCP 服务器中。<br>
  你的 AI 代理获得<b>全方位的供应链安全情报</b>，而不是在十几个注册表和数据库之间手动切换。
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

## 快速开始

### 方式一：npx（无需安装）

```bash
npx supply-chain-mcp-server
```

大多数工具无需 API 密钥即可免费使用。OSV、deps.dev、npm、PyPI、crates.io、Go、Rekor 等开箱即用。

### 方式二：克隆

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### 环境变量（可选）

```bash
export GITHUB_TOKEN=your-token          # GHSA + Scorecard 更高速率限制
export LIBRARIES_API_KEY=your-key       # Libraries.io 工具必需
export NVD_API_KEY=your-key             # NVD 50 请求/30秒（无密钥 5 请求/30秒）
```

所有 API 密钥均为可选。无密钥时仍可使用 OSV、deps.dev、npm、PyPI、crates.io、Go、Rekor、EPSS、KEV、Repology、仿冒检测等。

### 连接到 AI 代理

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

添加到 `~/Library/Application Support/Claude/claude_desktop_config.json`：

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
<summary><b>Cursor / Windsurf / 其他 MCP 客户端</b></summary>

相同的 JSON 配置格式。将命令指向 `npx supply-chain-mcp-server` 或本地安装路径。

</details>

---

## 工具总览（93 个工具，21 个数据源 + 1 元工具）

| 类别 | 工具数 | 描述 |
|------|--------|------|
| OSV.dev 漏洞库 | 5 | 统一漏洞数据库查询 |
| GitHub Advisory (GHSA) | 4 | GitHub 安全公告 |
| NIST NVD | 3 | NIST CVE 数据库 |
| EPSS 漏洞利用预测 | 4 | 漏洞利用概率评分 |
| CISA KEV | 4 | 已知被利用漏洞 |
| npm 注册表 | 10 | npm 注册表 + 来源验证 + 审计 |
| PyPI | 4 | Python 包索引 |
| crates.io | 4 | Rust 包注册表 |
| RubyGems | 4 | Ruby gem 注册表 |
| NuGet | 4 | .NET 包注册表 |
| Packagist | 4 | PHP/Composer 注册表 |
| Go 漏洞库 | 4 | Go 漏洞数据库 |
| Go 代理 | 3 | Go 模块代理 + 校验和数据库 |
| deps.dev | 10 | Google 依赖洞察 |
| OpenSSF Scorecard | 2 | OpenSSF 安全评分 |
| OpenSSF 最佳实践 | 3 | OpenSSF 最佳实践徽章 |
| Libraries.io | 4 | 跨生态系统情报 |
| ClearlyDefined | 3 | 许可证与归属数据 |
| Sigstore Rekor | 5 | Sigstore 透明日志 |
| Repology | 3 | 跨发行版包追踪 |
| 仿冒检测 | 2 | 内置仿冒检测 |
| 元工具 | 1 | 数据源列表 |

---

## 数据源（21）

| 来源 | 认证 | 提供的数据 |
|------|------|-----------|
| [OSV.dev](https://osv.dev) | 无 | 统一漏洞数据库（npm、PyPI、Go、crates.io 等） |
| [GitHub Advisory](https://github.com/advisories) | 可选 | GitHub 安全公告（GHSA） |
| [NIST NVD](https://nvd.nist.gov) | 可选 | CVE 漏洞详情、CPE 匹配 |
| [EPSS](https://www.first.org/epss) | 无 | 漏洞利用概率评分 |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | 无 | 已知被利用漏洞目录 |
| [npm](https://www.npmjs.com) | 无 | 包元数据、版本、来源、审计 |
| [PyPI](https://pypi.org) | 无 | Python 包元数据与版本 |
| [crates.io](https://crates.io) | 无 | Rust crate 元数据与版本 |
| [RubyGems](https://rubygems.org) | 无 | Ruby gem 元数据与版本 |
| [NuGet](https://www.nuget.org) | 无 | .NET 包元数据与版本 |
| [Packagist](https://packagist.org) | 无 | PHP/Composer 包元数据 |
| [Go 漏洞库](https://vuln.go.dev) | 无 | Go 特有漏洞 |
| [Go 代理](https://proxy.golang.org) | 无 | Go 模块版本与校验和 |
| [deps.dev](https://deps.dev) | 无 | 依赖图、公告、版本 |
| [OpenSSF Scorecard](https://scorecard.dev) | 可选 | 开源项目安全评分 |
| [OpenSSF 最佳实践](https://bestpractices.coreinfrastructure.org) | 无 | CII 最佳实践徽章状态 |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | 跨生态系统依赖情报 |
| [ClearlyDefined](https://clearlydefined.io) | 无 | 许可证与归属数据 |
| [Sigstore Rekor](https://rekor.sigstore.dev) | 无 | 构建来源与签名透明日志 |
| [Repology](https://repology.org) | 无 | 跨发行版包版本追踪 |
| 仿冒检测 | 无 | 内置编辑距离 + 字符替换分析 |

---

## 架构

```
src/
  index.ts                # CLI 入口（--help、--list、stdio 服务器）
  protocol/
    mcp-server.ts         # MCP 服务器设置（stdio 传输）
    tools.ts              # 工具注册表 — 93 个工具在此汇集
  types/
    index.ts              # 共享类型（ToolDef、ToolContext、ToolResult）
  utils/
    rate-limiter.ts       # 按提供者的速率限制器
    cache.ts              # API 响应的 TTL 缓存
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
  govuln/                 # Go 漏洞库工具 (4)
  go/                     # Go 代理工具 (3)
  depsdev/                # deps.dev 工具 (10)
  scorecard/              # OpenSSF Scorecard 工具 (2)
  badge/                  # OpenSSF 最佳实践工具 (3)
  libraries/              # Libraries.io 工具 (4)
  clearlydefined/         # ClearlyDefined 工具 (3)
  rekor/                  # Sigstore Rekor 工具 (5)
  repology/               # Repology 工具 (3)
  typosquat/              # 仿冒检测工具 (2)
  meta/                   # 元工具 (1)
```

---

## MCP 安全套件

| 项目 | 领域 | 工具 |
|------|------|------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | 基于浏览器的安全测试 | 39 工具，Firefox，注入测试 |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | 云安全（AWS/Azure/GCP） | 38 工具，60+ 检查 |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub 安全态势 | 39 工具，45 检查 |
| [cve-mcp](https://github.com/badchars/cve-mcp) | 漏洞情报 | 23 工具，5 来源 |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT 与侦察 | 37 工具，12 来源 |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | 暗网与威胁情报 | 66 工具，16 来源 |
| **supply-chain-mcp-server** | **软件供应链安全** | **93 工具，21 来源** |

---

<p align="center">
<b>仅用于授权的安全测试和评估。</b><br>
在对任何目标执行供应链分析之前，请始终确保获得适当授权。
</p>

<p align="center">
  <a href="LICENSE">MIT 许可证</a> &bull; 使用 Bun + TypeScript 构建
</p>
