$ErrorActionPreference = "Stop"

# Always build from the repository root, even when this script is launched
# with a relative path from another directory.
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoRoot

function Invoke-PnpmCommand {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    Write-Host "pnpm $($Arguments -join ' ')" -ForegroundColor Cyan
    & pnpm @Arguments

    if ($LASTEXITCODE -ne 0) {
        throw "pnpm command failed with exit code $LASTEXITCODE."
    }
}

Write-Host "Building Equinox installer..." -ForegroundColor Green

# The Electron bundle expects both of these dist directories to exist.
Invoke-PnpmCommand -Arguments @("--filter", "@workspace/api-server", "run", "build")
Invoke-PnpmCommand -Arguments @("--filter", "@workspace/dannys-bot", "run", "build")
Invoke-PnpmCommand -Arguments @("--filter", "@workspace/electron", "run", "build")

# Do not use the package.json 'package' script: it publishes automatically.
Invoke-PnpmCommand -Arguments @(
    "--filter",
    "@workspace/electron",
    "exec",
    "electron-builder",
    "--win",
    "--publish",
    "never"
)

$releaseDirectory = Join-Path $repoRoot "artifacts\electron\release"
$installer = Get-ChildItem -LiteralPath $releaseDirectory -Filter "*.exe" -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -notlike "*uninstaller*" } |
    Select-Object -First 1

if ($null -eq $installer) {
    throw "Installer build finished, but no .exe was found in $releaseDirectory."
}

Write-Host ""
Write-Host "Installer created:" -ForegroundColor Green
Write-Host $installer.FullName
Write-Host "Opening the installer directory..." -ForegroundColor Green

Start-Process -FilePath "explorer.exe" -ArgumentList $releaseDirectory