# iland API Documentation

## Overview

The iland API provides endpoints for secure source code sales, digital downloads, order management, and user interactions. All endpoints are RESTful and return JSON responses.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://yourdomain.com/api`

## Authentication

Most endpoints require no authentication. Admin endpoints require proper authorization headers.

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message description",
  "status": 400
}
```

## Security Features

### Rate Limiting

- **Standard endpoints**: 100 requests per minute per IP
- **Admin endpoints**: 10 requests per minute per IP
- **Contact form**: 5 requests per minute per IP
- **Webhook endpoints**: No rate limiting (Stripe managed)

### Security Headers

All responses include comprehensive security headers:

- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Content-Security-Policy` - Comprehensive CSP policy
- `Referrer-Policy: origin-when-cross-origin` - Referrer policy
- `Permissions-Policy` - Feature policy restrictions
- `Strict-Transport-Security` - HTTPS enforcement (production)

### Performance Monitoring

All API requests are monitored for:

- Response times
- Memory usage
- Error rates
- Slow request detection
- Performance metrics collection

## API Endpoints

### 1. Enhanced Health Check

**Endpoint**: `GET /api/health`

**Description**: Comprehensive health check with performance metrics and security scan results.

**Response**:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 3600,
  "services": {
    "stripe": "connected",
    "sanity": "connected",
    "email": "configured"
  },
  "performance": {
    "totalRequests": 1500,
    "averageResponseTime": 245,
    "errorRate": 0.5,
    "memoryUsage": {
      "heapUsed": 52428800,
      "heapTotal": 104857600,
      "external": 2097152,
      "rss": 67108864
    },
    "slowRequests": 3
  },
  "security": {
    "vulnerabilities": 0,
    "lastScan": "2024-01-01T12:00:00Z",
    "recommendations": []
  },
  "system": {
    "nodeVersion": "v18.17.0",
    "platform": "linux",
    "arch": "x64",
    "memory": {
      "total": 8589934592,
      "free": 4294967296,
      "used": 4294967296
    }
  }
}
```

**Status Codes**:

- `200` - Healthy
- `200` - Degraded (performance issues)
- `503` - Unhealthy (critical failures)

### 2. Stripe Checkout Session

**Endpoint**: `POST /api/create-checkout-session`

**Description**: Creates a new Stripe checkout session for secure payment processing.

**Request Body**:

```json
{
  "priceId": "price_1234567890",
  "successUrl": "https://yourdomain.com/success",
  "cancelUrl": "https://yourdomain.com/cancel",
  "customerEmail": "customer@example.com"
}
```

**Response**:

```json
{
  "sessionId": "cs_test_1234567890"
}
```

**Error Codes**:

- `400` - Missing required fields (priceId, successUrl, cancelUrl)
- `400` - Stripe API errors
- `429` - Rate limit exceeded
- `500` - Internal server error

**Example Usage**:

```javascript
const response = await fetch("/api/create-checkout-session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    priceId: "price_1234567890",
    successUrl: "https://yourdomain.com/success",
    cancelUrl: "https://yourdomain.com/cancel",
    customerEmail: "customer@example.com",
  }),
});

const { sessionId } = await response.json();
```

### 3. Stripe Price Retrieval

**Endpoint**: `GET /api/get-price`

**Description**: Retrieves the current Stripe price information for the product.

**Response**:

```json
{
  "price": {
    "id": "price_1234567890",
    "unit_amount": 2900,
    "currency": "usd",
    "recurring": null,
    "product": "prod_1234567890"
  }
}
```

**Error Codes**:

- `429` - Rate limit exceeded
- `500` - Stripe API errors or configuration issues

### 4. Stripe Webhook Handler

**Endpoint**: `POST /api/webhooks/stripe`

**Description**: Processes Stripe webhook events for payment completion and order management.

**Headers Required**:

```
Stripe-Signature: t=timestamp,v1=signature
```

**Events Handled**:

- `checkout.session.completed` - Creates order and sends confirmation email
- `checkout.session.expired` - Handles expired sessions

**Response**:

```json
{
  "received": true
}
```

**Error Codes**:

- `400` - Invalid webhook signature
- `400` - Unsupported event type
- `500` - Processing error

### 5. Contact Form Submission

**Endpoint**: `POST /api/contact`

**Description**: Handles contact form submissions and sends notification emails.

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "Hello, I have a question about your product."
}
```

**Response**:

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error Codes**:

- `400` - Missing required fields
- `400` - Invalid email format
- `429` - Rate limit exceeded (5 requests per minute)
- `500` - Email sending error

### 6. Secure Download URL Generation

**Endpoint**: `POST /api/proxy-url`

**Description**: Generates time-limited, secure download URLs for purchased content.

**Request Body**:

```json
{
  "sessionId": "cs_test_1234567890",
  "downloadType": "source_code"
}
```

**Response**:

```json
{
  "downloadUrl": "https://yourdomain.com/api/download-proxy?token=secure_token_123",
  "expiresAt": "2024-01-01T12:00:00Z"
}
```

**Error Codes**:

- `400` - Invalid session ID
- `400` - Session not found or expired
- `400` - Download already used
- `429` - Rate limit exceeded
- `500` - Token generation error

### 7. Secure File Download

**Endpoint**: `GET /api/download-proxy`

**Description**: Serves files through a secure proxy with token validation.

**Query Parameters**:

- `token` (required) - Secure download token

**Response**: File stream with appropriate headers

**Error Codes**:

- `400` - Missing or invalid token
- `400` - Token expired
- `404` - File not found
- `429` - Rate limit exceeded
- `500` - Download error

### 8. GitHub Repository Download

**Endpoint**: `GET /api/download-git`

**Description**: Downloads files from GitHub repositories (public or private).

**Query Parameters**:

- `url` (required) - GitHub repository URL
- `path` (optional) - Specific file path within repository

**Response**: File stream or JSON with download information

**Error Codes**:

- `400` - Invalid GitHub URL
- `401` - GitHub authentication failed
- `404` - Repository or file not found
- `429` - Rate limit exceeded
- `500` - Download error

### 9. Email Testing

**Endpoint**: `POST /api/test-email`

**Description**: Tests email functionality during development.

**Request Body**:

```json
{
  "email": "test@example.com",
  "name": "Test User"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Test email sent successfully"
}
```

**Error Codes**:

- `400` - Missing required fields
- `429` - Rate limit exceeded
- `500` - Email sending error

### 10. Admin Downloads Management

**Endpoint**: `GET /api/admin/downloads`

**Description**: Retrieves download statistics and management data (admin only).

**Headers Required**:

```
Authorization: Bearer admin_token
```

**Response**:

```json
{
  "downloads": [
    {
      "id": "download_123",
      "sessionId": "cs_test_1234567890",
      "customerEmail": "customer@example.com",
      "downloadUrl": "https://github.com/...",
      "status": "completed",
      "createdAt": "2024-01-01T12:00:00Z",
      "downloadedAt": "2024-01-01T12:05:00Z"
    }
  ],
  "stats": {
    "totalDownloads": 150,
    "totalRevenue": 4350,
    "activeTokens": 5
  }
}
```

**Error Codes**:

- `401` - Unauthorized
- `403` - Forbidden
- `429` - Rate limit exceeded (10 requests per minute)
- `500` - Server error

### 11. Stripe Payments Management

**Endpoint**: `GET /api/admin/stripe-payments`

**Description**: Retrieves Stripe payment data for admin management.

**Headers Required**:

```
Authorization: Bearer admin_token
```

**Response**:

```json
{
  "payments": [
    {
      "id": "pi_1234567890",
      "amount": 2900,
      "currency": "usd",
      "status": "succeeded",
      "customerEmail": "customer@example.com",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "summary": {
    "totalPayments": 50,
    "totalRevenue": 145000,
    "successfulPayments": 48,
    "failedPayments": 2
  }
}
```

**Error Codes**:

- `401` - Unauthorized
- `403` - Forbidden
- `429` - Rate limit exceeded (10 requests per minute)
- `500` - Server error

## Performance Monitoring

### Response Headers

All API responses include performance monitoring headers:

- `X-Request-ID` - Unique request identifier for tracing
- `X-Response-Time` - Response time in milliseconds
- `X-RateLimit-Limit` - Rate limit maximum requests
- `X-RateLimit-Remaining` - Remaining requests in current window
- `X-RateLimit-Reset` - Time when rate limit resets

### Performance Metrics

The system automatically tracks:

- **Response Times**: Average, min, max response times
- **Error Rates**: Percentage of failed requests
- **Memory Usage**: Heap usage, external memory, RSS
- **Slow Requests**: Requests taking longer than 1 second
- **Throughput**: Requests per second

### Performance Thresholds

- **Slow Request**: > 1000ms
- **High Memory Usage**: > 100MB heap
- **High Error Rate**: > 5%
- **Memory Warning**: > 500MB heap

## Security Scanning

### Automated Security Checks

The system performs real-time security scanning for:

- **SQL Injection**: Detects SQL injection attempts
- **XSS Vulnerabilities**: Identifies cross-site scripting payloads
- **CSRF Vulnerabilities**: Checks for missing CSRF protection
- **Information Disclosure**: Detects sensitive data exposure
- **Missing Security Headers**: Validates security header configuration

### Security Recommendations

The system provides automated recommendations for:

- Input validation and sanitization
- Security header configuration
- Rate limiting implementation
- Authentication and authorization
- Data protection measures

## Testing

### Development Testing

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'

# Test email functionality
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# Test performance monitoring
npm run performance:monitor

# Test security scanning
npm run security:test

# Test bundle analysis
npm run bundle:analyze
```

### Production Testing

- Use Stripe test mode for payment testing
- Verify webhook endpoints are accessible
- Test email delivery in staging environment
- Validate download security measures
- Run performance and security tests

## Performance Optimization

### Bundle Optimization

- **Tree Shaking**: Removes unused code
- **Code Splitting**: Splits bundles for better caching
- **Image Optimization**: WebP and AVIF formats
- **Compression**: Gzip compression enabled
- **Caching**: Optimized cache headers

### Monitoring Scripts

```bash
# Performance monitoring
npm run performance:monitor -- --url http://localhost:3000 --duration 300

# Security testing
npm run security:test -- --url http://localhost:3000

# Image optimization
npm run optimize:images -- --input ./public --quality 80

# Bundle analysis
npm run bundle:analyze
```

## SDK Examples

### JavaScript/TypeScript

```typescript
class ilandAPI {
  private baseUrl: string;

  constructor(baseUrl: string = "https://yourdomain.com/api") {
    this.baseUrl = baseUrl;
  }

  async createCheckoutSession(data: {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async getPrice() {
    const response = await fetch(`${this.baseUrl}/get-price`);
    return response.json();
  }

  async submitContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const response = await fetch(`${this.baseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async getHealthStatus() {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.json();
  }
}
```

### Python

```python
import requests

class ilandAPI:
    def __init__(self, base_url="https://yourdomain.com/api"):
        self.base_url = base_url

    def create_checkout_session(self, price_id, success_url, cancel_url, customer_email=None):
        data = {
            "priceId": price_id,
            "successUrl": success_url,
            "cancelUrl": cancel_url
        }
        if customer_email:
            data["customerEmail"] = customer_email

        response = requests.post(f"{self.base_url}/create-checkout-session", json=data)
        return response.json()

    def get_price(self):
        response = requests.get(f"{self.base_url}/get-price")
        return response.json()

    def submit_contact(self, name, email, subject, message):
        data = {
            "name": name,
            "email": email,
            "subject": subject,
            "message": message
        }
        response = requests.post(f"{self.base_url}/contact", json=data)
        return response.json()

    def get_health_status(self):
        response = requests.get(f"{self.base_url}/health")
        return response.json()
```

## Changelog

### Version 1.1.0 (Current)

- Added comprehensive performance monitoring
- Implemented security scanning and vulnerability detection
- Enhanced health check with performance metrics
- Added rate limiting with configurable thresholds
- Implemented security headers and CSP policies
- Added bundle optimization and image compression
- Created performance and security testing scripts
- Enhanced error handling and logging

### Version 1.0.0

- Initial API release
- Stripe integration
- Secure download system
- Email automation
- Admin management endpoints

## Support

For API support and questions:

- **Email**: api-support@iland.com
- **Documentation**: https://docs.iland.com/api
- **Status Page**: https://status.iland.com
- **Performance Monitoring**: https://monitoring.iland.com
