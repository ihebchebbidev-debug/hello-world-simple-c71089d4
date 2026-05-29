#!/usr/bin/env bash
# Quick deployment script for Vercel
# Run this after pushing to GitHub to deploy your app

set -e

echo "🚀 Protection Landing - Vercel Deployment"
echo "========================================="
echo ""

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Node.js 20+ required (you have v$NODE_VERSION)"
    echo "Please upgrade Node.js at https://nodejs.org"
    exit 1
fi

echo "✓ Node.js version check passed ($(node -v))"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Build
echo "🔨 Building for production..."
npm run build
echo "✓ Build completed successfully"
echo ""

# Preview
echo "👀 Starting preview server..."
echo "   Open http://localhost:4173 in your browser"
echo "   Press Ctrl+C to stop"
echo ""
npm run preview
