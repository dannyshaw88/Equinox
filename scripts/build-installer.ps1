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

    if ($null -ne $windowsRollupPackage -and $null -ne $rollupPackageDirectory) {
        $windowsRollupTarget = Join-Path `
            $windowsRollupPackage.FullName `
            "node_modules\@rollup\rollup-win32-x64-msvc"
        $rollupDependencyDirectory = Join-Path `
            $rollupPackageDirectory.FullName `
            "node_modules\@rollup"

        if (Test-Path -LiteralPath $windowsRollupTarget) {
            New-Item -ItemType Directory -Path $rollupDependencyDirectory -Force | Out-Null

            if (-not (Test-Path -LiteralPath $windowsRollupLink)) {
                Write-Host "Repairing Rollup Windows native-package link..." -ForegroundColor DarkYellow
                New-Item `
                    -ItemType Junction `
                    -Path $windowsRollupLink `
                    -Target $windowsRollupTarget | Out-Null
            }
        }
    }

    if ($null -eq $windowsRollupPackage -or
        $null -eq $windowsRollupLink -or
        -not (Test-Path -LiteralPath $windowsRollupLink)) {
        throw "pnpm installed the Rollup package but did not link it into Rollup's virtual store."
    }

    $windowsLightningPackage = Get-ChildItem `
        -LiteralPath $pnpmStoreDirectory `
        -Directory `
        -Filter "lightningcss-win32-x64-msvc@*" `
        -ErrorAction SilentlyContinue |
        Select-Object -First 1
    $lightningcssPackageDirectory = Get-ChildItem `
        -LiteralPath $pnpmStoreDirectory `
        -Directory `
        -Filter "lightningcss@*" `
        -ErrorAction SilentlyContinue |
        Where-Object {
            Test-Path -LiteralPath (Join-Path $_.FullName "node_modules\lightningcss\node\index.js")
        } |
        Select-Object -First 1
    $windowsLightningLink = if ($null -ne $lightningcssPackageDirectory) {
        Join-Path $lightningcssPackageDirectory.FullName "node_modules\lightningcss-win32-x64-msvc"
    } else {
        $null
    }

    if ($null -ne $windowsLightningPackage -and $null -ne $lightningcssPackageDirectory) {
        $windowsLightningTarget = Join-Path `
            $windowsLightningPackage.FullName `
            "node_modules\lightningcss-win32-x64-msvc"

        if ((Test-Path -LiteralPath $windowsLightningTarget) -and
            -not (Test-Path -LiteralPath $windowsLightningLink)) {
            Write-Host "Repairing Lightning CSS Windows native-package link..." -ForegroundColor DarkYellow
            New-Item `
                -ItemType Junction `
                -Path $windowsLightningLink `
                -Target $windowsLightningTarget | Out-Null
        }
    }

    if ($null -eq $windowsLightningPackage -or
        $null -eq $windowsLightningLink -or
        -not (Test-Path -LiteralPath $windowsLightningLink)) {
        throw "pnpm installed the Lightning CSS package but did not link it into Lightning CSS's virtual store."
    }
}

# The Electron bundle expects both of these dist directories to exist.
Invoke-PnpmCommand -Arguments @("--filter", "@workspace/api-server", "run", "build")
Invoke-PnpmCommand -Arguments @("--filter", "@workspace/dannys-bot", "run", "build")
Invoke-PnpmCommand -Arguments @("--filter", "@workspace/electron", "run", "build")

$electronProjectDirectory = Join-Path $repoRoot "artifacts\electron"
$electronEntryPoint = Join-Path $electronProjectDirectory "dist\main.js"
if (-not (Test-Path -LiteralPath $electronEntryPoint -PathType Leaf)) {
    throw "Electron build completed without producing the expected entry file: $electronEntryPoint"
}
$nsisIncludeFile = Join-Path $electronProjectDirectory "build\installer.nsh"
if (-not (Test-Path -LiteralPath $nsisIncludeFile -PathType Leaf)) {
    throw "Electron packaging requires the NSIS include file, but it is missing: $nsisIncludeFile"
}

# Do not use the package.json 'package' script: it publishes automatically.
Invoke-PnpmCommand -Arguments @(
    "--filter",
    "@workspace/electron",
    "exec",
    "electron-builder",
    "--projectDir",
    $electronProjectDirectory,
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