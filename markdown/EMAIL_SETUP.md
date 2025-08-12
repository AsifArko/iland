# Email Setup for Fermi

This document explains how the email functionality works in the Fermi application and how to set it up.

## Overview

The Fermi application sends emails to customers after successful payments. There are two types of emails sent:

1. **Order Confirmation Email** - Sent immediately after payment confirmation
2. **Download Email** - Sent with the download link to the success page

## Email Flow

1. Customer completes payment on Stripe
2. Stripe webhook (`/api/webhooks/stripe`) receives the payment confirmation
3. Order is created in Sanity CMS
4. Two emails are sent to the customer:
   - Order confirmation email with order details
   - Download email with link to success page (`/success?session_id=...`)

## Email Templates

Both emails use modern, responsive HTML templates that match the application's design:

- **Header**: Gradient background with success icon
- **Content**: Clean, readable typography with proper spacing
- **Product Details**: Card-style layout for order information
- **Call-to-Action**: Prominent download button
- **Footer**: Support information and security notice

## Environment Variables Required

Add these to your `.env.local` file:

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
CONTACT_EMAIL=noreply@fermi.com
```

## Email Provider Options

### Option 1: Gmail with Google Workspace (Recommended for Custom Domains)

**For professional emails like `noreply@fermi.com`:**

1. Set up Google Workspace for your domain (fermi.com)
2. Create the email address `noreply@fermi.com` in Google Workspace
3. Enable 2-Factor Authentication on the Google Workspace account
4. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
5. Use these settings:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=noreply@fermi.com
   SMTP_PASS=your_app_password_here
   CONTACT_EMAIL=noreply@fermi.com
   ```

**Note:** Regular Gmail accounts cannot send from custom domain addresses.

### Option 2: SendGrid (Recommended for Professional Emails)

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key with "Mail Send" permissions
3. Verify your domain (fermi.com) in SendGrid
4. Use these settings:
   ```bash
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your_sendgrid_api_key_here
   CONTACT_EMAIL=noreply@fermi.com
   ```

### Option 3: Resend (Modern Email Service)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Verify your domain (fermi.com) in Resend
4. Use these settings:
   ```bash
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_USER=resend
   SMTP_PASS=your_resend_api_key_here
   CONTACT_EMAIL=noreply@fermi.com
   ```

### Option 4: Other Providers

#### Outlook/Hotmail

```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Mailgun

```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
```

## Testing Email Functionality

Use the test endpoint to verify email setup:

```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com", "name": "Test User"}'
```

## Email Functions

### `sendDownloadEmail(email, downloadUrl, customerName?)`

Sends the main download email with:

- Success confirmation
- Product details
- Download button linking to success page
- Important notices and support information

### `sendOrderConfirmationEmail(email, orderDetails)`

Sends order confirmation with:

- Order details (ID, amount, status)
- Next steps information
- Support contact

### `sendContactEmail(email, subject, message)`

Sends contact form submissions to the admin email.

## Troubleshooting

### Common Issues

1. **"SMTP_HOST environment variable is not set"**
   - Check your `.env.local` file
   - Ensure all email variables are set

2. **"Authentication failed"**
   - Verify your email credentials
   - For Gmail, ensure you're using an App Password, not your regular password

3. **"Connection timeout"**
   - Check your SMTP host and port settings
   - Verify firewall settings

4. **Emails not sending in production**
   - Ensure environment variables are set in Vercel
   - Check Vercel function logs for errors

### Debug Mode

Add logging to see email details:

```typescript
// In src/lib/email.ts, add console.log before sending
console.log("Sending email to:", customerEmail);
console.log("Download URL:", downloadUrl);
```

## Security Notes

- Never commit email credentials to version control
- Use environment variables for all sensitive data
- Consider using a dedicated email service for production
- Monitor email sending limits and quotas

## Production Considerations

1. **Email Service**: Consider using a dedicated email service like SendGrid, Mailgun, or AWS SES for better deliverability
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Monitoring**: Set up monitoring for email delivery failures
4. **Templates**: Consider using a template service for better email management
5. **Analytics**: Track email open rates and click-through rates
