# Platform Neutrality Guide

This document explains how iland has been configured to be platform-neutral, ensuring consistent builds and deployments across different operating systems (macOS, Windows, Linux) while preserving the UI experience.

## Overview

The application has been configured to avoid platform-specific dependencies and build processes that can cause deployment issues, particularly when deploying from Windows to Vercel. **Importantly, this solution maintains your existing UI design and functionality.**

## Key Changes Made

### 1. Tailwind CSS Configuration

**Problem**: Tailwind CSS v4 uses LightningCSS native modules that can cause issues on Windows systems.

**Solution**:

- **Kept Tailwind CSS v3.4.17** for stability and UI preservation
- Removed Tailwind CSS v4 packages (`@tailwindcss/node`, `@tailwindcss/postcss`)
- Updated PostCSS configuration to use standard `tailwindcss: {}`
- This ensures your UI remains exactly as designed

### 2. LightningCSS Removal

**Problem**: LightningCSS uses native modules that can cause issues on Windows systems.

**Solution**:

- Removed LightningCSS environment variables from `vercel.json`
- Simplified webpack configuration to avoid platform-specific fallbacks
- Updated PostCSS configuration to use standard Tailwind CSS v3

### 3. Build Process

**Problem**: Platform-specific build commands and environment variables.

**Solution**:

- Created platform-neutral build scripts (`scripts/build-platform-neutral.sh` and `scripts/build-platform-neutral.bat`)
- Removed platform-specific environment variables from Dockerfiles
- Added `.npmrc` configuration for consistent package installation

### 4. Dependencies

**Problem**: Optional dependencies that might not be available on all platforms.

**Solution**:

- Configured `.npmrc` to disable optional dependencies
- Used `legacy-peer-deps=true` for better compatibility
- Ensured consistent package-lock usage
- Added missing `react-is` dependency for Sanity compatibility

## Platform-Neutral Configuration Files

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### .npmrc

```
legacy-peer-deps=true
package-lock=true
save-exact=true
omit=optional
registry=https://registry.npmjs.org/
```

### postcss.config.mjs

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### next.config.ts

- Removed LightningCSS-specific environment variables
- Simplified webpack configuration
- Platform-neutral fallbacks for Node.js modules

## Build Scripts

### Unix/Linux/macOS

```bash
npm run build:platform-neutral
# or
./scripts/build-platform-neutral.sh
```

### Windows

```cmd
npm run build:platform-neutral
# or
scripts\build-platform-neutral.bat
```

## Deployment Best Practices

### 1. Local Development

- Use the standard `npm run dev` for local development
- The platform-neutral configuration doesn't affect local development
- **Your UI will look exactly the same**

### 2. CI/CD Pipeline

- Use `npm run build:platform-neutral` in CI/CD pipelines
- Ensure consistent Node.js version across environments
- Use the provided build scripts for cross-platform compatibility

### 3. Vercel Deployment

- The simplified `vercel.json` configuration works across all platforms
- No platform-specific environment variables needed
- Standard `npm run build` command is used

## Testing Platform Neutrality

### Local Testing

```bash
# Test on macOS/Linux
npm run build:platform-neutral

# Test on Windows
npm run build:platform-neutral
```

### Docker Testing

```bash
# Test with Docker (platform-neutral)
docker build -t iland .
docker run -p 3000:3000 iland
```

## Troubleshooting

### Common Issues

1. **LightningCSS Errors on Windows**
   - **Solution**: The platform-neutral configuration avoids LightningCSS native modules
   - Use the provided build scripts instead of direct `npm run build`

2. **Tailwind CSS Issues**
   - **Solution**: Using stable Tailwind CSS v3.4.17 instead of v4
   - Standard PostCSS configuration ensures compatibility

3. **Package Installation Issues**
   - **Solution**: `.npmrc` configuration ensures consistent installation
   - Use `npm ci` instead of `npm install` for production builds

4. **Missing Dependencies**
   - **Solution**: Added `react-is` for Sanity compatibility
   - All dependencies are now platform-neutral

### Environment Variables

The following environment variables are no longer needed:

- `LIGHTNINGCSS_WASM`
- `LIGHTNINGCSS_BROWSER`
- `LIGHTNINGCSS_NATIVE`

### Node.js Version

Ensure consistent Node.js version across platforms:

- Minimum: Node.js 22.0.0
- Recommended: Use the same Node.js version locally and in CI/CD

## Benefits

1. **Consistent Deployments**: Same build process works across all platforms
2. **Reduced Errors**: Eliminates platform-specific LightningCSS and Tailwind issues
3. **Better CI/CD**: Simplified build commands work in any environment
4. **Cross-Platform Development**: Developers can work on any operating system
5. **Vercel Compatibility**: Optimized for Vercel's build environment
6. **UI Preservation**: Your existing UI design and functionality remains unchanged

## Migration Guide

If you're migrating from the previous platform-specific configuration:

1. **Remove Platform-Specific Environment Variables**
   - Remove LightningCSS environment variables from your deployment platform
   - Update any CI/CD scripts to use the new build commands

2. **Update Build Commands**
   - Replace custom build commands with `npm run build:platform-neutral`
   - Use the provided scripts for cross-platform compatibility

3. **Test Deployment**
   - Test deployment from different platforms (Windows, macOS, Linux)
   - Verify that builds are consistent across platforms
   - **Verify that your UI looks exactly the same**

## Support

If you encounter platform-specific issues:

1. Check that you're using the platform-neutral build scripts
2. Ensure consistent Node.js version across environments
3. Verify that `.npmrc` configuration is being used
4. Test with the provided Docker configuration

## Important Notes

- **UI Preservation**: This solution maintains your existing UI design and functionality
- **No Breaking Changes**: All your existing Tailwind CSS classes and styling will work exactly as before
- **Stable Foundation**: Using Tailwind CSS v3.4.17 provides a stable, well-tested foundation
- **Future-Proof**: The configuration is ready for future Tailwind CSS v4 migration when it's more stable

The platform-neutral configuration ensures that iland can be developed and deployed from any operating system without platform-specific issues, while preserving your existing UI experience.
