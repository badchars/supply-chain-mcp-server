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
  <strong>Ελληνικά</strong> |
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

<h3 align="center">Ασφάλεια αλυσίδας εφοδιασμού λογισμικού για AI agents.</h3>

<p align="center">
  Σάρωση ευπαθειών, ανάλυση πακέτων, επαλήθευση προέλευσης, ανίχνευση typosquatting, πληροφορίες εξαρτήσεων &mdash; για npm, PyPI, crates.io, Go και πολλά άλλα σε έναν ενιαίο MCP server.<br>
  Ο AI agent σας αποκτά <b>πλήρη πληροφόρηση ασφάλειας αλυσίδας εφοδιασμού κατά παραγγελία</b>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/supply-chain-mcp-server"><img src="https://img.shields.io/npm/v/supply-chain-mcp-server.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Άδεια"></a>
  <img src="https://img.shields.io/badge/runtime-Bun-f472b6" alt="Bun">
  <img src="https://img.shields.io/badge/protocol-MCP-8b5cf6" alt="MCP">
  <img src="https://img.shields.io/badge/tools-90-ef4444" alt="90 Εργαλεία">
  <img src="https://img.shields.io/badge/sources-21-f97316" alt="21 Πηγές">
</p>

---

## Τι είναι

Ο **supply-chain-mcp-server** παρέχει στον AI agent σας **90 εργαλεία** από 21 πηγές δεδομένων μέσω του [Model Context Protocol](https://modelcontextprotocol.io). Ο agent σαρώνει ευπάθειες πακέτων, αναλύει εξαρτήσεις, επαληθεύει την προέλευση λογισμικού, ανιχνεύει επιθέσεις typosquatting και παρουσιάζει μια ενοποιημένη εικόνα ασφάλειας &mdash; σε μία μόνο συνομιλία.

Τα API keys είναι προαιρετικά. Πολλές πηγές (OSV.dev, GHSA, EPSS, CISA KEV, npm, PyPI, crates.io, Go και άλλα) λειτουργούν δωρεάν.

---

## Γρήγορη εκκίνηση

### Με npx (χωρίς εγκατάσταση)

```bash
npx supply-chain-mcp-server
```

### Μεταβλητές περιβάλλοντος (προαιρετικά)

```bash
export GITHUB_TOKEN=your-token         # Αυξάνει τα όρια ρυθμού για GHSA & Scorecard
export LIBRARIES_API_KEY=your-key      # Ενεργοποιεί πληροφορίες εξαρτήσεων Libraries.io
export NVD_API_KEY=your-key            # Αυξάνει τα όρια ρυθμού για NVD CVE
```

### Σύνδεση με τον AI agent σας

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Προσθέστε στο `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / άλλοι MCP clients</b></summary>

Ίδια μορφή JSON ρυθμίσεων. Κατευθύνετε την εντολή στο `npx supply-chain-mcp-server` ή στη διαδρομή τοπικής εγκατάστασης.

</details>

---

## Επισκόπηση εργαλείων (90 εργαλεία, 21 πηγές)

| Κατηγορία | Αριθμός εργαλείων | Περιγραφή |
|-----------|-------------------|-----------|
| OSV.dev | Ερωτήματα ευπαθειών | Βάση δεδομένων ευπαθειών ανοιχτού κώδικα πολλαπλών οικοσυστημάτων |
| GHSA | Συμβουλευτικά GitHub | Βάση δεδομένων συμβουλευτικών ασφαλείας GitHub |
| NVD | Αναζήτηση CVE | Εθνική Βάση Δεδομένων Ευπαθειών NIST |
| EPSS | Βαθμολογία πιθανότητας exploit | Σύστημα βαθμολόγησης πρόβλεψης exploit |
| CISA KEV | Γνωστές εκμεταλλευόμενες ευπάθειες | Κατάλογος γνωστών εκμεταλλευόμενων ευπαθειών CISA |
| npm | Ασφάλεια πακέτων | Ανάλυση ασφάλειας μητρώου npm |
| PyPI | Ασφάλεια πακέτων | Ανάλυση ευρετηρίου πακέτων Python |
| crates.io | Ασφάλεια πακέτων | Ανάλυση μητρώου πακέτων Rust |
| RubyGems | Ασφάλεια πακέτων | Ανάλυση μητρώου πακέτων Ruby |
| NuGet | Ασφάλεια πακέτων | Ανάλυση μητρώου πακέτων .NET |
| Packagist | Ασφάλεια πακέτων | Ανάλυση μητρώου πακέτων PHP |
| Go Proxy | Ασφάλεια πακέτων | Ανάλυση Go module proxy |
| Go Vuln DB | Βάση ευπαθειών | Βάση δεδομένων ευπαθειών Go |
| deps.dev | Γράφος εξαρτήσεων | Google πληροφορίες εξαρτήσεων ανοιχτού κώδικα |
| Scorecard | Ασφάλεια έργου | Κάρτα ασφαλείας OpenSSF |
| Best Practices | Ασφάλεια έργου | Σήμα βέλτιστων πρακτικών OpenSSF |
| Libraries.io | Πληροφορίες εξαρτήσεων | Μετρικές υγείας πακέτων και εξαρτήσεων |
| ClearlyDefined | Ανάλυση αδειών | Σαφήνεια αδειών και πνευματικών δικαιωμάτων |
| Rekor | Επαλήθευση προέλευσης | Ημερολόγιο διαφάνειας Sigstore |
| Repology | Παρακολούθηση πακέτων | Παρακολούθηση εκδόσεων πακέτων σε διανομές |
| Typosquat | Ανίχνευση typosquatting | Ανίχνευση typosquatting ονομάτων πακέτων |

---

## Πηγές δεδομένων

| Πηγή | Πιστοποίηση | Τι παρέχει |
|------|-------------|------------|
| [OSV.dev](https://osv.dev) | Καμία | Ερωτήματα ευπαθειών πολλαπλών οικοσυστημάτων |
| [GitHub Advisory (GHSA)](https://github.com/advisories) | `GITHUB_TOKEN` προαιρετικό | Συμβουλευτικά ασφαλείας και δεδομένα ευπαθειών |
| [NVD](https://nvd.nist.gov) | `NVD_API_KEY` προαιρετικό | Λεπτομέρειες CVE, βαθμολογίες CVSS, αντιστοίχιση CPE |
| [EPSS](https://www.first.org/epss) | Καμία | Βαθμολογίες πιθανότητας exploit |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Καμία | Κατάλογος γνωστών εκμεταλλευόμενων ευπαθειών |
| [npm](https://www.npmjs.com) | Καμία | Μεταδεδομένα πακέτων JavaScript και έλεγχος ασφάλειας |
| [PyPI](https://pypi.org) | Καμία | Μεταδεδομένα πακέτων Python και πληροφορίες ασφάλειας |
| [crates.io](https://crates.io) | Καμία | Μεταδεδομένα πακέτων Rust και πληροφορίες εκδόσεων |
| [RubyGems](https://rubygems.org) | Καμία | Μεταδεδομένα πακέτων Ruby |
| [NuGet](https://www.nuget.org) | Καμία | Μεταδεδομένα πακέτων .NET |
| [Packagist](https://packagist.org) | Καμία | Μεταδεδομένα πακέτων PHP/Composer |
| [Go Proxy](https://proxy.golang.org) | Καμία | Μεταδεδομένα Go modules και πληροφορίες εκδόσεων |
| [Go Vuln DB](https://vuln.go.dev) | Καμία | Βάση δεδομένων ευπαθειών ειδικά για Go |
| [deps.dev](https://deps.dev) | Καμία | Γράφοι εξαρτήσεων, αντιστοίχιση συμβουλευτικών |
| [OpenSSF Scorecard](https://securityscorecards.dev) | `GITHUB_TOKEN` προαιρετικό | Βαθμολογίες ασφάλειας έργων ανοιχτού κώδικα |
| [OpenSSF Best Practices](https://www.bestpractices.dev) | Καμία | Σήμα ωριμότητας έργου |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Υγεία εξαρτήσεων, παρακολούθηση εκδόσεων |
| [ClearlyDefined](https://clearlydefined.io) | Καμία | Σαφήνεια αδειών και δεδομένα πνευματικών δικαιωμάτων |
| [Rekor](https://rekor.sigstore.dev) | Καμία | Ημερολόγιο διαφάνειας Sigstore, επαλήθευση υπογραφών |
| [Repology](https://repology.org) | Καμία | Παρακολούθηση εκδόσεων πακέτων σε διανομές |
| Ανίχνευση Typosquatting | Καμία | Ανίχνευση typosquatting ονομάτων πακέτων και σύγχυσης εξαρτήσεων |

---

## Μέρος της σουίτας ασφάλειας MCP

| Έργο | Τομέας | Εργαλεία |
|------|--------|----------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Δοκιμές ασφάλειας μέσω browser | 39 εργαλεία |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Ασφάλεια cloud (AWS/Azure/GCP) | 38 εργαλεία |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Στάση ασφάλειας GitHub | 39 εργαλεία |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Πληροφορίες ευπαθειών | 23 εργαλεία |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT & αναγνώριση | 37 εργαλεία |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Dark web & πληροφορίες απειλών | 66 εργαλεία |
| **supply-chain-mcp-server** | **Ασφάλεια αλυσίδας εφοδιασμού λογισμικού** | **90 εργαλεία, 21 πηγές** |

---

<p align="center">
<b>Μόνο για εξουσιοδοτημένες δοκιμές και αξιολόγηση ασφάλειας.</b><br>
Πάντα βεβαιώνεστε ότι έχετε την κατάλληλη εξουσιοδότηση πριν πραγματοποιήσετε ανάλυση ασφάλειας σε οποιονδήποτε στόχο.
</p>

<p align="center">
  <a href="LICENSE">Άδεια MIT</a> &bull; Κατασκευασμένο με Bun + TypeScript
</p>
