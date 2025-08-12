# Proxy URL System - Secure Source Code Download Management

## Overview

The Proxy URL System provides enterprise-grade secure, time-limited download access to purchased source code while maintaining complete control over download links and preventing unauthorized access. This system integrates seamlessly with Stripe payments, GitHub repositories, and Sanity CMS to deliver a robust digital product delivery solution.

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Payment  │───▶│  Webhook        │───▶│ Secure Token    │
│   (Stripe)      │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Success Page    │    │ Token Validation│
                       │   (Frontend)    │    │ (API)           │
                       └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Ensure Proxy    │    │ Sanity Database │
                       │ URL Ready       │    │ (Proxy URL)     │
                       │   (Frontend)    │    │ Creation/Check  │
                       └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Verify Proxy    │    │ Database        │
                       │ URL Ready       │    │ Verification    │
                       │   (Frontend)    │    │ (Final Check)   │
                       └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────--┐
                       │ Download Button │    │ Button Enabled    │
                       │   (Frontend)    │    │ (isDownloadReady) │
                       └─────────────────┘    └─────────────────--┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ /api/download-  │◀───│ Token Validation│
                       │ proxy?token=... │    │ (Database)      │
                       └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ File Download   │
                       │ (ZIP Archive)   │
                       └─────────────────┘
```

## Core Components

### 1. **Secure Token System**

- **Token Generation**: 16-byte secure hex tokens generated for success page access
- **Session Mapping**: Secure tokens map to Stripe session IDs in database
- **URL Security**: No sensitive session IDs exposed in URLs
- **Backward Compatibility**: Support for both secure tokens and legacy session IDs
- **Token Expiration**: 24-hour expiration for security
- **Single Use**: Tokens marked as used after first access

### 2. **Payment Processing (Stripe)**

- **Webhook Integration**: Real-time order processing via `checkout.session.completed` events
- **Session Management**: Unique session IDs for each purchase transaction
- **Order Creation**: Automatic order records in Sanity CMS upon successful payment
- **Email Automation**: Order confirmation and download link emails sent automatically

### 2. **Download Configuration (Sanity CMS)**

- **Repository Management**: GitHub repository URLs and branch specifications
- **Version Control**: Support for different source code versions
- **Access Control**: Active/inactive download configurations
- **Exclusion Patterns**: Configurable file/folder exclusions (node_modules, .env, etc.)

### 3. **Proxy URL Generation (API)**

- **Token Generation**: Cryptographically secure 32-byte hex tokens
- **Expiration Management**: Configurable time-limited access (1-60 minutes)
- **Session Linking**: Direct correlation between Stripe sessions and download tokens
- **Retry Logic**: Robust error handling with exponential backoff

### 4. **File Delivery (Download Proxy)**

- **GitHub Integration**: Secure access to private repositories via GitHub API
- **Authentication**: GitHub Personal Access Token for private repo access
- **Content Headers**: Proper MIME types and download disposition
- **Download Tracking**: Real-time download count monitoring

## Database Schema

### `proxyUrl` Document

```typescript
interface ProxyUrl {
  _id: string; // Sanity document ID
  sessionId: string; // Stripe session ID (unique identifier)
  downloadUrl: string; // GitHub API download URL
  filename: string; // User-friendly download filename
  token: string; // 32-byte secure download token
  expiresAt: string; // ISO timestamp for expiration
  isExpired: boolean; // Manual expiration flag
  downloadCount: number; // Number of successful downloads
  order: Reference; // Link to associated order document
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
}
```

### `download` Document

```typescript
interface Download {
  _id: string; // Sanity document ID
  title: string; // Download title
  description: string; // Download description
  gitRepository: {
    url: string; // GitHub repository URL
    branch: string; // Target branch (master, main, etc.)
    includeNodeModules: boolean; // Include node_modules flag
    excludePatterns: string[]; // File exclusion patterns
  };
  version: string; // Version number
  isActive: boolean; // Active download configuration
  downloadCount: number; // Total downloads across all sessions
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
}
```

### `secureToken` Document

```typescript
interface SecureToken {
  _id: string; // Sanity document ID
  token: string; // 16-byte secure hex token
  sessionId: string; // Stripe session ID (mapped)
  order: Reference; // Link to associated order document
  isUsed: boolean; // Whether token has been used
  createdAt: string; // Creation timestamp
  expiresAt: string; // Expiration timestamp (24 hours)
}
```

### `order` Document

```typescript
interface Order {
  _id: string; // Sanity document ID
  stripeSessionId: string; // Stripe checkout session ID
  customerEmail: string; // Customer email address
  amount: number; // Payment amount in cents
  currency: string; // Payment currency
  status: "pending" | "completed" | "failed";
  product: string; // Product identifier
  downloadUrl?: string; // Optional direct download URL
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
}
```

## API Endpoints

### `/api/proxy-url` (POST)

Creates or retrieves a proxy URL for a given Stripe session.

**Request Body:**

```json
{
  "sessionId": "cs_test_...",
  "expiryMinutes": 1
}
```

**Response:**

```json
{
  "success": true,
  "downloadUrl": "http://localhost:3000/api/download-proxy?...",
  "expiresAt": "2024-01-01T12:01:00.000Z",
  "isExpired": false,
  "proxyUrlId": "proxy-url-id"
}
```

**Implementation Logic:**

1. **Session Validation**: Verify Stripe session exists and payment completed
2. **Order Verification**: Check order status in Sanity database
3. **Download Configuration**: Retrieve active download settings
4. **GitHub URL Generation**: Create authenticated GitHub API URL
5. **Token Creation**: Generate secure 32-byte hex token
6. **Database Storage**: Create proxy URL record with retry logic
7. **URL Assembly**: Construct secure proxy download URL

### `/api/proxy-url` (GET)

Checks the status of an existing proxy URL.

**Query Parameters:**

- `sessionId`: Stripe session ID

**Response:**

```json
{
  "success": true,
  "exists": true,
  "isExpired": false,
  "expiresAt": "2024-01-01T12:01:00.000Z",
  "downloadCount": 1
}
```

### `/api/download-proxy` (GET)

Validates token and serves the actual file download.

**Query Parameters:**

- `url`: GitHub download URL
- `filename`: Download filename
- `sessionId`: Stripe session ID

**Implementation Logic:**

1. **Token Validation**: Verify session against Sanity database
2. **Expiration Check**: Validate both time-based and manual expiration
3. **Download Count**: Increment download counter
4. **GitHub Authentication**: Use GitHub token for private repo access
5. **File Streaming**: Stream file content with proper headers
6. **Security Headers**: Set cache control and content disposition

## Frontend Integration

### Success Page (`src/app/success/page.tsx`)

**Key Features:**

- **Session Validation**: Verifies Stripe session ID from URL parameters
- **Download State Management**: Handles loading, success, error, and expired states
- **Real-time Countdown**: Live expiration timer with automatic state updates
- **Download Initiation**: Multiple fallback methods for reliable file downloads
- **Error Handling**: Comprehensive error states with retry functionality
- **Race Condition Prevention**: Ensures download button only renders after proxy URL is fully ready

**State Management:**

```typescript
interface DownloadState {
  downloadInfo: DownloadInfo | null;
  isLoading: boolean;
  error: string | null;
  isExpired: boolean;
  isDownloadReady: boolean; // Prevents race conditions
}
```

**Download Methods:**

1. **Complete Ready Verification**: Ensures proxy URL is fully created AND verified before allowing download
2. **Blob Download**: Fetch file as blob and trigger download
3. **Direct Navigation**: Fallback to new tab/window download
4. **Error Recovery**: Automatic retry with exponential backoff

**Expiration Handling:**

- **Professional Notice**: Clear 1-minute expiration notice without countdown
- **Expiration Notification**: Clear message when link expires
- **No Regeneration**: Expired links cannot be regenerated automatically
- **Support Contact**: Users are guided to contact support for new builds
- **Clear Communication**: Explicit messaging about expiration policy

## Admin Management Interface

### Sanity Studio Component (`src/sanity/components/proxy-urls/proxy-urls.tsx`)

**Features:**

- **Real-time Monitoring**: Live view of all proxy URLs and their status
- **Download Analytics**: Track download counts and usage patterns
- **Link Regeneration**: Admin ability to regenerate active download links
- **Status Indicators**: Visual status badges for active/expired links
- **Session Tracking**: Complete audit trail of all download attempts

**Management Capabilities:**

- View all proxy URLs with creation and expiration times
- Monitor download counts and usage statistics
- Regenerate links for active sessions (admin override)
- Track failed download attempts and errors
- **Support Workflow**: Handle expired link requests from customers
- **New Build Generation**: Create new download links for expired sessions
- **Customer Communication**: Track support interactions and resolutions

## Race Condition Prevention

### Problem Identified

The original architecture had a **race condition** where:

1. Success page calls `/api/proxy-url` to create proxy URL
2. Download button renders immediately after API call
3. User clicks download button before proxy URL is fully created/verified
4. Download fails because proxy URL isn't ready in database

### Solution Implemented

**Ready State Verification:**

1. **Creation Phase**: Proxy URL is created via API
2. **Verification Phase**: Frontend waits and verifies proxy URL is ready
3. **Ready State**: Download button only becomes clickable after verification
4. **Download Phase**: User can safely download once ready state is confirmed

**Implementation Details:**

```typescript
// 1. Validate secure token and get session ID
const sessionId = await validateSecureToken(token);

// 2. Ensure proxy URL exists and is ready (with full verification)
await ensureProxyUrlReady(sessionId);

// 3. Only then allow download
setIsDownloadReady(true);
```

**Benefits:**

- **Eliminates Race Conditions**: No more premature download attempts
- **Better User Experience**: Clear loading states and feedback
- **Improved Reliability**: Consistent download success rates
- **Error Prevention**: Prevents "Invalid or expired download token" errors

## Security Implementation

### Token Security

- **Cryptographic Generation**: 32-byte random hex tokens using Node.js crypto
- **Unique Per Session**: Each Stripe session gets a unique token
- **Database Validation**: All tokens validated against Sanity database
- **No Token Exposure**: Tokens never exposed in client-side URLs

### Expiration and Support Workflow

- **Strict Expiration**: Download links expire after the configured time limit (default: 1 minute)
- **No Automatic Regeneration**: Once expired, users cannot generate new download links
- **URL Reuse Prevention**: Expired URLs cannot be reused to create new proxy URLs
- **Support Contact Required**: Users must contact support to request new builds
- **Controlled Access**: Only support team can generate new download links after expiration
- **Audit Trail**: All support-generated links are tracked for security and compliance

### Access Control

- **Session Linking**: Download access tied to specific Stripe sessions
- **Order Verification**: Only completed orders can generate download links
- **Expiration Enforcement**: Time-based and manual expiration flags
- **GitHub Authentication**: Secure access to private repositories

### Data Protection

- **No Token Regeneration**: Expired links cannot be regenerated by users
- **Persistent Expiration**: Expiration survives server restarts
- **Audit Trail**: Complete history of all download attempts
- **Rate Limiting**: Built-in protection against abuse
- **No URL Reuse**: Once expired, the same URL cannot be used to generate new proxy URLs
- **Support Contact Required**: Users must contact support for new builds after expiration

## GitHub Integration

### Repository Access

- **Private Repository Support**: Full access to private GitHub repositories
- **Branch Selection**: Configurable branch downloads (master, main, develop)
- **Authentication**: GitHub Personal Access Token for API access
- **Archive Downloads**: ZIP archive generation via GitHub API

### API Implementation

```typescript
async function getGitHubDownloadUrl(
  gitUrl: string,
  branch: string,
  token?: string
) {
  // Extract owner and repo from GitHub URL
  const urlMatch = gitUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  const [, owner, repo] = urlMatch;

  if (token) {
    // Private repo: Use GitHub API with authentication
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/zipball/${branch}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    return response.headers.get("location"); // Redirect URL
  } else {
    // Public repo: Direct archive URL
    return `${gitUrl}/archive/${branch}.zip`;
  }
}
```

## Email Automation

### Order Confirmation Email

- **Payment Details**: Order amount, currency, and transaction ID
- **Product Information**: Source code package details
- **Support Information**: Contact details and help resources

### Download Link Email

- **Success Page Link**: Direct link to download page with session ID
- **Expiration Notice**: Clear communication about link expiration
- **Download Instructions**: Step-by-step download guidance

## Environment Configuration

### Required Environment Variables

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# GitHub Configuration
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_...

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=support@yourdomain.com

# Application Configuration
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Operational Workflows

### Purchase Flow

1. **Customer Payment**: User completes Stripe checkout
2. **Webhook Processing**: Stripe webhook creates order in Sanity
3. **Email Delivery**: Order confirmation and download emails sent
4. **Success Page**: Customer redirected to success page with session ID
5. **Download Creation**: Proxy URL generated upon page load
6. **File Download**: Customer downloads source code via secure proxy

### Admin Management Flow

1. **Download Configuration**: Admin configures repository and settings in Sanity
2. **Order Monitoring**: Track orders and download usage in admin interface
3. **Link Management**: View and regenerate download links as needed
4. **Analytics Review**: Monitor download patterns and system usage

### Error Handling Flow

1. **Payment Failures**: Orders marked as failed, no download access
2. **Expired Links**: Automatic expiration, no regeneration allowed
3. **GitHub Errors**: Proper error messages and fallback handling
4. **Network Issues**: Retry logic with exponential backoff
5. **Expired URL Reuse**: Users cannot reuse expired URLs for new downloads
6. **Support Escalation**: Expired links require support contact for new builds

## Performance Optimizations

### Database Efficiency

- **Indexed Queries**: Optimized Sanity queries for session lookups
- **Retry Logic**: Robust error handling with exponential backoff
- **Connection Pooling**: Efficient Sanity client connection management

### Download Performance

- **Streaming Downloads**: Direct file streaming without memory buffering
- **CDN Integration**: Support for CDN caching of download files
- **Compression**: ZIP archive compression for faster downloads

### Caching Strategy

- **No Cache Headers**: Prevents caching of sensitive download URLs
- **Session Caching**: Efficient session validation caching
- **Configuration Caching**: Download configuration caching

## Monitoring and Analytics

### System Metrics

- **Download Success Rate**: Track successful vs failed downloads
- **Expiration Patterns**: Monitor link expiration and usage patterns
- **Error Tracking**: Comprehensive error logging and monitoring
- **Performance Metrics**: Download speed and system response times

### Admin Dashboard

- **Real-time Monitoring**: Live view of system status and usage
- **Download Analytics**: Detailed download statistics and trends
- **Error Reporting**: Centralized error tracking and reporting
- **Usage Patterns**: Customer behavior and download pattern analysis

## Troubleshooting Guide

### Common Issues

#### "Invalid or expired download token"

**Causes:**

- Token has expired (time-based or manual)
- Session ID mismatch
- Database connection issues
- Attempting to reuse expired download URL

**Solutions:**

- Check token expiration in Sanity Studio
- Verify session ID in Stripe dashboard
- Check Sanity API token configuration
- **For expired links**: Users must contact support for new builds
- **No automatic regeneration**: Expired URLs cannot be reused for new downloads

#### "Download not starting"

**Causes:**

- Content-Disposition header issues
- Browser security restrictions
- Network connectivity problems

**Solutions:**

- Verify Content-Disposition headers in response
- Check browser console for errors
- Test with different browsers

#### "GitHub API errors"

**Causes:**

- Invalid GitHub Personal Access Token
- Repository access permissions
- GitHub API rate limiting

**Solutions:**

- Verify GitHub token permissions and validity
- Check repository access settings
- Monitor GitHub API rate limits

#### "Sanity connection issues"

**Causes:**

- Invalid Sanity configuration
- Network connectivity problems
- API token expiration

**Solutions:**

- Verify Sanity project ID and dataset
- Check network connectivity to Sanity
- Refresh Sanity API token if needed

### Debug Logging

The system includes comprehensive logging for:

- **Token Generation**: All token creation and validation attempts
- **Proxy URL Creation**: Complete proxy URL generation process
- **GitHub API Requests**: All GitHub API interactions and responses
- **Download Attempts**: Detailed download tracking and statistics

### Health Checks

**System Health Endpoints:**

- `/api/proxy-url` (GET): Check proxy URL system status
- Sanity Studio: Monitor database connectivity and performance
- GitHub API: Verify repository access and authentication

## Development and Testing

### Local Development Setup

1. **Environment Configuration**: Set up all required environment variables
2. **Stripe Test Mode**: Use Stripe test keys for development
3. **GitHub Test Repository**: Use test repository for development
4. **Sanity Studio**: Local Sanity Studio for content management

### Testing Procedures

1. **Payment Flow Testing**: Complete Stripe checkout with test cards
2. **Download Testing**: Verify download link creation and expiration
3. **Error Testing**: Test various error scenarios and edge cases
4. **Admin Testing**: Verify admin interface functionality

### Production Deployment

1. **Environment Variables**: Ensure all production environment variables set
2. **Stripe Webhooks**: Configure production Stripe webhook endpoints
3. **GitHub Tokens**: Use production GitHub Personal Access Token
4. **Monitoring**: Set up production monitoring and alerting

## Benefits and Advantages

### Security Benefits

- **Zero Token Exposure**: Tokens never exposed in client-side code
- **Session Isolation**: Each download tied to specific payment session
- **Expiration Enforcement**: Strict time-based and manual expiration
- **Audit Trail**: Complete download history and tracking
- **No URL Reuse**: Expired URLs cannot be reused for new downloads
- **Support Control**: Only support can generate new builds after expiration

### User Experience Benefits

- **Automatic Downloads**: Seamless download initiation
- **Real-time Feedback**: Live countdown and status updates
- **Error Recovery**: Intelligent error handling and retry logic
- **Mobile Optimization**: Fully responsive design for all devices
- **Clear Expiration Communication**: Users understand when links expire
- **Support Guidance**: Clear instructions to contact support for expired links

### Operational Benefits

- **Admin Control**: Complete management interface for downloads
- **Analytics**: Comprehensive usage tracking and reporting
- **Scalability**: Efficient handling of multiple concurrent downloads
- **Reliability**: Robust error handling and recovery mechanisms
- **Support Workflow**: Controlled process for handling expired link requests
- **Build Management**: Support can generate new builds when needed

### Technical Benefits

- **Modern Architecture**: Built with Next.js 15 and TypeScript
- **Database Integration**: Seamless Sanity CMS integration
- **API Design**: RESTful API with proper error handling
- **Performance**: Optimized for speed and efficiency

## Future Enhancements

### Planned Features

- **Bulk Download Management**: Admin tools for bulk operations
- **Advanced Analytics**: Detailed usage analytics and reporting
- **Custom Expiration Rules**: Configurable expiration policies
- **Multi-file Downloads**: Support for multiple file downloads
- **Download Resumption**: Support for interrupted download resumption

### Scalability Improvements

- **CDN Integration**: Enhanced CDN support for global downloads
- **Load Balancing**: Improved load balancing for high-traffic scenarios
- **Caching Optimization**: Advanced caching strategies
- **Database Optimization**: Enhanced database performance and scaling

This comprehensive proxy URL system provides enterprise-grade security and reliability for digital product delivery, ensuring customers receive their purchased source code securely while maintaining complete control over access and usage.
