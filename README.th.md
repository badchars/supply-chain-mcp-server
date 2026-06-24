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
  <strong>ไทย</strong> |
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

<h3 align="center">ความปลอดภัยของซัพพลายเชนซอฟต์แวร์สำหรับ AI Agent</h3>

<p align="center">
  สแกนช่องโหว่ วิเคราะห์แพ็กเกจ ตรวจสอบแหล่งที่มา ตรวจจับ Typosquatting วิเคราะห์ข้อมูล Dependencies &mdash; 90 เครื่องมือจาก 21 แหล่งข้อมูลในเซิร์ฟเวอร์ MCP เดียว<br>
  AI Agent ของคุณ<b>ตรวจจับความเสี่ยงในซัพพลายเชนตามต้องการ</b> โดยไม่ต้องค้นหาข้อมูลจาก Registry ด้วยตนเอง
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="สัญญาอนุญาต"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 เครื่องมือ">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 แหล่งข้อมูล">
</p>

---

## ภาพรวม

**supply-chain-mcp-server** ให้บริการ AI Agent ด้วย 90 เครื่องมือสำหรับความปลอดภัยของซัพพลายเชนซอฟต์แวร์ผ่าน [Model Context Protocol](https://modelcontextprotocol.io) ครอบคลุมการสแกนช่องโหว่ (OSV, GHSA, NVD) การวิเคราะห์แพ็กเกจ (npm, PyPI, crates.io, Go, RubyGems, NuGet, Packagist) การตรวจสอบแหล่งที่มา (Sigstore Rekor) ข้อมูลเชิงลึกเกี่ยวกับ Dependencies (deps.dev, Libraries.io) OpenSSF Scorecard การคาดการณ์การถูกโจมตี EPSS, CISA KEV และการตรวจจับ Typosquatting

---

## เริ่มต้นอย่างรวดเร็ว

### ตัวเลือกที่ 1: npx (ไม่ต้องติดตั้ง)

```bash
npx supply-chain-mcp-server
```

### ตัวเลือกที่ 2: Clone

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### ตัวแปรสภาพแวดล้อม (ทั้งหมดเป็นทางเลือก)

```bash
export GITHUB_TOKEN=your-token         # เพิ่มขีดจำกัด API สำหรับ GHSA และ Scorecard
export LIBRARIES_API_KEY=your-key      # เข้าถึง API ของ Libraries.io
export NVD_API_KEY=your-key            # เพิ่มขีดจำกัด API สำหรับ NVD
```

API Key ทั้งหมดเป็นทางเลือก หากไม่มี Key ยังคงใช้งานได้ทั้ง OSV, deps.dev, npm, PyPI, crates.io, Go, EPSS, CISA KEV, Rekor, การตรวจจับ Typosquatting และอื่นๆ อีกมาก

---

## สรุปเครื่องมือ &mdash; 90 เครื่องมือ, 21 แหล่งข้อมูล

มี 90 เครื่องมือครอบคลุมข้อมูลเชิงลึกเกี่ยวกับช่องโหว่ เมตาดาต้าของแพ็กเกจ การให้คะแนนด้านความปลอดภัย การปฏิบัติตามข้อกำหนดใบอนุญาต การตรวจสอบแหล่งที่มา และการตรวจจับ Typosquatting

---

## เชื่อมต่อกับ AI Agent

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

เพิ่มใน `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / MCP Client อื่นๆ</b></summary>

ใช้รูปแบบ JSON config เดียวกัน ชี้คำสั่งไปที่ `npx supply-chain-mcp-server`

</details>

---

## แหล่งข้อมูล (21)

| แหล่งข้อมูล | หมวดหมู่ | สิ่งที่ให้บริการ |
|-------------|---------|----------------|
| [OSV.dev](https://osv.dev) | ช่องโหว่ | ฐานข้อมูลช่องโหว่แบบ Multi-ecosystem |
| [GHSA](https://github.com/advisories) | ช่องโหว่ | คำแนะนำด้านความปลอดภัยของ GitHub |
| [NVD](https://nvd.nist.gov) | ช่องโหว่ | ฐานข้อมูลช่องโหว่ NIST, CVE |
| [EPSS](https://www.first.org/epss) | ช่องโหว่ | คะแนนคาดการณ์การถูกโจมตี |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | ช่องโหว่ | แค็ตตาล็อกช่องโหว่ที่ถูกใช้โจมตี |
| [npm](https://www.npmjs.com) | แพ็กเกจ | เมตาดาต้าและคำแนะนำจาก npm Registry |
| [PyPI](https://pypi.org) | แพ็กเกจ | ดัชนีแพ็กเกจ Python |
| [crates.io](https://crates.io) | แพ็กเกจ | Registry แพ็กเกจ Rust |
| [RubyGems](https://rubygems.org) | แพ็กเกจ | Registry แพ็กเกจ Ruby |
| [NuGet](https://www.nuget.org) | แพ็กเกจ | Registry แพ็กเกจ .NET |
| [Packagist](https://packagist.org) | แพ็กเกจ | Registry แพ็กเกจ PHP |
| [Go Proxy](https://proxy.golang.org) | แพ็กเกจ | Go Module Proxy |
| [Go Vuln DB](https://vuln.go.dev) | ช่องโหว่ | ฐานข้อมูลช่องโหว่ Go |
| [deps.dev](https://deps.dev) | Dependencies | กราฟ Dependencies และเมตาดาต้า |
| [OpenSSF Scorecard](https://scorecard.dev) | ความปลอดภัย | คะแนนความปลอดภัย OSS |
| [Best Practices](https://www.bestpractices.dev) | ความปลอดภัย | ตรา OpenSSF Best Practices |
| [Libraries.io](https://libraries.io) | Dependencies | ข้อมูลเชิงลึก Dependencies ของแพ็กเกจ |
| [ClearlyDefined](https://clearlydefined.io) | ใบอนุญาต | ข้อมูลการปฏิบัติตามใบอนุญาต |
| [Sigstore Rekor](https://rekor.sigstore.dev) | แหล่งที่มา | แหล่งที่มาของ Build และความโปร่งใสของลายเซ็น |
| [Repology](https://repology.org) | แพ็กเกจ | ติดตามแพ็กเกจข้ามดิสทริบิวชัน |
| [Typosquat](https://en.wikipedia.org/wiki/Typosquatting) | ความปลอดภัย | ตรวจจับ Typosquatting ในชื่อแพ็กเกจ |

---

## สถาปัตยกรรม

```
src/
  index.ts              # จุดเข้า CLI (--help, --list, เซิร์ฟเวอร์ stdio)
  protocol/
    mcp-server.ts       # ตั้งค่าเซิร์ฟเวอร์ MCP (stdio transport)
    tools.ts            # ทะเบียนเครื่องมือ — เครื่องมือทั้ง 90 รายการ
  types/
    index.ts            # ชนิดข้อมูลที่ใช้ร่วมกัน
  utils/
    rate-limiter.ts     # ตัวจำกัดอัตราต่อผู้ให้บริการ
    cache.ts            # แคช TTL สำหรับการตอบสนอง API
  osv/                  # เครื่องมือช่องโหว่ OSV.dev
  ghsa/                 # เครื่องมือคำแนะนำด้านความปลอดภัย GitHub
  nvd/                  # เครื่องมือช่องโหว่ NVD
  epss/                 # เครื่องมือคะแนน EPSS
  kev/                  # เครื่องมือ CISA KEV
  npm/                  # เครื่องมือแพ็กเกจ npm
  pypi/                 # เครื่องมือแพ็กเกจ PyPI
  crates/               # เครื่องมือแพ็กเกจ crates.io
  rubygems/             # เครื่องมือ RubyGems
  nuget/                # เครื่องมือ NuGet
  packagist/            # เครื่องมือ Packagist
  go/                   # เครื่องมือ Go Proxy
  govuln/               # เครื่องมือ Go Vuln DB
  depsdev/              # เครื่องมือ Dependencies deps.dev
  scorecard/            # เครื่องมือ OpenSSF Scorecard
  badge/                # เครื่องมือตรา Best Practices
  libraries/            # เครื่องมือ Libraries.io
  clearlydefined/       # เครื่องมือใบอนุญาต ClearlyDefined
  rekor/                # เครื่องมือแหล่งที่มา Sigstore Rekor
  repology/             # เครื่องมือติดตามแพ็กเกจ Repology
  typosquat/            # เครื่องมือตรวจจับ Typosquatting
  meta/                 # เครื่องมือ Meta
```

---

## ส่วนหนึ่งของ MCP Security Suite

| โปรเจกต์ | โดเมน | เครื่องมือ |
|----------|-------|-----------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | ทดสอบความปลอดภัยผ่านเบราว์เซอร์ | 39 เครื่องมือ |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | ความปลอดภัยคลาวด์ (AWS/Azure/GCP) | 38 เครื่องมือ |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | สถานะความปลอดภัย GitHub | 39 เครื่องมือ |
| [cve-mcp](https://github.com/badchars/cve-mcp) | ข้อมูลเชิงลึกเกี่ยวกับช่องโหว่ | 23 เครื่องมือ |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT และการสำรวจ | 37 เครื่องมือ |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark Web และข้อมูลเชิงลึกเกี่ยวกับภัยคุกคาม | 66 เครื่องมือ |
| **supply-chain-mcp-server** | **ความปลอดภัยของซัพพลายเชน** | **90 เครื่องมือ** |

---

<p align="center">
<b>สำหรับการทดสอบและประเมินความปลอดภัยอย่างรับผิดชอบเท่านั้น</b><br>
ตรวจสอบให้แน่ใจว่าคุณได้รับอนุญาตที่เหมาะสมก่อนดำเนินการวิเคราะห์ซัพพลายเชน
</p>

<p align="center">
  <a href="LICENSE">สัญญาอนุญาต MIT</a> &bull; สร้างด้วย Bun + TypeScript
</p>
