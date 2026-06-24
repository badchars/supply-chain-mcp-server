<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <strong>Español</strong> |
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

<h3 align="center">Seguridad de la cadena de suministro de software para agentes de IA.</h3>

<p align="center">
  Escaneo de vulnerabilidades, analisis de paquetes, verificacion de procedencia, deteccion de typosquatting, inteligencia de dependencias &mdash; a traves de npm, PyPI, crates.io, Go y mas ecosistemas, unificado en un unico servidor MCP.<br>
  Su agente de IA obtiene <b>inteligencia completa de seguridad de cadena de suministro bajo demanda</b>, en lugar de alternar manualmente entre docenas de registros y bases de datos.
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

## Inicio rapido

### Opcion 1: npx (sin instalacion)

```bash
npx supply-chain-mcp-server
```

La mayoria de herramientas funcionan gratuitamente sin clave API. OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor y mas estan listos para usar.

### Opcion 2: Clonar

```bash
git clone https://github.com/badchars/supply-chain-mcp-server.git
cd supply-chain-mcp-server
bun install
```

### Variables de entorno (opcionales)

```bash
export GITHUB_TOKEN=your-token          # GHSA + Scorecard limites de tasa mas altos
export LIBRARIES_API_KEY=your-key       # Requerido para herramientas de Libraries.io
export NVD_API_KEY=your-key             # NVD 50 pet./30s (sin clave 5 pet./30s)
```

Todas las claves API son opcionales. Sin ellas, seguira teniendo acceso a OSV, deps.dev, npm, PyPI, crates.io, Go, Rekor, EPSS, KEV, Repology, deteccion de typosquatting y mas.

### Conectar a su agente de IA

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add supply-chain -- npx supply-chain-mcp-server
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Agregar a `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
<summary><b>Cursor / Windsurf / otros clientes MCP</b></summary>

Mismo formato de configuracion JSON. Apunte el comando a `npx supply-chain-mcp-server` o su ruta de instalacion local.

</details>

---

## Resumen de herramientas (93 herramientas, 21 fuentes de datos + 1 meta)

| Categoria | Herramientas | Descripcion |
|-----------|-------------|-------------|
| Vulnerabilidades OSV.dev | 5 | Base de datos de vulnerabilidades unificada |
| GitHub Advisory (GHSA) | 4 | Avisos de seguridad de GitHub |
| NIST NVD | 3 | Base de datos CVE de NIST |
| Prediccion de exploits EPSS | 4 | Puntuacion de probabilidad de explotacion |
| CISA KEV | 4 | Vulnerabilidades explotadas conocidas |
| Registro npm | 10 | Registro npm + procedencia + auditoria |
| PyPI | 4 | Indice de paquetes Python |
| crates.io | 4 | Registro de crates de Rust |
| RubyGems | 4 | Registro de gems de Ruby |
| NuGet | 4 | Registro de paquetes .NET |
| Packagist | 4 | Registro PHP/Composer |
| Go Vulnerability DB | 4 | Base de datos de vulnerabilidades Go |
| Go Proxy | 3 | Proxy de modulos Go + DB de checksums |
| deps.dev | 10 | Google Dependency Insights |
| OpenSSF Scorecard | 2 | Puntuacion de seguridad OpenSSF |
| OpenSSF Best Practices | 3 | Insignia de mejores practicas OpenSSF |
| Libraries.io | 4 | Inteligencia entre ecosistemas |
| ClearlyDefined | 3 | Datos de licencias y atribucion |
| Sigstore Rekor | 5 | Registro de transparencia Sigstore |
| Repology | 3 | Seguimiento de paquetes entre distribuciones |
| Deteccion de typosquatting | 2 | Deteccion de typosquatting integrada |
| Meta | 1 | Lista de fuentes de datos |

---

## Fuentes de datos (21)

| Fuente | Autenticacion | Datos proporcionados |
|--------|--------------|---------------------|
| [OSV.dev](https://osv.dev) | Ninguna | Base de datos de vulnerabilidades unificada (npm, PyPI, Go, crates.io, etc.) |
| [GitHub Advisory](https://github.com/advisories) | Opcional | Avisos de seguridad de GitHub (GHSA) |
| [NIST NVD](https://nvd.nist.gov) | Opcional | Detalles de vulnerabilidades CVE, coincidencia CPE |
| [EPSS](https://www.first.org/epss) | Ninguna | Puntuacion de probabilidad de explotacion |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Ninguna | Catalogo de vulnerabilidades explotadas conocidas |
| [npm](https://www.npmjs.com) | Ninguna | Metadatos de paquetes, versiones, procedencia, auditoria |
| [PyPI](https://pypi.org) | Ninguna | Metadatos y versiones de paquetes Python |
| [crates.io](https://crates.io) | Ninguna | Metadatos y versiones de crates de Rust |
| [RubyGems](https://rubygems.org) | Ninguna | Metadatos y versiones de gems de Ruby |
| [NuGet](https://www.nuget.org) | Ninguna | Metadatos y versiones de paquetes .NET |
| [Packagist](https://packagist.org) | Ninguna | Metadatos de paquetes PHP/Composer |
| [Go Vuln DB](https://vuln.go.dev) | Ninguna | Vulnerabilidades especificas de Go |
| [Go Proxy](https://proxy.golang.org) | Ninguna | Versiones de modulos Go y checksums |
| [deps.dev](https://deps.dev) | Ninguna | Grafo de dependencias, avisos, versiones |
| [OpenSSF Scorecard](https://scorecard.dev) | Opcional | Puntuaciones de seguridad para proyectos de codigo abierto |
| [OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org) | Ninguna | Estado de insignia CII Best Practices |
| [Libraries.io](https://libraries.io) | `LIBRARIES_API_KEY` | Inteligencia de dependencias entre ecosistemas |
| [ClearlyDefined](https://clearlydefined.io) | Ninguna | Datos de licencias y atribucion |
| [Sigstore Rekor](https://rekor.sigstore.dev) | Ninguna | Procedencia de compilacion y registro de transparencia de firmas |
| [Repology](https://repology.org) | Ninguna | Seguimiento de versiones de paquetes entre distribuciones |
| Deteccion de typosquatting | Ninguna | Analisis integrado de distancia de edicion + sustitucion de caracteres |

---

## Arquitectura

```
src/
  index.ts                # Punto de entrada CLI (--help, --list, servidor stdio)
  protocol/
    mcp-server.ts         # Configuracion del servidor MCP (transporte stdio)
    tools.ts              # Registro de herramientas — las 93 herramientas aqui
  types/
    index.ts              # Tipos compartidos (ToolDef, ToolContext, ToolResult)
  utils/
    rate-limiter.ts       # Limitador de tasa por proveedor
    cache.ts              # Cache TTL para respuestas API
  osv/                    # Herramientas OSV.dev (5)
  ghsa/                   # Herramientas GitHub Advisory (4)
  nvd/                    # Herramientas NIST NVD (3)
  epss/                   # Herramientas EPSS (4)
  kev/                    # Herramientas CISA KEV (4)
  npm/                    # Herramientas npm (10)
  pypi/                   # Herramientas PyPI (4)
  crates/                 # Herramientas crates.io (4)
  rubygems/               # Herramientas RubyGems (4)
  nuget/                  # Herramientas NuGet (4)
  packagist/              # Herramientas Packagist (4)
  govuln/                 # Herramientas Go Vuln DB (4)
  go/                     # Herramientas Go Proxy (3)
  depsdev/                # Herramientas deps.dev (10)
  scorecard/              # Herramientas OpenSSF Scorecard (2)
  badge/                  # Herramientas OpenSSF Best Practices (3)
  libraries/              # Herramientas Libraries.io (4)
  clearlydefined/         # Herramientas ClearlyDefined (3)
  rekor/                  # Herramientas Sigstore Rekor (5)
  repology/               # Herramientas Repology (3)
  typosquat/              # Herramientas de deteccion de typosquatting (2)
  meta/                   # Herramientas meta (1)
```

---

## Parte de la suite de seguridad MCP

| Proyecto | Dominio | Herramientas |
|----------|---------|-------------|
| [hackbrowser-mcp](https://github.com/badchars/hackbrowser-mcp) | Pruebas de seguridad basadas en navegador | 39 herramientas, Firefox, pruebas de inyeccion |
| [cloud-audit-mcp](https://github.com/badchars/cloud-audit-mcp) | Seguridad en la nube (AWS/Azure/GCP) | 38 herramientas, 60+ verificaciones |
| [github-security-mcp](https://github.com/badchars/github-security-mcp) | Postura de seguridad de GitHub | 39 herramientas, 45 verificaciones |
| [cve-mcp](https://github.com/badchars/cve-mcp) | Inteligencia de vulnerabilidades | 23 herramientas, 5 fuentes |
| [osint-mcp-server](https://github.com/badchars/osint-mcp-server) | OSINT y reconocimiento | 37 herramientas, 12 fuentes |
| [darknet-mcp-server](https://github.com/badchars/darknet-mcp-server) | Inteligencia de dark web y amenazas | 66 herramientas, 16 fuentes |
| **supply-chain-mcp-server** | **Seguridad de cadena de suministro de software** | **93 herramientas, 21 fuentes** |

---

<p align="center">
<b>Solo para pruebas y evaluaciones de seguridad autorizadas.</b><br>
Asegurese siempre de tener la autorizacion adecuada antes de realizar analisis de cadena de suministro.
</p>

<p align="center">
  <a href="LICENSE">Licencia MIT</a> &bull; Construido con Bun + TypeScript
</p>
