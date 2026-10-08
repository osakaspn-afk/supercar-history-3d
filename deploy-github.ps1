# PowerShell Deployment Script for GitHub
param(
    [string]$RepoName = "supercar-history-3d",
    [string]$Username = "osakaspn-afk"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Supercar Archive 3D - GitHub Deployer    " -ForegroundColor Yellow
Write-Host " Target: https://github.com/$Username/$RepoName " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Initialize git if not already
if (-not (Test-Path ".git")) {
    Write-Host "[1/4] Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[1/4] Git repository already initialized." -ForegroundColor Green
}

# 2. Stage all files
Write-Host "[2/4] Staging files..." -ForegroundColor Yellow
git add .

# 3. Commit
Write-Host "[3/4] Committing changes..." -ForegroundColor Yellow
git commit -m "feat: 3D interactive supercar history archive (Porsche, Nissan, Lamborghini, Toyota)"

# 4. Set branch and remote
Write-Host "[4/4] Setting main branch & remote..." -ForegroundColor Yellow
git branch -M main

$remoteUrl = "https://github.com/$Username/$RepoName.git"
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    git remote set-url origin $remoteUrl
} else {
    git remote add origin $remoteUrl
}

Write-Host "`nReady to push! Run the following command to push to GitHub:" -ForegroundColor Green
Write-Host "git push -u origin main" -ForegroundColor Cyan
