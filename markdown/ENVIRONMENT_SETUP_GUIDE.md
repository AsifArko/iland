# Environment Setup Guide for Fermi

## Current File Structure

You currently have these environment files:

```
fermi-land/
├── .env                    # Base environment (Docker/production)
├── .env.local             # Local development (Next.js)
├── env.example            # Template with all variables (no dot prefix)
└── .gitignore             # Ignores .env* files
```

## File Purposes

### 1. `env.example` (Your Current Template)

- **Purpose**: Template file with all required environment variables
- **Contains**: Dummy values and placeholder text
- **Usage**: Copy to `.env.local` for local development
- **Note**: This file is committed to git (safe to share)

### 2. `.env.local` (Local Development)

- **Purpose**: Local development environment variables
- **Contains**: Your actual development values
- **Usage**: Used by Next.js for local development
- **Note**: This file is ignored by git (keeps secrets safe)

### 3. `.env` (Base Environment)

- **Purpose**: Base environment for Docker/production builds
- **Contains**: Production or base values
- **Usage**: Used by Docker containers
- **Note**: This file is ignored by git

## Environment Strategy for Vercel

### You DON'T need additional files!

Your current setup is perfect for Vercel development deployments. Here's why:

1. **Vercel handles environment variables through their dashboard**
2. **No need for `.env.development` or `.env.production` files**
3. **Your existing `env.example` is comprehensive and well-structured**

## Setup Instructions

### Quick Setup with Interactive Script

For Vercel deployment, you can use the interactive setup script:

```bash
npm run vercel:setup
```

This script provides an interactive menu to help you configure your Vercel environment variables and validate your setup.

### Step 1: Local Development Setup

```bash
# Copy the template to create your local environment
cp env.example .env.local

# Edit .env.local with your actual development values
nano .env.local
```

### Step 2: Vercel Dashboard Configuration

#### Production Environment

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add all variables from your `env.example` with production values:
   - Use live Stripe keys
   - Use `production` Sanity dataset
   - Use production email settings

#### Preview Environment

1. In the same Environment Variables section
2. For each variable, click "Add" and select "Preview" environment
3. Use test/development values:
   - Use test Stripe keys (same as development)
   - Use `development` Sanity dataset
   - Use test email settings

### Step 3: Branch Configuration

Configure your Git branches for automatic deployments:

- **`master`** → Production deployment
- **`develop`** → Preview deployment
- **`feature/*`** → Preview deployment

## Environment Variable Reference

### Required Variables (from your `env.example`)

#### Stripe Configuration

```bash
STRIPE_SECRET_KEY=sk_test_...                    # Test for dev/preview, Live for production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...   # Test for dev/preview, Live for production
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...            # Your Stripe price ID
STRIPE_WEBHOOK_SECRET=whsec_...                  # Webhook secret from Stripe
```

#### Sanity CMS

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id    # Same for all environments
NEXT_PUBLIC_SANITY_DATASET=production            # 'production' for prod, 'development' for preview
SANITY_API_TOKEN=sk...                           # API token from Sanity
```

#### GitHub Integration

```bash
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_...             # GitHub token for private repos
```

#### Email Configuration

```bash
SMTP_HOST=smtp.gmail.com                         # Email provider host
SMTP_PORT=587                                    # Email provider port
SMTP_USER=your_email@gmail.com                   # Email username
SMTP_PASS=your_app_password                      # Email password
CONTACT_EMAIL=noreply@fermi.com                  # Contact email address
```

#### Security

```bash
DOWNLOAD_SECRET_KEY=your_secure_random_string     # 32+ character random string
```

#### Next.js Configuration

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000       # Local dev URL
# For Vercel: Auto-generated preview URLs, your domain for production
```

## Environment-Specific Values

### Local Development (`.env.local`)

```bash
NODE_ENV=development                             # Auto-set by Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_DATASET=development
# Use test Stripe keys
# Use test email accounts
```

### Preview Deployments (Vercel Preview)

```bash
NODE_ENV=production                              # Auto-set by Vercel
NEXT_PUBLIC_BASE_URL=https://your-preview-url.vercel.app  # Auto-generated
NEXT_PUBLIC_SANITY_DATASET=development
# Use test Stripe keys
# Use test email accounts
```

### Production Deployments (Vercel Production)

```bash
NODE_ENV=production                              # Auto-set by Vercel
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_SANITY_DATASET=production
# Use live Stripe keys
# Use production email accounts
```

## Quick Setup Commands

### Using the Setup Script

```bash
# Make the script executable
chmod +x scripts/vercel-env-setup.sh

# Run the setup script
./scripts/vercel-env-setup.sh
```

### Manual Setup

```bash
# 1. Create local environment
cp env.example .env.local

# 2. Edit with your values
nano .env.local

# 3. Install Vercel CLI (if not installed)
npm i -g vercel

# 4. Login to Vercel
vercel login

# 5. Pull environment variables from Vercel
vercel env pull .env.local
```

## Security Best Practices

### 1. Never Commit Sensitive Data

- ✅ `env.example` - Safe to commit (dummy values)
- ❌ `.env.local` - Never commit (contains real secrets)
- ❌ `.env` - Never commit (contains real secrets)

### 2. Use Different Keys for Different Environments

- **Local/Preview**: Test Stripe keys, development Sanity dataset
- **Production**: Live Stripe keys, production Sanity dataset

### 3. Environment Isolation

- Use different email accounts for testing
- Use different GitHub tokens with appropriate permissions
- Use different Sanity datasets for content isolation

## Troubleshooting

### Common Issues

1. **Environment variables not loading**

   ```bash
   # Check Vercel environment variables
   vercel env ls

   # Pull latest from Vercel
   vercel env pull .env.local
   ```

2. **Wrong dataset in preview**
   - Verify `NEXT_PUBLIC_SANITY_DATASET=development` in preview environment

3. **Webhook failures**
   - Ensure webhook URLs are correctly configured for each environment
   - Use different webhook secrets for production vs preview

4. **Email delivery issues**
   - Check SMTP settings for each environment
   - Verify email credentials are correct

### Debug Commands

```bash
# Check current environment
echo $NODE_ENV

# Check environment variables
vercel env ls

# Deploy to specific environment
vercel --prod    # Production
vercel           # Preview

# View deployment logs
vercel logs
```

## Summary

Your current setup with `env.example` is perfect! You don't need additional environment files. The key is:

1. **Use `env.example` as your template** (you already have this)
2. **Configure Vercel dashboard** with environment-specific values
3. **Use different values for production vs preview** deployments
4. **Let Vercel handle `NODE_ENV` and URLs** automatically

This approach is clean, secure, and follows Next.js/Vercel best practices!
