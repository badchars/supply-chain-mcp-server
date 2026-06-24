# supply-chain-mcp — Software Supply Chain Security MCP Server

## Overview
53-tool MCP server for software supply chain security: vulnerability scanning (OSV, GHSA, NVD), package analysis (npm, PyPI, crates.io, Go), provenance verification (Sigstore Rekor), dependency intelligence (deps.dev, Libraries.io), OpenSSF Scorecard, and typosquatting detection.

## Architecture
- **Runtime:** Bun 1.3.9+ (dev), Node.js (publish)
- **Dependencies:** @modelcontextprotocol/sdk, zod
- **Transport:** stdio only
- **Pattern:** Each provider in own directory under src/, tools registered in src/protocol/tools.ts

## Key Rules
- TypeScript strict mode, English code/comments
- Native `fetch()` for all HTTP APIs
- Every tool schema field must have `.describe()`
- API keys always optional — graceful error when missing
- Rate limiter + TTL cache per provider
- Import paths use `.js` extension (ESM)

## Providers (12)
osv, depsdev, scorecard, ghsa, nvd, npm, pypi, crates, go, libraries, rekor, typosquat

## Commands
```bash
bun install          # Install deps
bun run dev          # Dev mode (watch)
bun run build        # Build for npm
bun run src/index.ts --help   # CLI help
bun run src/index.ts --list   # List all tools
bun run src/index.ts --tool <name> '<json>'  # Run single tool
```
