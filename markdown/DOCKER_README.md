# Docker Setup for iland

This document provides comprehensive instructions for containerizing and running the iland Learning Management System using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development with Docker](#development-with-docker)
- [Production Deployment](#production-deployment)
- [Environment Configuration](#environment-configuration)
- [Docker Commands Reference](#docker-commands-reference)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Prerequisites

Before using Docker with iland, ensure you have:

- **Docker Desktop** installed and running
- **Docker Compose** (usually included with Docker Desktop)
- **Git** for cloning the repository
- **Environment variables** configured (see [Environment Configuration](#environment-configuration))

### Installing Docker

#### macOS

```bash
# Download and install Docker Desktop
# https://www.docker.com/products/docker-desktop
```

#### Windows

```bash
# Download and install Docker Desktop
# https://www.docker.com/products/docker-desktop
```

#### Linux (Ubuntu/Debian)

```bash
# Install Docker Engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
```

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/your-username/iland.git
cd iland

# Copy environment template
cp env.example .env.local
```

### 2. Configure Environment

Edit `.env.local` with your configuration:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
NEXT_PUBLIC_STRIPE_PRICE_ID=price_your_stripe_price_id_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token_here

# GitHub Configuration
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_personal_access_token_here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
CONTACT_EMAIL=noreply@iland.com

# Download Security
DOWNLOAD_SECRET_KEY=your_secure_random_string_here_minimum_32_characters
```

### 3. Run with Docker Compose

```bash
# Build and start the application
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The application will be available at `http://localhost:3000`

## Development with Docker

### Development Mode

For development with hot reloading:

```bash
# Use the development configuration
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build
```

### Development Features

- **Hot Reloading**: Code changes are automatically reflected
- **Volume Mounts**: Source code is mounted for live editing
- **Development Dependencies**: All dev dependencies are available
- **Debugging**: Full debugging capabilities

### Development Commands

```bash
# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Execute commands in container
docker-compose -f docker-compose.dev.yml exec iland-dev npm run lint

# Access container shell
docker-compose -f docker-compose.dev.yml exec iland-dev sh

# Restart development server
docker-compose -f docker-compose.dev.yml restart iland-dev
```

## Production Deployment

### Production Build

```bash
# Build production image
docker build -t iland:latest .

# Run production container
docker run -p 3000:3000 --env-file .env.local iland:latest
```

### Production with Docker Compose

```bash
# Build and start production services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

### Production Features

- **Multi-stage Build**: Optimized for production
- **Security**: Non-root user execution
- **Health Checks**: Automatic health monitoring
- **Resource Optimization**: Minimal image size
- **Standalone Output**: Next.js standalone mode

## ⚙️ Environment Configuration

### Required Environment Variables

| Variable                             | Description                  | Required |
| ------------------------------------ | ---------------------------- | -------- |
| `STRIPE_SECRET_KEY`                  | Stripe secret key            | Yes      |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key       | Yes      |
| `NEXT_PUBLIC_STRIPE_PRICE_ID`        | Stripe price ID              | Yes      |
| `STRIPE_WEBHOOK_SECRET`              | Stripe webhook secret        | Yes      |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`      | Sanity project ID            | Yes      |
| `SANITY_API_TOKEN`                   | Sanity API token             | Yes      |
| `GITHUB_PERSONAL_ACCESS_TOKEN`       | GitHub personal access token | Yes      |
| `SMTP_HOST`                          | SMTP server host             | Yes      |
| `SMTP_USER`                          | SMTP username                | Yes      |
| `SMTP_PASS`                          | SMTP password                | Yes      |
| `DOWNLOAD_SECRET_KEY`                | Download security key        | Yes      |

### Environment File Structure

The Docker Compose configuration supports multiple ways to handle environment variables:

#### Option 1: Environment File (Recommended)

```env
# .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
# ... other variables
```

#### Option 2: Host Environment Variables

Set environment variables in your shell before running Docker:

```bash
export STRIPE_SECRET_KEY=sk_test_...
export NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
# ... other variables
docker-compose up --build
```

#### Option 3: Multiple Environment Files

Create environment-specific files:

```bash
# .env.local (base configuration)
# .env.development (development overrides)
# .env.production (production overrides)
```

The Docker Compose configuration will automatically pick up environment variables from:

1. Host system environment variables
2. `.env.local` file
3. Additional environment files specified in docker-compose.override.yml

### Environment Validation

The application includes environment validation:

```bash
# Check environment variables
docker-compose exec iland-app node -e "
  const required = ['STRIPE_SECRET_KEY', 'SANITY_API_TOKEN'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error('Missing environment variables:', missing);
    process.exit(1);
  }
  console.log('Environment validation passed');
"

# Debug environment variables
docker-compose exec iland-app node -e "
  console.log('Environment Variables:');
  Object.keys(process.env)
    .filter(key => key.includes('STRIPE') || key.includes('SANITY') || key.includes('SMTP'))
    .forEach(key => console.log(\`\${key}=\${process.env[key]}\`));
"

# Use the environment check script
./scripts/check-env.sh
```

## Docker Commands Reference

### Basic Commands

```bash
# Build image
docker build -t iland .

# Run container
docker run -p 3000:3000 iland

# Stop container
docker stop iland

# Remove container
docker rm iland

# Remove image
docker rmi iland
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec iland-app npm run lint

# Scale services
docker-compose up --scale iland-app=3
```

### Development Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# View development logs
docker-compose -f docker-compose.dev.yml logs -f

# Execute development commands
docker-compose -f docker-compose.dev.yml exec iland-dev npm run test

# Access development shell
docker-compose -f docker-compose.dev.yml exec iland-dev sh
```

### Health Checks

```bash
# Check container health
docker-compose ps

# View health check logs
docker-compose logs iland-app

# Manual health check
curl -f http://localhost:3000/api/health
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill process using port 3000
sudo kill -9 $(lsof -t -i:3000)

# Or use different port
docker-compose up -p 3001
```

#### 2. Environment Variables Not Loading

```bash
# Check if .env.local exists
ls -la .env.local

# Verify environment variables in container
docker-compose exec iland-app env | grep STRIPE

# Check all environment variables in container
docker-compose exec iland-app env

# Verify host environment variables are being passed
docker-compose exec iland-app printenv | grep STRIPE

# Rebuild with fresh environment
docker-compose down
docker-compose up --build

# Alternative: Use host environment variables
export STRIPE_SECRET_KEY=your_key_here
docker-compose up --build
```

#### 3. Build Failures

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Dockerfile syntax
docker build --target builder .
```

#### 4. Container Won't Start

```bash
# Check container logs
docker-compose logs iland-app

# Check container status
docker-compose ps

# Inspect container
docker-compose exec iland-app sh
```

#### 5. Development Hot Reload Not Working

```bash
# Check volume mounts
docker-compose -f docker-compose.dev.yml config

# Recreate volumes
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up --build
```

### Debug Commands

```bash
# Inspect running containers
docker ps

# View container details
docker inspect iland

# Check container resources
docker stats iland

# View container filesystem
docker exec -it iland sh

# Check network connectivity
docker network ls
docker network inspect iland_iland-network
```

## Best Practices

### Security

1. **Non-root User**: Container runs as non-root user
2. **Minimal Base Image**: Uses Alpine Linux for smaller attack surface
3. **Multi-stage Build**: Reduces final image size
4. **Environment Variables**: Sensitive data in environment variables
5. **Health Checks**: Automatic health monitoring

### Performance

1. **Layer Caching**: Optimized Dockerfile for better caching
2. **Multi-stage Build**: Separate build and runtime stages
3. **Standalone Output**: Next.js standalone mode for smaller images
4. **Volume Mounts**: Efficient development workflow
5. **Resource Limits**: Configurable resource constraints

### Development Workflow

1. **Hot Reloading**: Development container supports live reloading
2. **Volume Mounts**: Source code changes reflect immediately
3. **Debugging**: Full debugging capabilities in development
4. **Testing**: Run tests inside container
5. **Linting**: Code quality checks in container

### Production Deployment

1. **Health Checks**: Automatic health monitoring
2. **Logging**: Structured logging for monitoring
3. **Restart Policy**: Automatic restart on failure
4. **Resource Management**: Configurable memory and CPU limits
5. **Security Scanning**: Regular security scans

## Docker Images

### Image Layers

```
iland:latest
├── Base: node:18-alpine
├── Dependencies: npm ci --only=production
├── Build: npm run build
└── Runtime: standalone Next.js
```

### Image Optimization

- **Multi-stage Build**: Reduces final image size
- **Alpine Linux**: Minimal base image
- **Production Dependencies**: Only production dependencies included
- **Standalone Output**: Next.js standalone mode
- **Layer Caching**: Optimized for Docker layer caching

### Image Security

- **Non-root User**: Runs as `nextjs` user (UID 1001)
- **Minimal Permissions**: Least privilege principle
- **Security Scanning**: Regular vulnerability scans
- **Base Image Updates**: Regular base image updates

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Docker Build and Deploy

on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t iland .
      - name: Run tests
        run: docker run iland npm test
      - name: Deploy to production
        run: |
          docker tag iland:latest your-registry/iland:latest
          docker push your-registry/iland:latest
```

### Docker Registry

```bash
# Tag for registry
docker tag iland:latest your-registry/iland:latest

# Push to registry
docker push your-registry/iland:latest

# Pull from registry
docker pull your-registry/iland:latest
```

## Monitoring and Logging

### Health Checks

The application includes health checks:

```bash
# Check health endpoint
curl -f http://localhost:3000/api/health

# View health check logs
docker-compose logs iland-app
```

### Logging

```bash
# View application logs
docker-compose logs -f iland-app

# View specific service logs
docker-compose logs -f --tail=100 iland-app

# Export logs
docker-compose logs iland-app > app.log
```

### Monitoring

```bash
# Check container stats
docker stats iland

# Monitor resource usage
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

## 🆘 Support

For Docker-related issues:

1. **Check Logs**: `docker-compose logs -f`
2. **Verify Environment**: Ensure all required variables are set
3. **Rebuild Images**: `docker-compose build --no-cache`
4. **Clean System**: `docker system prune -a`
5. **Check Documentation**: Refer to this README and main project README

### Useful Commands

```bash
# Quick health check
curl -f http://localhost:3000/api/health

# View all containers
docker ps -a

# Clean up unused resources
docker system prune

# View Docker disk usage
docker system df
```

---

**Note**: This Docker setup is optimized for the iland Learning Management System. For production deployments, consider using orchestration tools like Kubernetes or Docker Swarm for better scalability and management.
