#!/bin/bash

# Offline Deployment Preparation Script
# Run this on a machine WITH internet to prepare for offline deployment

echo "🌐 Preparing Offline Deployment Package"
echo "======================================"

# Create deployment directory
DEPLOY_DIR="smile-insurance-offline-deploy"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

echo "📦 Installing dependencies..."
# Install all dependencies
npm install

# Bundle node_modules
echo "📁 Copying project files..."
cp -r . $DEPLOY_DIR/
cd $DEPLOY_DIR

# Remove unnecessary files to reduce size
echo "🧹 Cleaning up unnecessary files..."
rm -rf .git
rm -rf .next
rm -rf *.log
rm -rf .env.local
rm -rf .env.development

# Create offline package
echo "📦 Creating deployment package..."
cd ..
tar -czf smile-insurance-offline.tar.gz $DEPLOY_DIR/

echo "✅ Offline deployment package created!"
echo ""
echo "📋 Next steps:"
echo "1. Copy 'smile-insurance-offline.tar.gz' to your Windows Server"
echo "2. Extract: tar -xzf smile-insurance-offline.tar.gz"
echo "3. Run: npm run build"
echo "4. Run: npm start"
echo ""
echo "Package size: $(du -h smile-insurance-offline.tar.gz | cut -f1)"
