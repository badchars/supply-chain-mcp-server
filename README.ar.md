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
  <strong>العربية</strong> |
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

<h3 align="center">أمن سلسلة توريد البرمجيات لوكلاء الذكاء الاصطناعي.</h3>

<p align="center" dir="rtl">
  فحص الثغرات، تحليل الحزم، التحقق من المصدر، كشف التزييف الإملائي، استخبارات التبعيات &mdash; 90 أداة من 21 مصدر بيانات في خادم MCP واحد.<br>
  يحصل وكيل الذكاء الاصطناعي الخاص بك على <b>كشف مخاطر سلسلة التوريد عند الطلب</b>، بدون تصفح يدوي للسجلات.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="الرخصة"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 أداة">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 مصدر">
</p>

---

<div dir="rtl">

## نظرة عامة

**supply-chain-mcp-server** يوفر لوكلاء الذكاء الاصطناعي 90 أداة لأمن سلسلة توريد البرمجيات عبر [بروتوكول سياق النموذج](https://modelcontextprotocol.io). يغطي فحص الثغرات (OSV، GHSA، NVD)، تحليل الحزم (npm، PyPI، crates.io، Go، RubyGems، NuGet، Packagist)، التحقق من المصدر (Sigstore Rekor)، استخبارات التبعيات (deps.dev، Libraries.io)، OpenSSF Scorecard، توقعات استغلال EPSS، CISA KEV، وكشف التزييف الإملائي.

</div>

---

<div dir="rtl">

## البداية السريعة

### الخيار 1: npx (بدون تثبيت)

</div>

```bash
npx supply-chain-mcp-server
```

<div dir="rtl">

### الخيار 2: الاستنساخ

</div>

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

<div dir="rtl">

### متغيرات البيئة (جميعها اختيارية)

</div>

```bash
export GITHUB_TOKEN=your-token         # حدود أعلى لواجهة برمجة GHSA و Scorecard
export LIBRARIES_API_KEY=your-key      # الوصول لواجهة برمجة Libraries.io
export NVD_API_KEY=your-key            # حدود أعلى لواجهة برمجة NVD
```

<div dir="rtl">

جميع مفاتيح API اختيارية. بدون مفاتيح، لا تزال تعمل OSV، deps.dev، npm، PyPI، crates.io، Go، EPSS، CISA KEV، Rekor، كشف التزييف الإملائي والمزيد.

</div>

---

<div dir="rtl">

## ملخص الأدوات &mdash; 90 أداة، 21 مصدر بيانات

يوفر 90 أداة تغطي استخبارات الثغرات، بيانات الحزم الوصفية، تقييم الأمان، التوافق مع التراخيص، التحقق من المصدر، وكشف التزييف الإملائي.

</div>

---

<div dir="rtl">

## الاتصال بوكيل الذكاء الاصطناعي

</div>

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

<div dir="rtl">

أضف إلى `~/Library/Application Support/Claude/claude_desktop_config.json`:

</div>

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
<summary><b dir="rtl">Cursor / Windsurf / عملاء MCP آخرون</b></summary>

<div dir="rtl">

نفس تنسيق تكوين JSON. وجّه الأمر إلى `npx supply-chain-mcp-server`.

</div>

</details>

---

<div dir="rtl">

## مصادر البيانات (21)

</div>

| المصدر | الفئة | ما يوفره |
|--------|-------|----------|
| [OSV.dev](https://osv.dev) | الثغرات | قاعدة بيانات ثغرات متعددة الأنظمة البيئية |
| [GHSA](https://github.com/advisories) | الثغرات | إرشادات أمان GitHub |
| [NVD](https://nvd.nist.gov) | الثغرات | قاعدة بيانات ثغرات NIST، CVE |
| [EPSS](https://www.first.org/epss) | الثغرات | تقييم توقعات الاستغلال |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | الثغرات | كتالوج الثغرات المستغلة المعروفة |
| [npm](https://www.npmjs.com) | الحزم | بيانات سجل npm الوصفية والإرشادات |
| [PyPI](https://pypi.org) | الحزم | فهرس حزم Python |
| [crates.io](https://crates.io) | الحزم | سجل حزم Rust |
| [RubyGems](https://rubygems.org) | الحزم | سجل حزم Ruby |
| [NuGet](https://www.nuget.org) | الحزم | سجل حزم .NET |
| [Packagist](https://packagist.org) | الحزم | سجل حزم PHP |
| [Go Proxy](https://proxy.golang.org) | الحزم | وكيل وحدات Go |
| [Go Vuln DB](https://vuln.go.dev) | الثغرات | قاعدة بيانات ثغرات Go |
| [deps.dev](https://deps.dev) | التبعيات | رسم بياني للتبعيات والبيانات الوصفية |
| [OpenSSF Scorecard](https://scorecard.dev) | الأمان | تقييم أمان البرمجيات مفتوحة المصدر |
| [Best Practices](https://www.bestpractices.dev) | الأمان | شارة OpenSSF Best Practices |
| [Libraries.io](https://libraries.io) | التبعيات | استخبارات تبعيات الحزم |
| [ClearlyDefined](https://clearlydefined.io) | التراخيص | بيانات التوافق مع التراخيص |
| [Sigstore Rekor](https://rekor.sigstore.dev) | المصدر | مصدر البناء وشفافية التوقيع |
| [Repology](https://repology.org) | الحزم | تتبع الحزم عبر التوزيعات |
| [Typosquat](https://en.wikipedia.org/wiki/Typosquatting) | الأمان | كشف التزييف الإملائي لأسماء الحزم |

---

<div dir="rtl">

## البنية

</div>

```
src/
  index.ts              # نقطة دخول CLI (--help، --list، خادم stdio)
  protocol/
    mcp-server.ts       # إعداد خادم MCP (نقل stdio)
    tools.ts            # سجل الأدوات — جميع الأدوات الـ 90
  types/
    index.ts            # أنواع مشتركة
  utils/
    rate-limiter.ts     # محدد معدل لكل مزود
    cache.ts            # ذاكرة مؤقتة TTL لاستجابات API
  osv/                  # أدوات ثغرات OSV.dev
  ghsa/                 # أدوات إرشادات أمان GitHub
  nvd/                  # أدوات ثغرات NVD
  epss/                 # أدوات تقييم EPSS
  kev/                  # أدوات CISA KEV
  npm/                  # أدوات حزم npm
  pypi/                 # أدوات حزم PyPI
  crates/               # أدوات حزم crates.io
  rubygems/             # أدوات RubyGems
  nuget/                # أدوات NuGet
  packagist/            # أدوات Packagist
  go/                   # أدوات Go Proxy
  govuln/               # أدوات Go Vuln DB
  depsdev/              # أدوات تبعيات deps.dev
  scorecard/            # أدوات OpenSSF Scorecard
  badge/                # أدوات شارة Best Practices
  libraries/            # أدوات Libraries.io
  clearlydefined/       # أدوات تراخيص ClearlyDefined
  rekor/                # أدوات مصدر Sigstore Rekor
  repology/             # أدوات تتبع حزم Repology
  typosquat/            # أدوات كشف التزييف الإملائي
  meta/                 # أدوات Meta
```

---

<div dir="rtl">

## جزء من مجموعة MCP الأمنية

</div>

| المشروع | المجال | الأدوات |
|---------|--------|---------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | اختبار الأمان عبر المتصفح | 39 أداة |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | أمان السحابة (AWS/Azure/GCP) | 38 أداة |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | الوضع الأمني لـ GitHub | 39 أداة |
| [cve-mcp](https://github.com/badchars/cve-mcp) | استخبارات الثغرات | 23 أداة |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | الاستخبارات مفتوحة المصدر والاستطلاع | 37 أداة |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | استخبارات الويب المظلم والتهديدات | 66 أداة |
| **supply-chain-mcp-server** | **أمن سلسلة التوريد** | **90 أداة** |

---

<p align="center" dir="rtl">
<b>للاختبار والتقييم الأمني المسؤول فقط.</b><br>
تأكد من الحصول على الإذن المناسب قبل إجراء تحليل سلسلة التوريد.
</p>

<p align="center">
  <a href="LICENSE">رخصة MIT</a> &bull; بُني بـ Bun + TypeScript
</p>
