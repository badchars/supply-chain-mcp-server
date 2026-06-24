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
  <strong>বাংলা</strong> |
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

<h3 align="center">AI এজেন্টদের জন্য সফটওয়্যার সাপ্লাই চেইন নিরাপত্তা।</h3>

<p align="center">
  দুর্বলতা স্ক্যানিং, প্যাকেজ বিশ্লেষণ, উৎপত্তি যাচাই, টাইপোস্কোয়াটিং সনাক্তকরণ, নির্ভরতা বুদ্ধিমত্তা &mdash; npm, PyPI, crates.io, Go এবং আরও অনেক কিছুর জন্য একটি একক MCP সার্ভারে একত্রিত।<br>
  আপনার AI এজেন্ট <b>চাহিদা অনুযায়ী সম্পূর্ণ সাপ্লাই চেইন নিরাপত্তা বুদ্ধিমত্তা</b> পায়।
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="লাইসেন্স"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="৯০টি টুল">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="২১টি উৎস">
</p>

---

## এটি কী

**supply-chain-mcp-server** আপনার AI এজেন্টকে [Model Context Protocol](https://modelcontextprotocol.io)-এর মাধ্যমে ২১টি ডেটা উৎস জুড়ে **৯০টি টুল** প্রদান করে। এজেন্ট প্যাকেজ দুর্বলতা স্ক্যান করে, নির্ভরতা বিশ্লেষণ করে, সফটওয়্যার উৎপত্তি যাচাই করে, টাইপোস্কোয়াটিং আক্রমণ সনাক্ত করে এবং একটি একীভূত নিরাপত্তা চিত্র উপস্থাপন করে &mdash; একটি একক কথোপকথনে।

API কী ঐচ্ছিক। অনেক উৎস (OSV.dev, GHSA, EPSS, CISA KEV, npm, PyPI, crates.io, Go এবং আরও) বিনামূল্যে কাজ করে।

---

## দ্রুত শুরু

### npx দিয়ে (ইনস্টল প্রয়োজন নেই)

```bash
npx supply-chain-mcp-server
```

### পরিবেশ পরিবর্তনশীল (ঐচ্ছিক)

```bash
export GITHUB_TOKEN=your-token         # GHSA এবং Scorecard রেট লিমিট বাড়ায়
export LIBRARIES_API_KEY=your-key      # Libraries.io নির্ভরতা বুদ্ধিমত্তা সক্রিয় করে
export NVD_API_KEY=your-key            # NVD CVE রেট লিমিট বাড়ায়
```

### আপনার AI এজেন্টের সাথে সংযুক্ত করুন

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json`-এ যোগ করুন:

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
<summary><b>Cursor / Windsurf / অন্যান্য MCP ক্লায়েন্ট</b></summary>

একই JSON কনফিগারেশন ফর্ম্যাট। কমান্ডটি `npx supply-chain-mcp-server` বা আপনার স্থানীয় ইনস্টলেশন পাথে নির্দেশ করুন।

</details>

---

## টুল সারসংক্ষেপ (৯০টি টুল, ২১টি উৎস)

| বিভাগ | টুল সংখ্যা | বিবরণ |
|-------|-------------|--------|
| OSV.dev | দুর্বলতা কোয়েরি | ক্রস-ইকোসিস্টেম ওপেন সোর্স দুর্বলতা ডেটাবেস |
| GHSA | GitHub পরামর্শ | GitHub নিরাপত্তা পরামর্শ ডেটাবেস |
| NVD | CVE অনুসন্ধান | NIST জাতীয় দুর্বলতা ডেটাবেস |
| EPSS | এক্সপ্লয়েট সম্ভাবনা স্কোর | এক্সপ্লয়েট পূর্বাভাস স্কোরিং সিস্টেম |
| CISA KEV | পরিচিত শোষিত দুর্বলতা | CISA পরিচিত শোষিত দুর্বলতা ক্যাটালগ |
| npm | প্যাকেজ নিরাপত্তা | npm রেজিস্ট্রি নিরাপত্তা বিশ্লেষণ |
| PyPI | প্যাকেজ নিরাপত্তা | Python প্যাকেজ ইনডেক্স বিশ্লেষণ |
| crates.io | প্যাকেজ নিরাপত্তা | Rust প্যাকেজ রেজিস্ট্রি বিশ্লেষণ |
| RubyGems | প্যাকেজ নিরাপত্তা | Ruby প্যাকেজ রেজিস্ট্রি বিশ্লেষণ |
| NuGet | প্যাকেজ নিরাপত্তা | .NET প্যাকেজ রেজিস্ট্রি বিশ্লেষণ |
| Packagist | প্যাকেজ নিরাপত্তা | PHP প্যাকেজ রেজিস্ট্রি বিশ্লেষণ |
| Go Proxy | প্যাকেজ নিরাপত্তা | Go মডিউল প্রক্সি বিশ্লেষণ |
| Go Vuln DB | দুর্বলতা ডেটাবেস | Go দুর্বলতা ডেটাবেস |
| deps.dev | নির্ভরতা গ্রাফ | Google ওপেন সোর্স নির্ভরতা বুদ্ধিমত্তা |
| Scorecard | প্রকল্প নিরাপত্তা | OpenSSF নিরাপত্তা স্কোরকার্ড |
| Best Practices | প্রকল্প নিরাপত্তা | OpenSSF সেরা অনুশীলন ব্যাজ |
| Libraries.io | নির্ভরতা বুদ্ধিমত্তা | প্যাকেজ নির্ভরতা এবং স্বাস্থ্য মেট্রিক্স |
| ClearlyDefined | লাইসেন্স বিশ্লেষণ | লাইসেন্স এবং কপিরাইট স্বচ্ছতা |
| Rekor | উৎপত্তি যাচাই | Sigstore স্বচ্ছতা লগ |
| Repology | প্যাকেজ ট্র্যাকিং | ক্রস-ডিস্ট্রিবিউশন প্যাকেজ সংস্করণ ট্র্যাকিং |
| Typosquat | টাইপোস্কোয়াটিং সনাক্তকরণ | প্যাকেজ নাম টাইপোস্কোয়াটিং সনাক্তকরণ |

---

## ডেটা উৎস

| উৎস | প্রমাণীকরণ | কী প্রদান করে |
|------|-------------|---------------|
| [OSV.dev](https://osv.dev) | নেই | ক্রস-ইকোসিস্টেম দুর্বলতা কোয়েরি |
| [GitHub Advisory (GHSA)](https://github.com/advisories) | `GITHUB_TOKEN` ঐচ্ছিক | নিরাপত্তা পরামর্শ এবং দুর্বলতা ডেটা |
| [NVD](https://nvd.nist.gov) | `NVD_API_KEY` ঐচ্ছিক | CVE বিবরণ, CVSS স্কোর, CPE ম্যাচিং |
| [EPSS](https://www.first.org/epss) | নেই | এক্সপ্লয়েট সম্ভাবনা স্কোর |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | নেই | পরিচিত শোষিত দুর্বলতা ক্যাটালগ |
| [npm](https://www.npmjs.com) | নেই | JavaScript প্যাকেজ মেটাডেটা এবং নিরাপত্তা অডিট |
| [PyPI](https://pypi.org) | নেই | Python প্যাকেজ মেটাডেটা এবং নিরাপত্তা তথ্য |
| [crates.io](https://crates.io) | নেই | Rust প্যাকেজ মেটাডেটা এবং সংস্করণ তথ্য |
| [RubyGems](https://rubygems.org) | নেই | Ruby প্যাকেজ মেটাডেটা |
| [NuGet](https://www.nuget.org) | নেই | .NET প্যাকেজ মেটাডেটা |
| [Packagist](https://packagist.org) | নেই | PHP/Composer প্যাকেজ মেটাডেটা |
| [Go Proxy](https://proxy.golang.org) | নেই | Go মডিউল মেটাডেটা এবং সংস্করণ তথ্য |
| [Go Vuln DB](https://vuln.go.dev) | নেই | Go-নির্দিষ্ট দুর্বলতা ডেটাবেস |
| [deps.dev](https://deps.dev) | নেই | নির্ভরতা গ্রাফ, পরামর্শ ম্যাচিং |
| [OpenSSF Scorecard](https://securityscorecards.dev) | `GITHUB_TOKEN` ঐচ্ছিক | ওপেন সোর্স প্রকল্প নিরাপত্তা স্কোর |
| [OpenSSF Best Practices](https://www.bestpractices.dev) | নেই | প্রকল্প পরিপক্বতা ব্যাজ |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | নির্ভরতা স্বাস্থ্য, সংস্করণ ট্র্যাকিং |
| [ClearlyDefined](https://clearlydefined.io) | নেই | লাইসেন্স স্বচ্ছতা এবং কপিরাইট ডেটা |
| [Rekor](https://rekor.sigstore.dev) | নেই | Sigstore স্বচ্ছতা লগ, স্বাক্ষর যাচাই |
| [Repology](https://repology.org) | নেই | ক্রস-ডিস্ট্রিবিউশন প্যাকেজ সংস্করণ ট্র্যাকিং |
| টাইপোস্কোয়াট সনাক্তকরণ | নেই | প্যাকেজ নাম টাইপোস্কোয়াটিং এবং নির্ভরতা বিভ্রান্তি সনাক্তকরণ |

---

## MCP নিরাপত্তা স্যুটের অংশ

| প্রকল্প | ক্ষেত্র | টুল |
|---------|--------|------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | ব্রাউজার-ভিত্তিক নিরাপত্তা পরীক্ষা | ৩৯টি টুল |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | ক্লাউড নিরাপত্তা (AWS/Azure/GCP) | ৩৮টি টুল |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub নিরাপত্তা অবস্থান | ৩৯টি টুল |
| [cve-mcp](https://github.com/badchars/cve-mcp) | দুর্বলতা বুদ্ধিমত্তা | ২৩টি টুল |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT এবং রিকনেসান্স | ৩৭টি টুল |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | ডার্ক ওয়েব এবং হুমকি বুদ্ধিমত্তা | ৬৬টি টুল |
| **supply-chain-mcp-server** | **সফটওয়্যার সাপ্লাই চেইন নিরাপত্তা** | **৯০টি টুল, ২১টি উৎস** |

---

<p align="center">
<b>শুধুমাত্র অনুমোদিত নিরাপত্তা পরীক্ষা এবং মূল্যায়নের জন্য।</b><br>
যেকোনো লক্ষ্যের উপর নিরাপত্তা বিশ্লেষণ পরিচালনা করার আগে সর্বদা নিশ্চিত করুন যে আপনার যথাযথ অনুমোদন আছে।
</p>

<p align="center">
  <a href="LICENSE">MIT লাইসেন্স</a> &bull; Bun + TypeScript দিয়ে তৈরি
</p>
