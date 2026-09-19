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

# Remove stale pnpm virtual-store links from the root and workspace packages.
# A previous install can retain an old virtual lockfile that omits Rollup's
# Windows native optional package, even after pnpm-lock.yaml is corrected.
$nodeModulesDirectories = @(
    Join-Path $repoRoot "node_modules"
)

foreach ($workspaceDirectoryName in @("artifacts", "lib", "scripts")) {
    $workspaceDirectory = Join-Path $repoRoot $workspaceDirectoryName
    if (Test-Path -LiteralPath $workspaceDirectory) {
        $nodeModulesDirectories += Get-ChildItem `
            -LiteralPath $workspaceDirectory `
            -Directory `
            -Force `
            -ErrorAction SilentlyContinue |
            ForEach-Object {
                Join-Path $_.FullName "node_modules"
            }
    }
}

foreach ($nodeModulesDirectory in ($nodeModulesDirectories | Sort-Object { $_.Length } -Descending)) {
    if (Test-Path -LiteralPath $nodeModulesDirectory) {
        Write-Host "Removing stale dependency links: $nodeModulesDirectory" -ForegroundColor DarkYellow
        Remove-Item -LiteralPath $nodeModulesDirectory -Recurse -Force
    }
}

# A fresh Windows checkout may have the repository files but no complete
# workspace dependency links. Force pnpm to install platform-specific optional
# packages too.
Invoke-PnpmCommand -Arguments @("install", "--force", "--no-frozen-lockfile")

if ($env:OS -eq "Windows_NT") {
    $pnpmStoreDirectory = Join-Path $repoRoot "node_modules\.pnpm"
    $windowsRollupPackage = Get-ChildItem `
        -LiteralPath $pnpmStoreDirectory `
        -Directory `
        -Filter "@rollup+rollup-win32-x64-msvc@*" `
        -ErrorAction SilentlyContinue |
        Select-Object -First 1
    $rollupPackageDirectory = Get-ChildItem `
        -LiteralPath $pnpmStoreDirectory `
        -Directory `
        -Filter "rollup@*" `
        -ErrorAction SilentlyContinue |
        Where-Object {
            Test-Path -LiteralPath (Join-Path $_.FullName "node_modules\rollup\dist\native.js")
        } |
        Select-Object -First 1
    $windowsRollupLink = if ($null -ne $rollupPackageDirectory) {
        Join-Path $rollupPackageDirectory.FullName "node_modules\@rollup\rollup-win32-x64-msvc"
    } else {
        $null
    }

    if ($null -eq $windowsRollupPackage -or $null -eq $windowsRollupLink -or -not (Test-Path -LiteralPath $windowsRollupLink)) {
        throw "pnpm install completed, but @rollup/rollup-win32-x64-msvc is not linked into Rollup. Remove any package-lock.json in the repository and rerun this script."
    }
}

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