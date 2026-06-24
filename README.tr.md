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
  <strong>Türkçe</strong> |
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

<h3 align="center">Yapay zeka ajanlar&inodot; i&ccedil;in yaz&inodot;l&inodot;m tedarik zinciri g&uuml;venli&gbreve;i.</h3>

<p align="center">
  Zafiyet tarama, paket analizi, k&ouml;ken do&gbreve;rulama, typosquatting tespiti, ba&gbreve;&inodot;ml&inodot;l&inodot;k istihbarat&inodot; &mdash; npm, PyPI, crates.io, Go ve daha fazlas&inodot; i&ccedil;in tek bir MCP sunucusunda birle&scedil;tirildi.<br>
  Yapay zeka ajan&inodot;n&inodot;z <b>talep &uuml;zerine tam kapsaml&inodot; tedarik zinciri g&uuml;venlik istihbarat&inodot;</b> elde eder.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Lisans"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 Ara&ccedil;">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 Kaynak">
</p>

---

## Nedir

**supply-chain-mcp-server**, yapay zeka ajanlarına [Model Context Protocol](https://modelcontextprotocol.io) aracılığıyla 21 veri kaynağında **90 araç** sunar. Ajan, paket güvenlik açıklarını tarar, bağımlılıkları analiz eder, yazılım kökenini doğrular, typosquatting saldırılarını tespit eder ve birleştirilmiş bir güvenlik tablosu oluşturur &mdash; tek bir konuşmada.

API anahtarları isteğe bağlıdır. Birçok kaynak (OSV.dev, GHSA, EPSS, CISA KEV, npm, PyPI, crates.io, Go ve daha fazlası) ücretsiz çalışır.

---

## Hızlı Başlangıç

### npx ile (kurulum gerektirmez)

```bash
npx supply-chain-mcp-server
```

### Ortam değişkenleri (isteğe bağlı)

```bash
export GITHUB_TOKEN=your-token         # GHSA & Scorecard hız sınırlarını artırır
export LIBRARIES_API_KEY=your-key      # Libraries.io bağımlılık istihbaratını etkinleştirir
export NVD_API_KEY=your-key            # NVD CVE hız sınırlarını artırır
```

### Yapay zeka ajanınıza bağlayın

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

`~/Library/Application Support/Claude/claude_desktop_config.json` dosyasına ekleyin:

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
<summary><b>Cursor / Windsurf / diğer MCP istemcileri</b></summary>

Aynı JSON yapılandırma formatı. Komutu `npx supply-chain-mcp-server` veya yerel kurulum yolunuza yönlendirin.

</details>

---

## Araç Özeti (90 araç, 21 kaynak)

| Kategori | Araç Sayısı | Açıklama |
|----------|-------------|----------|
| OSV.dev | Zafiyet sorguları | Ekosistemler arası açık kaynak zafiyet veritabanı |
| GHSA | GitHub danışma belgeleri | GitHub güvenlik danışma veritabanı |
| NVD | CVE araması | NIST Ulusal Zafiyet Veritabanı |
| EPSS | Exploit olasılık puanı | Exploit tahmin puanlama sistemi |
| CISA KEV | Bilinen istismar edilen zafiyetler | CISA bilinen istismar edilen zafiyet kataloğu |
| npm | Paket güvenliği | npm kayıt defteri güvenlik analizi |
| PyPI | Paket güvenliği | Python paket endeksi analizi |
| crates.io | Paket güvenliği | Rust paket kayıt defteri analizi |
| RubyGems | Paket güvenliği | Ruby paket kayıt defteri analizi |
| NuGet | Paket güvenliği | .NET paket kayıt defteri analizi |
| Packagist | Paket güvenliği | PHP paket kayıt defteri analizi |
| Go Proxy | Paket güvenliği | Go modül proxy analizi |
| Go Vuln DB | Zafiyet veritabanı | Go zafiyet veritabanı |
| deps.dev | Bağımlılık grafiği | Google açık kaynak bağımlılık istihbaratı |
| Scorecard | Proje güvenliği | OpenSSF güvenlik puan kartı |
| Best Practices | Proje güvenliği | OpenSSF en iyi uygulama rozeti |
| Libraries.io | Bağımlılık istihbaratı | Paket bağımlılık ve sağlık metrikleri |
| ClearlyDefined | Lisans analizi | Lisans ve telif hakkı netliği |
| Rekor | Köken doğrulama | Sigstore şeffaflık günlüğü |
| Repology | Paket takibi | Dağıtımlar arası paket sürüm takibi |
| Typosquat | Typosquatting tespiti | Paket adı typosquatting algılama |

---

## Veri Kaynakları

| Kaynak | Kimlik Doğrulama | Sağladığı Veriler |
|--------|-------------------|-------------------|
| [OSV.dev](https://osv.dev) | Yok | Ekosistemler arası zafiyet sorguları |
| [GitHub Advisory (GHSA)](https://github.com/advisories) | `GITHUB_TOKEN` isteğe bağlı | Güvenlik danışma belgeleri ve zafiyet verileri |
| [NVD](https://nvd.nist.gov) | `NVD_API_KEY` isteğe bağlı | CVE detayları, CVSS puanları, CPE eşleştirme |
| [EPSS](https://www.first.org/epss) | Yok | Exploit olasılık puanları |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Yok | Bilinen istismar edilen zafiyet kataloğu |
| [npm](https://www.npmjs.com) | Yok | JavaScript paket meta verileri ve güvenlik denetimleri |
| [PyPI](https://pypi.org) | Yok | Python paket meta verileri ve güvenlik bilgileri |
| [crates.io](https://crates.io) | Yok | Rust paket meta verileri ve sürüm bilgileri |
| [RubyGems](https://rubygems.org) | Yok | Ruby paket meta verileri |
| [NuGet](https://www.nuget.org) | Yok | .NET paket meta verileri |
| [Packagist](https://packagist.org) | Yok | PHP/Composer paket meta verileri |
| [Go Proxy](https://proxy.golang.org) | Yok | Go modül meta verileri ve sürüm bilgileri |
| [Go Vuln DB](https://vuln.go.dev) | Yok | Go'ya özgü zafiyet veritabanı |
| [deps.dev](https://deps.dev) | Yok | Bağımlılık grafikleri, danışma belgesi eşleştirme |
| [OpenSSF Scorecard](https://securityscorecards.dev) | `GITHUB_TOKEN` isteğe bağlı | Açık kaynak proje güvenlik puanları |
| [OpenSSF Best Practices](https://www.bestpractices.dev) | Yok | Proje olgunluk rozeti |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Bağımlılık sağlığı, sürüm izleme |
| [ClearlyDefined](https://clearlydefined.io) | Yok | Lisans netliği ve telif hakkı verileri |
| [Rekor](https://rekor.sigstore.dev) | Yok | Sigstore şeffaflık günlüğü, imza doğrulama |
| [Repology](https://repology.org) | Yok | Dağıtımlar arası paket sürüm takibi |
| Typosquat Algılama | Yok | Paket adı typosquatting ve bağımlılık karışıklığı tespiti |

---

## MCP Güvenlik Paketinin Parçası

| Proje | Alan | Araçlar |
|-------|------|---------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Tarayıcı tabanlı güvenlik testi | 39 araç |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Bulut güvenliği (AWS/Azure/GCP) | 38 araç |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | GitHub güvenlik duruşu | 39 araç |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Zafiyet istihbaratı | 23 araç |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT ve keşif | 37 araç |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Karanlık ağ ve tehdit istihbaratı | 66 araç |
| **supply-chain-mcp-server** | **Yazılım tedarik zinciri güvenliği** | **90 araç, 21 kaynak** |

---

<p align="center">
<b>Yalnızca yetkili güvenlik testi ve değerlendirmesi içindir.</b><br>
Herhangi bir hedefe yönelik güvenlik analizi gerçekleştirmeden önce daima uygun yetkiye sahip olduğunuzdan emin olun.
</p>

<p align="center">
  <a href="LICENSE">MIT Lisansı</a> &bull; Bun + TypeScript ile geliştirilmiştir
</p>
