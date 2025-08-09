#!/bin/bash

# Script to help set up Vercel secrets for GitHub Actions

echo "🔧 Setting up Vercel secrets for GitHub Actions deployment"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   npm install -g vercel"
    exit 1
fi

echo "📋 Steps to set up Vercel secrets:"
echo ""
echo "1. 🔗 Link your project to Vercel (if not already done):"
echo "   npx vercel link"
echo ""
echo "2. 🎫 Create a Vercel token:"
echo "   - Go to https://vercel.com/account/tokens"
echo "   - Click 'Create Token'"
echo "   - Give it a name (e.g., 'GitHub Actions')"
echo "   - Copy the token"
echo ""
echo "3. 🔐 Add secrets to GitHub:"
echo "   - Go to your GitHub repository"
echo "   - Click Settings → Secrets and variables → Actions"
echo "   - Add the following secrets:"
echo "     - VERCEL_TOKEN: [your token from step 2]"
echo "     - VERCEL_ORG_ID: [from .vercel/project.json]"
echo "     - VERCEL_PROJECT_ID: [from .vercel/project.json]"
echo ""
echo "4. ✅ Test the setup:"
echo "   - Make a small change and push to main/master"
echo "   - Check the Actions tab to see if deployment works"
echo ""
echo "📁 Your .vercel/project.json should contain:"
if [ -f ".vercel/project.json" ]; then
    cat .vercel/project.json
else
    echo "   Project not linked yet. Run 'npx vercel link' first."
fi
echo ""
echo "🎯 Once set up, every push to main/master will:"
echo "   - Run all tests"
echo "   - Run linting"
echo "   - Build the application"
echo "   - Deploy to Vercel (if tests pass)"
echo "" 