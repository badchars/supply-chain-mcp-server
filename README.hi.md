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
  <a href="README.vi.md">Tiếng Việt</a> |
  <strong>हिन्दी</strong>
</p>

<p align="center">
  <br>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-light.svg">
    <img alt="supply-chain-mcp-server" src="https://raw.githubusercontent.com/badchars/supply-chain-mcp-server/main/.github/banner-dark.svg" width="700">
  </picture>
</p>

<h3 align="center">AI एजेंट्स के लिए सॉफ्टवेयर सप्लाई चेन सुरक्षा।</h3>

<p align="center">
  कमजोरी स्कैनिंग, पैकेज विश्लेषण, उत्पत्ति सत्यापन, टाइपोस्क्वाटिंग पहचान, निर्भरता इंटेलिजेंस &mdash; npm, PyPI, crates.io, Go और अधिक के लिए एक ही MCP सर्वर में एकीकृत।<br>
  आपका AI एजेंट <b>मांग पर पूर्ण सप्लाई चेन सुरक्षा इंटेलिजेंस</b> प्राप्त करता है।
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="लाइसेंस"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 टूल">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 स्रोत">
</p>

---

## यह क्या है

**supply-chain-mcp-server** आपके AI एजेंट को [Model Context Protocol](https://modelcontextprotocol.io) के माध्यम से 21 डेटा स्रोतों से **90 टूल** प्रदान करता है। एजेंट पैकेज कमजोरियों को स्कैन करता है, निर्भरताओं का विश्लेषण करता है, सॉफ्टवेयर उत्पत्ति को सत्यापित करता है, टाइपोस्क्वाटिंग हमलों का पता लगाता है और एक एकीकृत सुरक्षा चित्र प्रस्तुत करता है &mdash; एक ही बातचीत में।

API कुंजियाँ वैकल्पिक हैं। कई स्रोत (OSV.dev, GHSA, EPSS, CISA KEV, npm, PyPI, crates.io, Go और अधिक) मुफ्त में काम करते हैं।

---

## त्वरित शुरुआत

### npx के साथ (इंस्टॉल की आवश्यकता नहीं)

```bash
npx supply-chain-mcp-server
```

### पर्यावरण चर (वैकल्पिक)

```bash
export GITHUB_TOKEN=your-token         # GHSA और Scorecard के लिए रेट लिमिट बढ़ाता है
export LIBRARIES_API_KEY=your-key      # Libraries.io निर्भरता इंटेलिजेंस सक्षम करता है
export NVD_API_KEY=your-key            # NVD CVE के लिए रेट लिमिट बढ़ाता है
```

### अपने AI एजेंट से कनेक्ट करें

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json` में जोड़ें:

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
<summary><b>Cursor / Windsurf / अन्य MCP क्लाइंट</b></summary>

वही JSON कॉन्फ़िगरेशन प्रारूप। कमांड को `npx supply-chain-mcp-server` या अपने स्थानीय इंस्टॉलेशन पथ पर इंगित करें।

</details>

---

## टूल सारांश (90 टूल, 21 स्रोत)

| श्रेणी | टूल संख्या | विवरण |
|--------|------------|--------|
| OSV.dev | कमजोरी क्वेरी | क्रॉस-इकोसिस्टम ओपन सोर्स कमजोरी डेटाबेस |
| GHSA | GitHub सलाह | GitHub सुरक्षा सलाह डेटाबेस |
| NVD | CVE खोज | NIST राष्ट्रीय कमजोरी डेटाबेस |
| EPSS | एक्सप्लॉइट संभावना स्कोर | एक्सप्लॉइट पूर्वानुमान स्कोरिंग प्रणाली |
| CISA KEV | ज्ञात शोषित कमजोरियाँ | CISA ज्ञात शोषित कमजोरी कैटलॉग |
| npm | पैकेज सुरक्षा | npm रजिस्ट्री सुरक्षा विश्लेषण |
| PyPI | पैकेज सुरक्षा | Python पैकेज इंडेक्स विश्लेषण |
| crates.io | पैकेज सुरक्षा | Rust पैकेज रजिस्ट्री विश्लेषण |
| RubyGems | पैकेज सुरक्षा | Ruby पैकेज रजिस्ट्री विश्लेषण |
| NuGet | पैकेज सुरक्षा | .NET पैकेज रजिस्ट्री विश्लेषण |
| Packagist | पैकेज सुरक्षा | PHP पैकेज रजिस्ट्री विश्लेषण |
| Go Proxy | पैकेज सुरक्षा | Go मॉड्यूल प्रॉक्सी विश्लेषण |
| Go Vuln DB | कमजोरी डेटाबेस | Go कमजोरी डेटाबेस |
| deps.dev | निर्भरता ग्राफ | Google ओपन सोर्स निर्भरता इंटेलिजेंस |
| Scorecard | परियोजना सुरक्षा | OpenSSF सुरक्षा स्कोरकार्ड |
| Best Practices | परियोजना सुरक्षा | OpenSSF सर्वोत्तम अभ्यास बैज |
| Libraries.io | निर्भरता इंटेलिजेंस | पैकेज निर्भरता और स्वास्थ्य मेट्रिक्स |
| ClearlyDefined | लाइसेंस विश्लेषण | लाइसेंस और कॉपीराइट स्पष्टता |
| Rekor | उत्पत्ति सत्यापन | Sigstore पारदर्शिता लॉग |
| Repology | पैकेज ट्रैकिंग | क्रॉस-वितरण पैकेज संस्करण ट्रैकिंग |
| Typosquat | टाइपोस्क्वाटिंग पहचान | पैकेज नाम टाइपोस्क्वाटिंग पहचान |

---

## डेटा स्रोत

| स्रोत | प्रमाणीकरण | क्या प्रदान करता है |
|-------|-------------|---------------------|
| [OSV.dev](https://osv.dev) | कोई नहीं | क्रॉस-इकोसिस्टम कमजोरी क्वेरी |
| [GitHub Advisory (GHSA)](https://github.com/advisories) | `GITHUB_TOKEN` वैकल्पिक | सुरक्षा सलाह और कमजोरी डेटा |
| [NVD](https://nvd.nist.gov) | `NVD_API_KEY` वैकल्पिक | CVE विवरण, CVSS स्कोर, CPE मैचिंग |
| [EPSS](https://www.first.org/epss) | कोई नहीं | एक्सप्लॉइट संभावना स्कोर |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | कोई नहीं | ज्ञात शोषित कमजोरी कैटलॉग |
| [npm](https://www.npmjs.com) | कोई नहीं | JavaScript पैकेज मेटाडेटा और सुरक्षा ऑडिट |
| [PyPI](https://pypi.org) | कोई नहीं | Python पैकेज मेटाडेटा और सुरक्षा जानकारी |
| [crates.io](https://crates.io) | कोई नहीं | Rust पैकेज मेटाडेटा और संस्करण जानकारी |
| [RubyGems](https://rubygems.org) | कोई नहीं | Ruby पैकेज मेटाडेटा |
| [NuGet](https://www.nuget.org) | कोई नहीं | .NET पैकेज मेटाडेटा |
| [Packagist](https://packagist.org) | कोई नहीं | PHP/Composer पैकेज मेटाडेटा |
| [Go Proxy](https://proxy.golang.org) | कोई नहीं | Go मॉड्यूल मेटाडेटा और संस्करण जानकारी |
| [Go Vuln DB](https://vuln.go.dev) | कोई नहीं | Go-विशिष्ट कमजोरी डेटाबेस |
| [deps.dev](https://deps.dev) | कोई नहीं | निर्भरता ग्राफ, सलाह मैचिंग |
| [OpenSSF Scorecard](https://securityscorecards.dev) | `GITHUB_TOKEN` वैकल्पिक | ओपन सोर्स परियोजना सुरक्षा स्कोर |
| [OpenSSF Best Practices](https://www.bestpractices.dev) | कोई नहीं | परियोजना परिपक्वता बैज |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | निर्भरता स्वास्थ्य, संस्करण ट्रैकिंग |
| [ClearlyDefined](https://clearlydefined.io) | कोई नहीं | लाइसेंस स्पष्टता और कॉपीराइट डेटा |
| [Rekor](https://rekor.sigstore.dev) | कोई नहीं | Sigstore पारदर्शिता लॉग, हस्ताक्षर सत्यापन |
| [Repology](https://repology.org) | कोई नहीं | क्रॉस-वितरण पैकेज संस्करण ट्रैकिंग |
| टाइपोस्क्वाट पहचान | कोई नहीं | पैकेज नाम टाइपोस्क्वाटिंग और निर्भरता भ्रम पहचान |

---

## MCP सुरक्षा सूट का हिस्सा

| परियोजना | क्षेत्र | टूल |
|----------|--------|------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | ब्राउज़र-आधारित सुरक्षा परीक्षण | 39 टूल |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | क्लाउड सुरक्षा (AWS/Azure/GCP) | 38 टूल |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub सुरक्षा स्थिति | 39 टूल |
| [cve-mcp](https://github.com/badchars/cve-mcp) | कमजोरी इंटेलिजेंस | 23 टूल |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT और टोही | 37 टूल |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | डार्क वेब और खतरा इंटेलिजेंस | 66 टूल |
| **supply-chain-mcp-server** | **सॉफ्टवेयर सप्लाई चेन सुरक्षा** | **90 टूल, 21 स्रोत** |

---

<p align="center">
<b>केवल अधिकृत सुरक्षा परीक्षण और मूल्यांकन के लिए।</b><br>
किसी भी लक्ष्य पर सुरक्षा विश्लेषण करने से पहले हमेशा सुनिश्चित करें कि आपके पास उचित प्राधिकरण है।
</p>

<p align="center">
  <a href="LICENSE">MIT लाइसेंस</a> &bull; Bun + TypeScript के साथ निर्मित
</p>
