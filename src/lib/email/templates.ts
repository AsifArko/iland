// Generate download email HTML content
export function generateDownloadEmailHTML(
  customerEmail: string,
  downloadUrl: string
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your iLand Source Code Download</title>
      <style>
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #f0f8ff 25%, #f8fafc 50%, #f1f5f9 75%, #f8fafc 100%); padding: 48px 32px; text-align: center; border-bottom: 1px solid #e5e7eb; position: relative; overflow: hidden;">
          <!-- Subtle overlay pattern -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.04) 0%, transparent 50%); pointer-events: none;"></div>
          <div style="position: relative; z-index: 1;">
            <div style="margin-bottom: 32px;">
              <h2 style="color: #1f2937; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.025em; line-height: 1.2; text-shadow: 0 1px 2px rgba(31, 41, 55, 0.15);">iLand</h2>
            </div>
            <h1 style="color: #1e293b; font-size: 32px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.025em; line-height: 1.2; text-shadow: 0 1px 2px rgba(30, 41, 59, 0.1);">Payment Successful!</h1>
            <p style="color: #475569; font-size: 16px; margin: 0; font-weight: 500;">Thank you for your purchase</p>
          </div>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="margin-bottom: 30px;">
                         <h2 style="color: #1f2937; font-size: 20px; font-weight: 600; margin: 0 0 15px;">Greetings,</h2>
            <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Your purchase of <strong>iLand - Source Code Selling Platform</strong> has been completed successfully. 
              You can now download your source code using the secure link below.
            </p>
          </div>

          <!-- Product details card -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 10px;">iLand - Source Code Selling Platform</h3>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Version: 1.0.0</p>
          </div>

          <!-- Download button -->
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${downloadUrl}" 
               style="display: inline-block; background-color: #1f2937; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; transition: all 0.2s ease; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <svg style="display: inline-block; vertical-align: middle; margin-right: 8px; width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15L17 10M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Download Source Code (ZIP)
            </a>
          </div>

          <!-- Important notice -->
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 30px;">
            <div style="display: flex; align-items: flex-start;">
              <svg style="width: 20px; height: 20px; color: #d97706; margin-right: 12px; flex-shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 4px;">Important - Download Link Expires in few Minutes</p>
                <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
                  This download link is valid for <strong>few minutes only</strong>. Please download the source code immediately. 
                  If the link expires, you can generate a new one from your success page.
                </p>
              </div>
            </div>
          </div>

          <!-- Security notice -->
          <div style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px; margin-bottom: 30px;">
            <div style="display: flex; align-items: flex-start;">
              <svg style="width: 20px; height: 20px; color: #3b82f6; margin-right: 12px; flex-shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <p style="color: #1e40af; font-size: 14px; font-weight: 600; margin: 0 0 4px;">Security Notice</p>
                <p style="color: #1e40af; font-size: 14px; margin: 0; line-height: 1.5;">
                  This download link is unique to your purchase and will expire automatically. 
                  Please do not share this link with others.
                </p>
              </div>
            </div>
          </div>

          <!-- Support section -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px;">
              If you have any questions or need support, please don't hesitate to contact us.
            </p>
            <p style="color: #6b7280; font-size: 14px; font-weight: 500; margin: 0;">
              Best regards,<br>The iLand Team
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            This email was sent to ${customerEmail}. If you didn't make this purchase, please contact us immediately.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate order confirmation email HTML content
export function generateOrderConfirmationEmailHTML(
  customerEmail: string,
  orderDetails: {
    id: string;
    amount: number;
    status: string;
  }
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Order Confirmation - iLand</title>
      <style>
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #f0f8ff 25%, #f8fafc 50%, #f1f5f9 75%, #f8fafc 100%); padding: 48px 32px; text-align: center; border-bottom: 1px solid #e5e7eb; position: relative; overflow: hidden;">
          <!-- Subtle overlay pattern -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.04) 0%, transparent 50%); pointer-events: none;"></div>
          <div style="position: relative; z-index: 1;">
            <div style="margin-bottom: 32px;">
              <h2 style="color: #1f2937; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.025em; line-height: 1.2; text-shadow: 0 1px 2px rgba(31, 41, 55, 0.15);">iLand</h2>
            </div>
            <h1 style="color: #1e293b; font-size: 32px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.025em; line-height: 1.2; text-shadow: 0 1px 2px rgba(30, 41, 59, 0.1);">Order Confirmed!</h1>
            <p style="color: #475569; font-size: 16px; margin: 0; font-weight: 500;">Thank you for your purchase</p>
          </div>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="margin-bottom: 30px;">
                         <h2 style="color: #1f2937; font-size: 20px; font-weight: 600; margin: 0 0 15px;">Greetings,</h2>
            <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Thank you for your order! Your purchase has been confirmed and is being processed.
            </p>
          </div>

          <!-- Order details card -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 15px;">Order Details</h3>
            <div style="display: grid; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #6b7280; font-size: 14px;">Order ID:</span>
                <span style="color: #1f2937; font-size: 14px; font-weight: 600; font-family: monospace;">${orderDetails.id}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #6b7280; font-size: 14px;">Amount:</span>
                <span style="color: #1f2937; font-size: 14px; font-weight: 600;">$${orderDetails.amount}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #6b7280; font-size: 14px;">Status:</span>
                <span style="color: #059669; font-size: 14px; font-weight: 600; text-transform: capitalize;">${orderDetails.status}</span>
              </div>
            </div>
          </div>

          <!-- Next steps -->
          <div style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px; margin-bottom: 30px;">
            <div style="display: flex; align-items: flex-start;">
              <svg style="width: 20px; height: 20px; color: #3b82f6; margin-right: 12px; flex-shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 16H6A1 1 0 0 1 5 15V4A1 1 0 0 1 6 3H18A1 1 0 0 1 19 4V15A1 1 0 0 1 18 16H13V16ZM13 8H9V10H13V8ZM13 12H9V14H13V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <p style="color: #1e40af; font-size: 14px; font-weight: 600; margin: 0 0 4px;">What's Next?</p>
                <p style="color: #1e40af; font-size: 14px; margin: 0; line-height: 1.5;">
                  You will receive a separate email with your download link shortly. Please check your inbox.
                </p>
              </div>
            </div>
          </div>

          <!-- Support section -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px;">
              If you have any questions or need support, please don't hesitate to contact us.
            </p>
            <p style="color: #6b7280; font-size: 14px; font-weight: 500; margin: 0;">
              Best regards,<br>The iLand Team
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            This email was sent to ${customerEmail}. If you didn't make this purchase, please contact us immediately.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
