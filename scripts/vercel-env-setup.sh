#!/bin/bash

# Vercel Environment Setup Script
# This script helps you set up environment variables for different Vercel environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Check if Vercel CLI is installed
check_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI is not installed. Please install it first:"
        echo "npm i -g vercel"
        exit 1
    fi
}

# Check if user is logged in to Vercel
check_vercel_auth() {
    if ! vercel whoami &> /dev/null; then
        print_error "You are not logged in to Vercel. Please login first:"
        echo "vercel login"
        exit 1
    fi
}

# Function to add environment variable to Vercel
add_env_var() {
    local env_name=$1
    local env_value=$2
    local environment=$3
    
    print_status "Adding $env_name to $environment environment..."
    
    if [ "$environment" = "production" ]; then
        vercel env add "$env_name" production
    elif [ "$environment" = "preview" ]; then
        vercel env add "$env_name" preview
    else
        vercel env add "$env_name"
    fi
    
    print_status "Set the value for $env_name in the $environment environment"
}

# Function to list current environment variables
list_env_vars() {
    print_header "Current Environment Variables"
    vercel env ls
}

# Function to pull environment variables
pull_env_vars() {
    print_header "Pulling Environment Variables"
    vercel env pull .env.local
    print_status "Environment variables pulled to .env.local"
}

# Function to show setup instructions
show_setup_instructions() {
    print_header "Vercel Environment Setup Instructions"
    
    echo "1. Production Environment Setup:"
    echo "   - Go to your Vercel project dashboard"
    echo "   - Navigate to Settings → Environment Variables"
    echo "   - Add all variables with production values"
    echo ""
    
    echo "2. Preview Environment Setup:"
    echo "   - In the same Environment Variables section"
    echo "   - For each variable, click 'Add' and select 'Preview' environment"
    echo "   - Use test/development values for sensitive services"
    echo ""
    
    echo "3. Branch Configuration:"
    echo "   - Go to Settings → Git"
    echo "   - Configure branch deployments:"
    echo "     * master → Production"
    echo "     * develop → Preview"
    echo "     * feature/* → Preview"
    echo ""
    
    echo "4. Required Environment Variables:"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    echo "   - NEXT_PUBLIC_STRIPE_PRICE_ID"
    echo "   - STRIPE_WEBHOOK_SECRET"
    echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID"
    echo "   - NEXT_PUBLIC_SANITY_DATASET"
    echo "   - SANITY_API_TOKEN"
    echo "   - NEXT_PUBLIC_BASE_URL"
    echo "   - SMTP_HOST"
    echo "   - SMTP_PORT"
    echo "   - SMTP_USER"
    echo "   - SMTP_PASS"
    echo "   - CONTACT_EMAIL"
    echo "   - DOWNLOAD_SECRET_KEY"
    echo "   - GITHUB_PERSONAL_ACCESS_TOKEN"
}

# Function to validate environment setup
validate_setup() {
    print_header "Validating Environment Setup"
    
    # Check if .env.local exists
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local file not found. Creating from env.example..."
        cp env.example .env.local
        print_status "Created .env.local from env.example"
        print_warning "Please fill in your actual values in .env.local"
    fi
    
    # Check required environment variables
    local required_vars=(
        "STRIPE_SECRET_KEY"
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
        "NEXT_PUBLIC_STRIPE_PRICE_ID"
        "STRIPE_WEBHOOK_SECRET"
        "NEXT_PUBLIC_SANITY_PROJECT_ID"
        "NEXT_PUBLIC_SANITY_DATASET"
        "SANITY_API_TOKEN"
        "NEXT_PUBLIC_BASE_URL"
        "SMTP_HOST"
        "SMTP_PORT"
        "SMTP_USER"
        "SMTP_PASS"
        "CONTACT_EMAIL"
        "DOWNLOAD_SECRET_KEY"
        "GITHUB_PERSONAL_ACCESS_TOKEN"
    )
    
    print_status "Checking required environment variables..."
    
    for var in "${required_vars[@]}"; do
        if grep -q "^$var=" .env.local; then
            print_status "✓ $var is set"
        else
            print_warning "⚠ $var is not set in .env.local"
        fi
    done
}

# Function to show deployment workflow
show_deployment_workflow() {
    print_header "Deployment Workflow"
    
    echo "For Development Deployments:"
    echo "1. Push to 'develop' branch → Creates preview deployment"
    echo "2. Test with preview URL"
    echo "3. Merge to 'master' → Deploys to production"
    echo ""
    
    echo "For Feature Testing:"
    echo "1. Create feature branch"
    echo "2. Push changes → Creates preview deployment"
    echo "3. Test with preview URL"
    echo "4. Merge to 'develop' or 'master'"
    echo ""
    
    echo "Commands:"
    echo "  git push origin develop    # Deploy to preview"
    echo "  git push origin master       # Deploy to production"
    echo "  vercel --prod             # Force production deployment"
    echo "  vercel                    # Deploy to preview"
}

# Main script
main() {
    print_header "Vercel Environment Setup Script"
    
    # Check prerequisites
    check_vercel_cli
    check_vercel_auth
    
    # Show menu
    echo ""
    echo "Choose an option:"
    echo "1. Show setup instructions"
    echo "2. List current environment variables"
    echo "3. Pull environment variables"
    echo "4. Validate current setup"
    echo "5. Show deployment workflow"
    echo "6. Exit"
    echo ""
    
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1)
            show_setup_instructions
            ;;
        2)
            list_env_vars
            ;;
        3)
            pull_env_vars
            ;;
        4)
            validate_setup
            ;;
        5)
            show_deployment_workflow
            ;;
        6)
            print_status "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice. Please enter a number between 1-6."
            exit 1
            ;;
    esac
}

# Run main function
main "$@" 