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
  <strong>日本語</strong> |
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
    <img alt="supply-chain-mcp-server" src="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">AIエージェント向けソフトウェアサプライチェーンセキュリティ。</h3>

<p align="center">
  脆弱性スキャン、パッケージ分析、来歴検証、タイポスクワッティング検出、依存関係インテリジェンス &mdash; 21のデータソースにわたる90ツールを単一のMCPサーバーに統合。<br>
  AIエージェントが<b>サプライチェーンのリスクをオンデマンドで検出</b>します。手動のレジストリ巡回は不要です。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="ライセンス"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90ツール">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21ソース">
</p>

---

## 概要

**supply-chain-mcp-server** は、[Model Context Protocol](https://modelcontextprotocol.io) を通じて、ソフトウェアサプライチェーンセキュリティのための90のツールをAIエージェントに提供します。脆弱性スキャン（OSV、GHSA、NVD）、パッケージ分析（npm、PyPI、crates.io、Go、RubyGems、NuGet、Packagist）、来歴検証（Sigstore Rekor）、依存関係インテリジェンス（deps.dev、Libraries.io）、OpenSSF Scorecard、EPSS悪用予測、CISA KEV、タイポスクワッティング検出をカバーします。

---

## クイックスタート

### オプション1: npx（インストール不要）

```bash
npx supply-chain-mcp-server
```

### オプション2: クローン

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### 環境変数（すべてオプション）

```bash
export GITHUB_TOKEN=your-token         # GHSAおよびScorecard APIレート向上
export LIBRARIES_API_KEY=your-key      # Libraries.io APIアクセス
export NVD_API_KEY=your-key            # NVD APIレート制限引き上げ
```

すべてのAPIキーはオプションです。キーがなくても、OSV、deps.dev、npm、PyPI、crates.io、Go、EPSS、CISA KEV、Rekor、タイポスクワッティング検出などが利用できます。

---

## ツール概要 &mdash; 90ツール、21データソース

脆弱性インテリジェンス、パッケージメタデータ、セキュリティスコアリング、ライセンスコンプライアンス、来歴検証、タイポスクワッティング検出をカバーする90のツールを提供します。

---

## AIエージェントに接続

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json` に追加:

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
<summary><b>Cursor / Windsurf / その他のMCPクライアント</b></summary>

同じJSON設定形式です。コマンドを `npx supply-chain-mcp-server` に指定してください。

</details>

---

## データソース（21）

| ソース | カテゴリ | 提供するもの |
|--------|----------|-------------|
| [OSV.dev](https://osv.dev) | 脆弱性 | マルチエコシステム脆弱性データベース |
| [GHSA](https://github.com/advisories) | 脆弱性 | GitHubセキュリティアドバイザリー |
| [NVD](https://nvd.nist.gov) | 脆弱性 | NIST脆弱性データベース、CVE |
| [EPSS](https://www.first.org/epss) | 脆弱性 | エクスプロイト予測スコアリング |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | 脆弱性 | 既知の悪用された脆弱性カタログ |
| [npm](https://www.npmjs.com) | パッケージ | npmレジストリメタデータ＆アドバイザリー |
| [PyPI](https://pypi.org) | パッケージ | Pythonパッケージインデックス |
| [crates.io](https://crates.io) | パッケージ | Rustパッケージレジストリ |
| [RubyGems](https://rubygems.org) | パッケージ | Rubyパッケージレジストリ |
| [NuGet](https://www.nuget.org) | パッケージ | .NETパッケージレジストリ |
| [Packagist](https://packagist.org) | パッケージ | PHPパッケージレジストリ |
| [Go Proxy](https://proxy.golang.org) | パッケージ | Goモジュールプロキシ |
| [Go Vuln DB](https://vuln.go.dev) | 脆弱性 | Go脆弱性データベース |
| [deps.dev](https://deps.dev) | 依存関係 | 依存関係グラフ＆メタデータ |
| [OpenSSF Scorecard](https://scorecard.dev) | セキュリティ | OSSセキュリティスコアリング |
| [Best Practices](https://www.bestpractices.dev) | セキュリティ | OpenSSFベストプラクティスバッジ |
| [Libraries.io](https://libraries.io) | 依存関係 | パッケージ依存関係インテリジェンス |
| [ClearlyDefined](https://clearlydefined.io) | ライセンス | ライセンスコンプライアンスデータ |
| [Sigstore Rekor](https://rekor.sigstore.dev) | 来歴 | ビルド来歴＆署名透明性 |
| [Repology](https://repology.org) | パッケージ | クロスディストリビューションパッケージ追跡 |
| [Typosquat](https://en.wikipedia.org/wiki/Typosquatting) | セキュリティ | パッケージ名タイポスクワッティング検出 |

---

## アーキテクチャ

```
src/
  index.ts              # CLIエントリーポイント (--help, --list, stdioサーバー)
  protocol/
    mcp-server.ts       # MCPサーバーセットアップ (stdioトランスポート)
    tools.ts            # ツールレジストリ — 全90ツール
  types/
    index.ts            # 共有型
  utils/
    rate-limiter.ts     # プロバイダーごとのレートリミッター
    cache.ts            # APIレスポンスのTTLキャッシュ
  osv/                  # OSV.dev脆弱性ツール
  ghsa/                 # GitHubセキュリティアドバイザリーツール
  nvd/                  # NVD脆弱性ツール
  epss/                 # EPSSスコアリングツール
  kev/                  # CISA KEVツール
  npm/                  # npmパッケージツール
  pypi/                 # PyPIパッケージツール
  crates/               # crates.ioパッケージツール
  rubygems/             # RubyGemsツール
  nuget/                # NuGetツール
  packagist/            # Packagistツール
  go/                   # Go Proxyツール
  govuln/               # Go脆弱性DBツール
  depsdev/              # deps.dev依存関係ツール
  scorecard/            # OpenSSF Scorecardツール
  badge/                # ベストプラクティスバッジツール
  libraries/            # Libraries.ioツール
  clearlydefined/       # ClearlyDefinedライセンスツール
  rekor/                # Sigstore Rekor来歴ツール
  repology/             # Repologyパッケージ追跡ツール
  typosquat/            # タイポスクワッティング検出ツール
  meta/                 # メタツール
```

---

## MCPセキュリティスイートの一部

| プロジェクト | ドメイン | ツール |
|------------|---------|--------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | ブラウザベースのセキュリティテスト | 39ツール |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | クラウドセキュリティ (AWS/Azure/GCP) | 38ツール |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHubセキュリティ態勢 | 39ツール |
| [cve-mcp](https://github.com/badchars/cve-mcp) | 脆弱性インテリジェンス | 23ツール |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT＆偵察 | 37ツール |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | ダークウェブ＆脅威インテリジェンス | 66ツール |
| **supply-chain-mcp-server** | **サプライチェーンセキュリティ** | **90ツール** |

---

<p align="center">
<b>責任あるセキュリティテストおよび評価のみを目的としています。</b><br>
サプライチェーン分析を実施する前に、適切な許可を得てください。
</p>

<p align="center">
  <a href="LICENSE">MITライセンス</a> &bull; Bun + TypeScriptで構築
</p>
