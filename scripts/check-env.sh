#!/bin/bash

# Environment Variable Check Script for iland Docker
# This script helps verify that all required environment variables are properly set

set -e

echo "🔍 iland Environment Variable Check"
echo "==================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if variable is set
check_var() {
    local var_name=$1
    local var_value=${!var_name}
    
    if [ -z "$var_value" ]; then
        echo -e "${RED}❌ $var_name is not set${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $var_name is set${NC}"
        return 0
    fi
}

# Function to check if variable is set in .env.local
check_env_file() {
    local var_name=$1
    local env_file=".env.local"
    
    if [ -f "$env_file" ]; then
        if grep -q "^$var_name=" "$env_file"; then
            echo -e "${GREEN}✅ $var_name found in $env_file${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠️  $var_name not found in $env_file${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ $env_file not found${NC}"
        return 1
    fi
}

# Required environment variables
required_vars=(
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "NEXT_PUBLIC_STRIPE_PRICE_ID"
    "STRIPE_WEBHOOK_SECRET"
    "NEXT_PUBLIC_SANITY_PROJECT_ID"
    "SANITY_API_TOKEN"
    "GITHUB_PERSONAL_ACCESS_TOKEN"
    "SMTP_HOST"
    "SMTP_USER"
    "SMTP_PASS"
    "DOWNLOAD_SECRET_KEY"
)

# Optional environment variables
optional_vars=(
    "NEXT_PUBLIC_SANITY_DATASET"
    "NEXT_PUBLIC_BASE_URL"
    "CONTACT_EMAIL"
    "SMTP_PORT"
)

echo "Checking environment variables..."
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local file found${NC}"
else
    echo -e "${RED}❌ .env.local file not found${NC}"
    echo "Please create .env.local from env.example"
    exit 1
fi

echo ""
echo "Checking required environment variables:"
echo "======================================="

missing_required=0
for var in "${required_vars[@]}"; do
    if ! check_env_file "$var"; then
        missing_required=$((missing_required + 1))
    fi
done

echo ""
echo "Checking optional environment variables:"
echo "======================================="

missing_optional=0
for var in "${optional_vars[@]}"; do
    if ! check_env_file "$var"; then
        missing_optional=$((missing_optional + 1))
    fi
done

echo ""
echo "Summary:"
echo "========"

if [ $missing_required -eq 0 ]; then
    echo -e "${GREEN}✅ All required environment variables are configured${NC}"
else
    echo -e "${RED}❌ $missing_required required environment variables are missing${NC}"
fi

if [ $missing_optional -eq 0 ]; then
    echo -e "${GREEN}✅ All optional environment variables are configured${NC}"
else
    echo -e "${YELLOW}⚠️  $missing_optional optional environment variables are missing${NC}"
fi

echo ""
echo "Docker Environment Check:"
echo "========================"

# Check if Docker is running
if docker info &> /dev/null; then
    echo -e "${GREEN}✅ Docker is running${NC}"
    
    # Check if containers are running
    if docker ps | grep -q "iland"; then
  echo -e "${GREEN}✅ iland container is running${NC}"
        
        # Check environment variables in container
        echo ""
        echo "Environment variables in container:"
        echo "=================================="
        
        # Check a few key variables in the container
        container_vars=("STRIPE_SECRET_KEY" "SANITY_API_TOKEN" "SMTP_HOST")
        for var in "${container_vars[@]}"; do
            if docker exec iland printenv "$var" &> /dev/null; then
                echo -e "${GREEN}✅ $var is set in container${NC}"
            else
                echo -e "${RED}❌ $var is not set in container${NC}"
            fi
        done
    else
        echo -e "${YELLOW}⚠️  iland container is not running${NC}"
        echo "Run 'docker-compose up --build' to start the container"
    fi
else
    echo -e "${RED}❌ Docker is not running${NC}"
fi

echo ""
echo "Next Steps:"
echo "==========="

if [ $missing_required -gt 0 ]; then
    echo "1. Add missing required environment variables to .env.local"
    echo "2. Restart Docker containers: docker-compose down && docker-compose up --build"
else
    echo "1. Your environment is properly configured!"
    echo "2. Run 'docker-compose up --build' to start the application"
fi

echo ""
echo "For detailed Docker instructions, see DOCKER_README.md" 