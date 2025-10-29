#!/bin/bash

# Gophish Frontend Deployment Script
# Script untuk deploy aplikasi ke VPS

set -e

echo "🚀 Starting deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check environment
read -p "📋 Environment (dev/prod) [dev]: " ENV
ENV=${ENV:-dev}

if [ "$ENV" = "prod" ]; then
    echo "🏭 Production deployment"
    COMPOSE_FILE="docker-compose.prod.yml"
else
    echo "🔧 Development deployment"
    COMPOSE_FILE="docker-compose.yml"
fi

# Ask for action
echo ""
echo "What do you want to do?"
echo "1) Build and start"
echo "2) Rebuild and restart"
echo "3) Stop"
echo "4) View logs"
echo "5) Exit"

read -p "Enter choice [1]: " choice
choice=${choice:-1}

case $choice in
    1)
        echo "🔨 Building and starting containers..."
        docker-compose -f $COMPOSE_FILE up -d --build
        echo "✅ Deployment complete!"
        echo "🌐 Access your app at: http://localhost:3000"
        ;;
    2)
        echo "🔄 Rebuilding and restarting..."
        docker-compose -f $COMPOSE_FILE down
        docker-compose -f $COMPOSE_FILE up -d --build
        echo "✅ Redeployment complete!"
        ;;
    3)
        echo "🛑 Stopping containers..."
        docker-compose -f $COMPOSE_FILE down
        echo "✅ Containers stopped!"
        ;;
    4)
        echo "📋 Viewing logs..."
        docker-compose -f $COMPOSE_FILE logs -f
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📊 Container status:"
docker-compose -f $COMPOSE_FILE ps


