# VHS Demo — supply-chain-mcp-server
Output .github/demo.gif

Set Shell "bash"
Set FontSize 14
Set Width 1000
Set Height 600
Set Theme "Catppuccin Mocha"
Set Padding 20
Set TypingSpeed 30ms

# Show help
Type `npx -y supply-chain-mcp-server --help`
Sleep 300ms
Enter
Sleep 6s

# Run EPSS score for the famous xz backdoor
Type `npx -y supply-chain-mcp-server --tool epss_score '{"cve_id":"CVE-2024-3094"}'`
Sleep 300ms
Enter
Sleep 6s

# Check CISA KEV for a known exploited vulnerability
Type `npx -y supply-chain-mcp-server --tool kev_lookup '{"cve_id":"CVE-2024-3094"}'`
Sleep 300ms
Enter
Sleep 6s

# Get npm package info
Type `npx -y supply-chain-mcp-server --tool npm_package '{"name":"express"}'`
Sleep 300ms
Enter
Sleep 6s

Sleep 2s
