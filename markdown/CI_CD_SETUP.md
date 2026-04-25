# CI/CD Pipeline Setup Guide

This document provides a comprehensive guide to the CI/CD pipeline implementation for the iland project.

## Overview

The CI/CD pipeline consists of multiple workflows that ensure code quality, security, and reliable deployments:

- **Main CI/CD Pipeline** (`ci-cd.yml`) - Complete build, test, and deployment workflow
- **Security Scanning** (`security.yml`) - Comprehensive security checks
- **Monitoring & Alerts** (`monitoring.yml`) - Performance and health monitoring
- **Pull Request Checks** (`pr-checks.yml`) - Automated code review

## Prerequisites

### Required GitHub Secrets

Set up the following secrets in your GitHub repository settings:

#### Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
EMAIL_SERVER_HOST=your_email_host
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email_user
EMAIL_SERVER_PASSWORD=your_email_password
EMAIL_FROM=your_email_from
```

#### Deployment Secrets

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

#### Security & Monitoring

```
SNYK_TOKEN=your_snyk_token
SLACK_WEBHOOK_URL=your_slack_webhook_url
LHCI_GITHUB_APP_TOKEN=your_lighthouse_token
```

### Required Services

1. **Vercel** - For deployment
2. **Snyk** - For security scanning
3. **Slack** - For notifications
4. **Lighthouse CI** - For performance monitoring

## Workflow Details

### 1. Main CI/CD Pipeline (`ci-cd.yml`)

**Triggers:**

- Push to `master` or `develop` branches
- Pull requests to `master` or `develop`
- Manual trigger

**Jobs:**

1. **Security Scan** - Dependency and code security analysis
2. **Lint & Format** - Code quality checks
3. **Test** - Unit and integration tests
4. **Build** - Production build verification
5. **Deploy Staging** - Automatic deployment to staging (develop branch)
6. **Deploy Production** - Automatic deployment to production (master branch)
7. **Performance Test** - Lighthouse performance analysis

### 2. Security Workflow (`security.yml`)

**Triggers:**

- Daily at 2 AM UTC
- Push to master/develop
- Pull requests
- Manual trigger

**Security Checks:**

- Dependency vulnerability scanning (npm audit)
- Snyk security analysis
- CodeQL static analysis
- Container security scanning (if Dockerfile exists)
- Secrets detection (TruffleHog)
- License compliance

### 3. Monitoring Workflow (`monitoring.yml`)

**Triggers:**

- Every 6 hours
- Push to master
- Manual trigger

**Monitoring Checks:**

- Performance testing with Lighthouse
- Bundle size analysis
- Health checks for production/staging
- Uptime monitoring
- Dependency update alerts
- Error rate monitoring

### 4. Pull Request Checks (`pr-checks.yml`)

**Triggers:**

- Pull requests to master/develop

**PR Checks:**

- Automated code review
- Security review
- Performance impact analysis
- Dependency review
- Size limit checks
- Accessibility checks
- Automated PR comments

## Setup Instructions

### Step 1: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add all required secrets listed above

### Step 2: Set up Branch Protection

1. Go to Settings > Branches
2. Add rule for `master` branch:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date
   - Include administrators

### Step 3: Configure Environments

1. Go to Settings > Environments
2. Create `staging` environment
3. Create `production` environment
4. Add required environment secrets

### Step 4: Set up External Services

#### Vercel Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Get project info
vercel project ls

# Use interactive setup script (recommended)
npm run vercel:setup
```

#### Snyk Setup

1. Sign up at [snyk.io](https://snyk.io)
2. Get your API token
3. Add to GitHub secrets

#### Slack Setup

1. Create a Slack app
2. Add webhook URL to GitHub secrets
3. Configure notification channels

## Monitoring & Alerts

### Health Check Endpoint

The application includes a health check endpoint at `/api/health` that provides:

- Application status
- Memory usage
- External service connectivity
- Response time
- Environment information

### Performance Monitoring

Lighthouse CI runs on every deployment to track:

- Performance scores
- Accessibility scores
- Best practices
- SEO scores
- Core Web Vitals

### Alert Channels

- **Slack** - Deployment notifications, security alerts, performance issues
- **GitHub** - PR comments, status checks, security tab
- **Email** - Critical alerts (if configured)

## Security Features

### Automated Security Scanning

1. **Dependency Scanning** - npm audit with moderate+ severity
2. **Code Analysis** - CodeQL for JavaScript/TypeScript
3. **Secrets Detection** - TruffleHog for exposed secrets
4. **Container Scanning** - Trivy for Docker images
5. **License Compliance** - License checker for dependencies

### Security Alerts

- Daily security scans
- PR security reviews
- Automated vulnerability reporting
- Slack notifications for security issues

## Deployment Strategy

### Staging Deployment

- Automatic deployment on push to `develop`
- Non-production environment
- Used for testing and validation

### Production Deployment

- Automatic deployment on push to `master`
- Requires all checks to pass
- Includes performance testing
- Sends deployment notifications

### Rollback Strategy

- Vercel provides automatic rollback capabilities
- Previous deployments can be quickly restored
- Health checks prevent bad deployments

## Performance Monitoring

### Bundle Analysis

- Automatic bundle size tracking
- Performance regression detection
- Bundle optimization recommendations

### Core Web Vitals

- First Contentful Paint (FCP) < 2s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Total Blocking Time (TBT) < 300ms

### Performance Alerts

- Automated performance regression detection
- Slack notifications for performance issues
- Historical performance tracking

## Testing Strategy

### Test Types

1. **Unit Tests** - Component and utility testing
2. **Integration Tests** - API and service testing
3. **E2E Tests** - End-to-end user flow testing
4. **Performance Tests** - Lighthouse CI testing

### Test Coverage

- Minimum 80% code coverage
- Critical paths must be tested
- Performance benchmarks must be met

## Troubleshooting

### Common Issues

#### Build Failures

1. Check TypeScript errors
2. Verify environment variables
3. Check dependency conflicts
4. Review ESLint/Prettier issues

#### Deployment Failures

1. Verify Vercel configuration
2. Check environment secrets
3. Review build logs
4. Test locally first

#### Security Scan Failures

1. Update vulnerable dependencies
2. Fix code security issues
3. Remove exposed secrets
4. Review license compliance

### Debug Commands

```bash
# Run tests locally
npm run test

# Run security audit
npm audit

# Check bundle size
npm run build && npm run analyze

# Run Lighthouse locally
npx lighthouse http://localhost:3000

# Check health endpoint
curl http://localhost:3000/api/health
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Snyk Documentation](https://docs.snyk.io/)
- [CodeQL Documentation](https://docs.github.com/en/code-security/codeql-cli)

## Contributing

When contributing to the CI/CD pipeline:

1. Test changes locally first
2. Update documentation
3. Follow the existing workflow patterns
4. Add appropriate error handling
5. Include monitoring and alerting

## Support

For CI/CD related issues:

1. Check the troubleshooting section
2. Review GitHub Actions logs
3. Check external service status
4. Contact the development team

---

**Last Updated:** $(date)
**Version:** 1.0.0
