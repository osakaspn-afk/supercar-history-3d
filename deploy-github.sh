#!/usr/bin/env bash
# Shell Deployment Script for GitHub
set -e

REPO_NAME="${1:-supercar-history-3d}"
USERNAME="osakaspn-afk"

echo "=========================================="
echo " Supercar Archive 3D - GitHub Deployer    "
echo " Target: https://github.com/${USERNAME}/${REPO_NAME} "
echo "=========================================="

if [ ! -d ".git" ]; then
    echo "[1/4] Initializing Git repository..."
    git init
else
    echo "[1/4] Git repository already initialized."
fi

echo "[2/4] Staging files..."
git add .

echo "[3/4] Committing changes..."
git commit -m "feat: 3D interactive supercar history archive (Porsche, Nissan, Lamborghini, Toyota)" || true

echo "[4/4] Setting main branch & remote..."
git branch -M main
REMOTE_URL="https://github.com/${USERNAME}/${REPO_NAME}.git"

if git remote get-url origin > /dev/null 2>&1; then
    git remote set-url origin "$REMOTE_URL"
else
    git remote add origin "$REMOTE_URL"
fi

echo ""
echo "Ready to push! Run the following command:"
echo "git push -u origin main"
