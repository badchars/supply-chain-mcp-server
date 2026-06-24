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
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.el.md">Ελληνικά</a> |
  <strong>Tiếng Việt</strong> |
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

<h3 align="center">Bảo mật chuỗi cung ứng phần mềm cho các tác nhân AI.</h3>

<p align="center">
  Quét lỗ hổng, phân tích gói, xác minh nguồn gốc, phát hiện typosquatting, thông tin phụ thuộc &mdash; cho npm, PyPI, crates.io, Go và nhiều hơn nữa trong một máy chủ MCP duy nhất.<br>
  Tác nhân AI của bạn nhận được <b>thông tin bảo mật chuỗi cung ứng toàn diện theo yêu cầu</b>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Giấy phép"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 Công cụ">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 Nguồn">
</p>

---

## Giới thiệu

**supply-chain-mcp-server** cung cấp cho tác nhân AI của bạn **90 công cụ** từ 21 nguồn dữ liệu thông qua [Model Context Protocol](https://modelcontextprotocol.io). Tác nhân quét lỗ hổng gói, phân tích phụ thuộc, xác minh nguồn gốc phần mềm, phát hiện tấn công typosquatting và trình bày bức tranh bảo mật thống nhất &mdash; trong một cuộc hội thoại duy nhất.

Các khóa API là tùy chọn. Nhiều nguồn (OSV.dev, GHSA, EPSS, CISA KEV, npm, PyPI, crates.io, Go và nhiều hơn nữa) hoạt động miễn phí.

---

## Bắt đầu nhanh

### Với npx (không cần cài đặt)

```bash
npx supply-chain-mcp-server
```

### Biến môi trường (tùy chọn)

```bash
export GITHUB_TOKEN=your-token         # Tăng giới hạn tốc độ cho GHSA & Scorecard
export LIBRARIES_API_KEY=your-key      # Kích hoạt thông tin phụ thuộc Libraries.io
export NVD_API_KEY=your-key            # Tăng giới hạn tốc độ cho NVD CVE
```

### Kết nối với tác nhân AI của bạn

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Thêm vào `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / các MCP client khác</b></summary>

Cùng định dạng cấu hình JSON. Trỏ lệnh đến `npx supply-chain-mcp-server` hoặc đường dẫn cài đặt cục bộ của bạn.

</details>

---

## Tổng quan công cụ (90 công cụ, 21 nguồn)

| Danh mục | Số công cụ | Mô tả |
|----------|------------|-------|
| OSV.dev | Truy vấn lỗ hổng | Cơ sở dữ liệu lỗ hổng mã nguồn mở đa hệ sinh thái |
| GHSA | Khuyến cáo GitHub | Cơ sở dữ liệu khuyến cáo bảo mật GitHub |
| NVD | Tìm kiếm CVE | Cơ sở dữ liệu lỗ hổng quốc gia NIST |
| EPSS | Điểm xác suất khai thác | Hệ thống chấm điểm dự đoán khai thác |
| CISA KEV | Lỗ hổng bị khai thác đã biết | Danh mục lỗ hổng bị khai thác đã biết của CISA |
| npm | Bảo mật gói | Phân tích bảo mật registry npm |
| PyPI | Bảo mật gói | Phân tích chỉ mục gói Python |
| crates.io | Bảo mật gói | Phân tích registry gói Rust |
| RubyGems | Bảo mật gói | Phân tích registry gói Ruby |
| NuGet | Bảo mật gói | Phân tích registry gói .NET |
| Packagist | Bảo mật gói | Phân tích registry gói PHP |
| Go Proxy | Bảo mật gói | Phân tích proxy module Go |
| Go Vuln DB | Cơ sở dữ liệu lỗ hổng | Cơ sở dữ liệu lỗ hổng Go |
| deps.dev | Đồ thị phụ thuộc | Thông tin phụ thuộc mã nguồn mở của Google |
| Scorecard | Bảo mật dự án | Thẻ điểm bảo mật OpenSSF |
| Best Practices | Bảo mật dự án | Huy hiệu thực hành tốt nhất OpenSSF |
| Libraries.io | Thông tin phụ thuộc | Chỉ số sức khỏe gói và phụ thuộc |
| ClearlyDefined | Phân tích giấy phép | Độ rõ ràng giấy phép và bản quyền |
| Rekor | Xác minh nguồn gốc | Nhật ký minh bạch Sigstore |
| Repology | Theo dõi gói | Theo dõi phiên bản gói đa bản phân phối |
| Typosquat | Phát hiện typosquatting | Phát hiện typosquatting tên gói |

---

## Nguồn dữ liệu

| Nguồn | Xác thực | Cung cấp gì |
|-------|----------|-------------|
| [OSV.dev](https://osv.dev) | Không | Truy vấn lỗ hổng đa hệ sinh thái |
| [GitHub Advisory (GHSA)](https://github.com/advisories) | `GITHUB_TOKEN` tùy chọn | Khuyến cáo bảo mật và dữ liệu lỗ hổng |
| [NVD](https://nvd.nist.gov) | `NVD_API_KEY` tùy chọn | Chi tiết CVE, điểm CVSS, khớp CPE |
| [EPSS](https://www.first.org/epss) | Không | Điểm xác suất khai thác |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Không | Danh mục lỗ hổng bị khai thác đã biết |
| [npm](https://www.npmjs.com) | Không | Siêu dữ liệu gói JavaScript và kiểm tra bảo mật |
| [PyPI](https://pypi.org) | Không | Siêu dữ liệu gói Python và thông tin bảo mật |
| [crates.io](https://crates.io) | Không | Siêu dữ liệu gói Rust và thông tin phiên bản |
| [RubyGems](https://rubygems.org) | Không | Siêu dữ liệu gói Ruby |
| [NuGet](https://www.nuget.org) | Không | Siêu dữ liệu gói .NET |
| [Packagist](https://packagist.org) | Không | Siêu dữ liệu gói PHP/Composer |
| [Go Proxy](https://proxy.golang.org) | Không | Siêu dữ liệu module Go và thông tin phiên bản |
| [Go Vuln DB](https://vuln.go.dev) | Không | Cơ sở dữ liệu lỗ hổng dành riêng cho Go |
| [deps.dev](https://deps.dev) | Không | Đồ thị phụ thuộc, khớp khuyến cáo |
| [OpenSSF Scorecard](https://securityscorecards.dev) | `GITHUB_TOKEN` tùy chọn | Điểm bảo mật dự án mã nguồn mở |
| [OpenSSF Best Practices](https://www.bestpractices.dev) | Không | Huy hiệu trưởng thành dự án |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Sức khỏe phụ thuộc, theo dõi phiên bản |
| [ClearlyDefined](https://clearlydefined.io) | Không | Độ rõ ràng giấy phép và dữ liệu bản quyền |
| [Rekor](https://rekor.sigstore.dev) | Không | Nhật ký minh bạch Sigstore, xác minh chữ ký |
| [Repology](https://repology.org) | Không | Theo dõi phiên bản gói đa bản phân phối |
| Phát hiện Typosquat | Không | Phát hiện typosquatting tên gói và nhầm lẫn phụ thuộc |

---

## Thuộc bộ bảo mật MCP

| Dự án | Lĩnh vực | Công cụ |
|-------|----------|---------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Kiểm thử bảo mật qua trình duyệt | 39 công cụ |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Bảo mật đám mây (AWS/Azure/GCP) | 38 công cụ |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Tư thế bảo mật GitHub | 39 công cụ |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Thông tin lỗ hổng | 23 công cụ |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT & trinh sát | 37 công cụ |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark web & thông tin mối đe dọa | 66 công cụ |
| **supply-chain-mcp-server** | **Bảo mật chuỗi cung ứng phần mềm** | **90 công cụ, 21 nguồn** |

---

<p align="center">
<b>Chỉ dành cho kiểm thử và đánh giá bảo mật được ủy quyền.</b><br>
Luôn đảm bảo bạn có sự ủy quyền phù hợp trước khi thực hiện phân tích bảo mật trên bất kỳ mục tiêu nào.
</p>

<p align="center">
  <a href="LICENSE">Giấy phép MIT</a> &bull; Xây dựng với Bun + TypeScript
</p>
