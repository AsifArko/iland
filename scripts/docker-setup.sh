#!/bin/bash

# iland Docker Setup Script
# This script helps you quickly set up and run iland with Docker

set -e

echo "🐳 iland Docker Setup"
echo "====================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    echo "   Visit: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "✅ Docker is installed and running"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    if [ -f env.example ]; then
        cp env.example .env.local
        echo "✅ Created .env.local from env.example"
        echo "📝 Please edit .env.local with your configuration before continuing"
        echo "   Required variables:"
        echo "   - STRIPE_SECRET_KEY"
        echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
        echo "   - NEXT_PUBLIC_STRIPE_PRICE_ID"
        echo "   - STRIPE_WEBHOOK_SECRET"
        echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID"
        echo "   - SANITY_API_TOKEN"
        echo "   - GITHUB_PERSONAL_ACCESS_TOKEN"
        echo "   - SMTP_HOST, SMTP_USER, SMTP_PASS"
        echo "   - DOWNLOAD_SECRET_KEY"
        echo ""
        echo "Press Enter when you've configured .env.local..."
        read
    else
        echo "❌ env.example not found. Please create .env.local manually."
        exit 1
    fi
else
    echo "✅ .env.local found"
fi

# Function to run development environment
run_dev() {
    echo "🚀 Starting development environment..."
    docker-compose -f docker-compose.dev.yml up --build
}

# Function to run production environment
run_prod() {
    echo "🚀 Starting production environment..."
    docker-compose up --build
}

# Function to stop all containers
stop_all() {
    echo "🛑 Stopping all containers..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    echo "✅ All containers stopped"
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up Docker resources..."
    docker system prune -f
    echo "✅ Cleanup complete"
}

# Function to show logs
show_logs() {
    echo "📋 Showing logs..."
    docker-compose logs -f
}

# Function to show development logs
show_dev_logs() {
    echo "📋 Showing development logs..."
    docker-compose -f docker-compose.dev.yml logs -f
}

# Main menu
while true; do
    echo ""
    echo "Choose an option:"
    echo "1) Start development environment (hot reload)"
    echo "2) Start production environment"
    echo "3) Stop all containers"
    echo "4) Show production logs"
    echo "5) Show development logs"
    echo "6) Clean up Docker resources"
    echo "7) Exit"
    echo ""
    read -p "Enter your choice (1-7): " choice

    case $choice in
        1)
            run_dev
            ;;
        2)
            run_prod
            ;;
        3)
            stop_all
            ;;
        4)
            show_logs
            ;;
        5)
            show_dev_logs
            ;;
        6)
            cleanup
            ;;
        7)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Please enter a number between 1-7."
            ;;
    esac
done 