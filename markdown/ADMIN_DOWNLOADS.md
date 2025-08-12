# Admin Downloads Page

This document explains how to access and use the admin downloads page in the Sanity Studio.

## Accessing the Admin Page

1. **Navigate to Sanity Studio**: Go to `/studio` in your application
2. **Find User Downloads Section**: Look for the "User Downloads" item in the left sidebar (with 📥 icon)
3. **Click on User Downloads**: This will open the User Download Management interface

## Features

### Dashboard Overview

- **Total Orders**: Number of completed purchases
- **Active Downloads**: Orders with valid download tokens
- **Active Tokens**: Currently valid download tokens
- **Total Revenue**: Sum of all completed orders

### Recent Downloads Section

For each download, you can see:

- **Customer Email**: The buyer's email address
- **Session ID**: Stripe session identifier
- **Order ID**: Sanity document ID
- **Amount**: Purchase amount with currency
- **Status**: Active or Expired badge
- **Download URL**: The actual download link with token
- **Token Information**: Security token details and expiration

### Active Tokens Section

Shows all current download tokens:

- **Token**: The security token (truncated for display)
- **Session ID**: Associated purchase session
- **Expiration**: When the token expires
- **Time Remaining**: Countdown to expiration

## URL Types

The system shows different types of download URLs:

1. **Active Download** ✅
   - Direct download link with valid token
   - Users can download immediately

2. **Expired - Redirect to Success Page** ⚠️
   - Token has expired
   - Users will be redirected to success page to generate new token

3. **No Token - Redirect to Success Page** ⚠️
   - No token was generated
   - Users will be redirected to success page

## Actions Available

### Copy Download URL

- Click the "Copy" button next to any download URL
- URL is copied to clipboard for sharing or testing

### Refresh Data

- Click the "Refresh" button in the top-right corner
- Updates all data in real-time

## Security Notes

- **Development Only**: The `/api/test-tokens` endpoint is only available in development
- **Production Authentication**: In production, implement proper authentication for admin endpoints
- **Token Privacy**: Tokens are sensitive - don't share them publicly

## Troubleshooting

### No Data Showing

1. Check if there are completed orders in Sanity
2. Verify the API endpoints are working
3. Check browser console for errors

### Tokens Not Updating

1. Click the refresh button
2. Check if tokens have expired (10-minute limit)
3. Verify the token cleanup is working

### API Errors

1. Check server logs for errors
2. Verify environment variables are set
3. Ensure Sanity is properly configured

## Development Testing

To test the admin page:

1. **Complete a Test Purchase**:
   - Go through the checkout process
   - Complete payment with Stripe test card

2. **Check Admin Page**:
   - Visit `/studio` and click "User Downloads"
   - Verify the order appears in the list

3. **Test Token Expiration**:
   - Wait 10 minutes for token to expire
   - Refresh the admin page
   - Verify status changes to "Expired"

4. **Test URL Copying**:
   - Click "Copy" on any download URL
   - Paste in browser to test functionality

## Production Considerations

For production deployment:

1. **Add Authentication**: Implement proper admin authentication
2. **Rate Limiting**: Add rate limiting to admin endpoints
3. **Logging**: Add comprehensive logging for security monitoring
4. **Backup**: Ensure token data is backed up if using persistent storage
