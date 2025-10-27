#!/bin/bash

# Script untuk rebuild aplikasi Gophish Frontend
# Usage: ./rebuild.sh [--no-cache]

set -e

echo "🔄 Rebuilding Gophish Frontend..."

# Check if --no-cache flag is set
NO_CACHE=""
if [[ "$1" == "--no-cache" ]]; then
    NO_CACHE="--no-cache"
    echo "⚠️  Building without cache..."
fi

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Remove old images (optional, uncomment if needed)
# docker rmi gophish-frontend gophish-fe_gophish-fe || true

# Rebuild image
echo "🔨 Building Docker image..."
docker-compose build $NO_CACHE

# Start container
echo "🚀 Starting container..."
docker-compose up -d

echo "✅ Rebuild complete!"
echo ""
echo "📊 Container status:"
docker-compose ps

echo ""
echo "📋 Container logs:"
docker-compose logs --tail=20

echo ""
echo "🌐 Access your app at: http://localhost:3000"

