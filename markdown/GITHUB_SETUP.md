# GitHub Setup for Private Repository Downloads

## Problem

Your iland application is trying to download from a private GitHub repository, which requires authentication. Without proper GitHub authentication, users get "Not Found" errors when trying to download.

## Solution

Set up a GitHub Personal Access Token to enable authenticated downloads from private repositories.

## Steps to Set Up GitHub Token

### 1. Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "iland Download Access"
4. Set expiration (recommended: 90 days or custom)
5. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `read:packages` (Download packages from GitHub Package Registry)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again)

### 2. Add Token to Environment Variables

#### For Local Development:

Add to your `.env.local` file:

```
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

#### For Vercel Production:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add a new variable:
   - **Name**: `GITHUB_PERSONAL_ACCESS_TOKEN`
   - **Value**: `ghp_your_token_here`
   - **Environment**: Production (and Preview if needed)
4. Click "Save"

### 3. Verify Configuration

After deploying, the download should work for both:

- ✅ Local development
- ✅ Vercel production deployment

## Security Notes

- The token has access to your private repositories
- Keep the token secure and don't commit it to version control
- Consider using a dedicated GitHub account for production tokens
- Rotate the token regularly (every 90 days recommended)

## Troubleshooting

If downloads still fail:

1. **Check token permissions**: Ensure the token has `repo` scope
2. **Verify repository access**: The token's owner must have access to the repository
3. **Check environment variables**: Ensure `GITHUB_PERSONAL_ACCESS_TOKEN` is set in production
4. **Review logs**: Check Vercel function logs for GitHub API errors

## Alternative Solutions

If you prefer not to use GitHub tokens, consider:

1. **Make repository public**: Simplest solution but exposes code
2. **Use GitHub releases**: Create releases with downloadable assets
3. **Use alternative hosting**: Host the source code on a different platform
