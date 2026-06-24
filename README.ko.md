<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <strong>한국어</strong> |
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

<h3 align="center">AI 에이전트를 위한 소프트웨어 공급망 보안.</h3>

<p align="center">
  취약점 스캐닝, 패키지 분석, 출처 검증, 타이포스쿼팅 탐지, 의존성 인텔리전스 &mdash; npm, PyPI, crates.io, Go 등 생태계 전반을 하나의 MCP 서버에 통합.<br>
  AI 에이전트가 <b>포괄적인 공급망 보안 인텔리전스</b>를 제공받습니다. 수십 개의 레지스트리와 데이터베이스를 수동으로 전환할 필요가 없습니다.
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

## 빠른 시작

### 방법 1: npx (설치 불필요)

```bash
npx supply-chain-mcp-server
```

대부분의 도구는 API 키 없이 무료로 작동합니다. OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor 등이 바로 사용 가능합니다.

### 방법 2: 클론

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### 환경 변수 (선택사항)

```bash
export GITHUB_TOKEN=your-token          # GHSA + Scorecard 높은 속도 제한
export LIBRARIES_API_KEY=your-key       # Libraries.io 도구 필수
export NVD_API_KEY=your-key             # NVD 50 요청/30초 (키 없이 5 요청/30초)
```

모든 API 키는 선택사항입니다. 키 없이도 OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor, EPSS, KEV, Repology, 타이포스쿼팅 탐지 등을 사용할 수 있습니다.

### AI 에이전트에 연결

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json`에 추가:

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
<summary><b>Cursor / Windsurf / 기타 MCP 클라이언트</b></summary>

동일한 JSON 설정 형식입니다. 명령어를 `npx supply-chain-mcp-server` 또는 로컬 설치 경로로 지정하세요.

</details>

---

## 도구 개요 (93개 도구, 21개 데이터 소스 + 1 메타)

| 카테고리 | 도구 수 | 설명 |
|----------|---------|------|
| OSV.dev 취약점 | 5 | 통합 취약점 데이터베이스 조회 |
| GitHub Advisory (GHSA) | 4 | GitHub 보안 권고 |
| NIST NVD | 3 | NIST CVE 데이터베이스 |
| EPSS 익스플로잇 예측 | 4 | 익스플로잇 확률 점수 |
| CISA KEV | 4 | 알려진 악용 취약점 |
| npm 레지스트리 | 10 | npm 레지스트리 + 출처 + 감사 |
| PyPI | 4 | Python 패키지 인덱스 |
| crates.io | 4 | Rust 크레이트 레지스트리 |
| RubyGems | 4 | Ruby gem 레지스트리 |
| NuGet | 4 | .NET 패키지 레지스트리 |
| Packagist | 4 | PHP/Composer 레지스트리 |
| Go 취약점 DB | 4 | Go 취약점 데이터베이스 |
| Go 프록시 | 3 | Go 모듈 프록시 + 체크섬 DB |
| deps.dev | 10 | Google 의존성 인사이트 |
| OpenSSF Scorecard | 2 | OpenSSF 보안 점수 |
| OpenSSF 모범 사례 | 3 | OpenSSF 모범 사례 배지 |
| Libraries.io | 4 | 크로스 에코시스템 인텔리전스 |
| ClearlyDefined | 3 | 라이선스 및 귀속 데이터 |
| Sigstore Rekor | 5 | Sigstore 투명성 로그 |
| Repology | 3 | 크로스 배포판 패키지 추적 |
| 타이포스쿼팅 탐지 | 2 | 내장 타이포스쿼팅 탐지 |
| 메타 | 1 | 데이터 소스 목록 |

---

## 데이터 소스 (21)

| 소스 | 인증 | 제공 데이터 |
|------|------|------------|
| [OSV.dev](https://osv.dev) | 없음 | 통합 취약점 데이터베이스 (npm, PyPI, Go, crates.io 등) |
| [GitHub Advisory](https://github.com/advisories) | 선택 | GitHub 보안 권고 (GHSA) |
| [NIST NVD](https://nvd.nist.gov) | 선택 | CVE 취약점 상세, CPE 매칭 |
| [EPSS](https://www.first.org/epss) | 없음 | 익스플로잇 확률 점수 |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | 없음 | 알려진 악용 취약점 카탈로그 |
| [npm](https://www.npmjs.com) | 없음 | 패키지 메타데이터, 버전, 출처, 감사 |
| [PyPI](https://pypi.org) | 없음 | Python 패키지 메타데이터 및 버전 |
| [crates.io](https://crates.io) | 없음 | Rust 크레이트 메타데이터 및 버전 |
| [RubyGems](https://rubygems.org) | 없음 | Ruby gem 메타데이터 및 버전 |
| [NuGet](https://www.nuget.org) | 없음 | .NET 패키지 메타데이터 및 버전 |
| [Packagist](https://packagist.org) | 없음 | PHP/Composer 패키지 메타데이터 |
| [Go 취약점 DB](https://vuln.go.dev) | 없음 | Go 전용 취약점 |
| [Go 프록시](https://proxy.golang.org) | 없음 | Go 모듈 버전 및 체크섬 |
| [deps.dev](https://deps.dev) | 없음 | 의존성 그래프, 권고, 버전 |
| [OpenSSF Scorecard](https://scorecard.dev) | 선택 | 오픈소스 프로젝트 보안 점수 |
| [OpenSSF 모범 사례](https://bestpractices.coreinfrastructure.org) | 없음 | CII 모범 사례 배지 상태 |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | 크로스 에코시스템 의존성 인텔리전스 |
| [ClearlyDefined](https://clearlydefined.io) | 없음 | 라이선스 및 귀속 데이터 |
| [Sigstore Rekor](https://rekor.sigstore.dev) | 없음 | 빌드 출처 및 서명 투명성 로그 |
| [Repology](https://repology.org) | 없음 | 크로스 배포판 패키지 버전 추적 |
| 타이포스쿼팅 탐지 | 없음 | 내장 편집 거리 + 문자 치환 분석 |

---

## 아키텍처

```
src/
  index.ts                # CLI 진입점 (--help, --list, stdio 서버)
  protocol/
    mcp-server.ts         # MCP 서버 설정 (stdio 전송)
    tools.ts              # 도구 레지스트리 — 93개 도구가 여기에 집합
  types/
    index.ts              # 공유 타입 (ToolDef, ToolContext, ToolResult)
  utils/
    rate-limiter.ts       # 공급자별 속도 제한기
    cache.ts              # API 응답용 TTL 캐시
  osv/                    # OSV.dev 도구 (5)
  ghsa/                   # GitHub Advisory 도구 (4)
  nvd/                    # NIST NVD 도구 (3)
  epss/                   # EPSS 도구 (4)
  kev/                    # CISA KEV 도구 (4)
  npm/                    # npm 도구 (10)
  pypi/                   # PyPI 도구 (4)
  crates/                 # crates.io 도구 (4)
  rubygems/               # RubyGems 도구 (4)
  nuget/                  # NuGet 도구 (4)
  packagist/              # Packagist 도구 (4)
  govuln/                 # Go 취약점 DB 도구 (4)
  go/                     # Go 프록시 도구 (3)
  depsdev/                # deps.dev 도구 (10)
  scorecard/              # OpenSSF Scorecard 도구 (2)
  badge/                  # OpenSSF 모범 사례 도구 (3)
  libraries/              # Libraries.io 도구 (4)
  clearlydefined/         # ClearlyDefined 도구 (3)
  rekor/                  # Sigstore Rekor 도구 (5)
  repology/               # Repology 도구 (3)
  typosquat/              # 타이포스쿼팅 탐지 도구 (2)
  meta/                   # 메타 도구 (1)
```

---

## MCP 보안 제품군

| 프로젝트 | 분야 | 도구 |
|----------|------|------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | 브라우저 기반 보안 테스트 | 39 도구, Firefox, 인젝션 테스트 |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | 클라우드 보안 (AWS/Azure/GCP) | 38 도구, 60+ 검사 |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub 보안 태세 | 39 도구, 45 검사 |
| [cve-mcp](https://github.com/badchars/cve-mcp) | 취약점 인텔리전스 | 23 도구, 5 소스 |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT 및 정찰 | 37 도구, 12 소스 |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | 다크웹 및 위협 인텔리전스 | 66 도구, 16 소스 |
| **supply-chain-mcp-server** | **소프트웨어 공급망 보안** | **93 도구, 21 소스** |

---

<p align="center">
<b>인가된 보안 테스트 및 평가 목적으로만 사용하세요.</b><br>
대상에 대한 공급망 분석을 수행하기 전에 항상 적절한 권한을 확보하세요.
</p>

<p align="center">
  <a href="LICENSE">MIT 라이선스</a> &bull; Bun + TypeScript로 제작
</p>
