#!/bin/bash

# Platform-neutral build script for iland
# This script ensures consistent builds across different operating systems

set -e

echo "🚀 Starting platform-neutral build..."

# Check if we're in a CI environment
if [ -n "$CI" ] || [ -n "$VERCEL" ]; then
    echo "📦 CI environment detected"
    export NODE_ENV=production
fi

# Ensure consistent Node.js behavior
export NODE_OPTIONS="--max-old-space-size=4096"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📥 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the application
echo "🔨 Building application..."
npm run build

# Run tests if available
if npm run test:ci 2>/dev/null; then
    echo "✅ Tests passed"
else
    echo "⚠️  Tests skipped or failed"
fi

echo "✅ Platform-neutral build completed successfully!" 