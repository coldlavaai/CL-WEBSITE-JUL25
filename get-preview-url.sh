#!/bin/bash
# Helper script to get Vercel preview URL with bypass token

source ~/.claude_credentials

# Get the latest deployment URL from git branch
BRANCH=$(git branch --show-current)
BASE_URL="https://cl-website-jul25-git-${BRANCH}-olivers-projects-a3cbd2e0.vercel.app"

# Construct full URL with bypass token
FULL_URL="${BASE_URL}?x-vercel-protection-bypass=${VERCEL_BYPASS_SECRET}"

echo "Preview URL with bypass token:"
echo "$FULL_URL"

# Copy to clipboard (macOS)
echo "$FULL_URL" | pbcopy
echo ""
echo "✓ URL copied to clipboard!"
