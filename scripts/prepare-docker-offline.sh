#!/bin/bash

# Docker Offline Deployment Preparation
# Run this on a machine WITH internet

echo "🐳 Preparing Docker Offline Deployment"
echo "======================================"

# Build Docker images
echo "📦 Building Docker images..."
docker compose build

# Save images to tar files
echo "💾 Saving Docker images..."
mkdir -p docker-images

# Save each image
docker save smile-insurance-web:latest > docker-images/smile-web.tar
docker save postgres:15 > docker-images/postgres.tar
docker save redis:7-alpine > docker-images/redis.tar
docker save nginx:alpine > docker-images/nginx.tar

# Create deployment package
echo "📁 Creating deployment package..."
tar -czf smile-docker-offline.tar.gz docker-compose.yml nginx.conf .env.docker docker-images/

echo "✅ Docker offline package created!"
echo ""
echo "📋 For Windows Server deployment:"
echo "1. Install Docker Desktop on Windows Server"
echo "2. Copy 'smile-docker-offline.tar.gz' to server"
echo "3. Extract and run 'deploy-docker-windows.bat'"
echo ""
echo "Package includes:"
echo "- All Docker images (no internet needed)"
echo "- Configuration files"
echo "- Deployment scripts"
