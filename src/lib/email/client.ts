import nodemailer from "nodemailer";
import {
  generateDownloadEmailHTML,
  generateOrderConfirmationEmailHTML,
} from "./templates";

// Create reusable transporter
const createTransporter = () => {
  // Validate required environment variables
  if (!process.env.SMTP_HOST) {
    throw new Error("SMTP_HOST environment variable is not set");
  }
  if (!process.env.SMTP_PORT) {
    throw new Error("SMTP_PORT environment variable is not set");
  }
  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER environment variable is not set");
  }
  if (!process.env.SMTP_PASS) {
    throw new Error("SMTP_PASS environment variable is not set");
  }
  if (!process.env.CONTACT_EMAIL) {
    throw new Error("CONTACT_EMAIL environment variable is not set");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send contact form email
export async function sendContactEmail(
  email: string,
  subject: string,
  message: string
) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.CONTACT_EMAIL,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    text: `From: ${email}\n\n${message}`,
    html: `<p><strong>From:</strong> ${email}</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
  });
}

// Send post-purchase email with download link
export async function sendDownloadEmail(
  customerEmail: string,
  downloadUrl: string,
  customerName?: string
) {
  console.log("sendDownloadEmail called with:", {
    customerEmail,
    downloadUrl,
    customerName,
  });

  const transporter = createTransporter();
  const htmlContent = generateDownloadEmailHTML(customerEmail, downloadUrl);

  const textContent = `
Payment Successful!

Greetings,

        Your purchase of iLand - Source Code Selling Platform has been completed successfully. 
You can now download your source code using the secure link below:

${downloadUrl}

Product Details:
        - iLand - Source Code Selling Platform
- Version: 1.0.0

IMPORTANT: This download link is valid for 10 minutes only. Please download the source code immediately. 
If the link expires, you can generate a new one from your success page.

SECURITY NOTICE: This download link is unique to your purchase and will expire automatically. 
Please do not share this link with others.

If you have any questions or need support, please don't hesitate to contact us.

Best regards,
The iLand Team

---
This email was sent to ${customerEmail}. If you didn't make this purchase, please contact us immediately.
  `;

  console.log("Attempting to send email via SMTP...");

  const result = await transporter.sendMail({
    from: process.env.CONTACT_EMAIL,
    to: customerEmail,
    subject: "Your iLand Source Code Download - Payment Successful!",
    text: textContent,
    html: htmlContent,
  });

  console.log("Email sent successfully:", {
    messageId: result.messageId,
    response: result.response,
  });
}

// Send order confirmation email
export async function sendOrderConfirmationEmail(
  customerEmail: string,
  orderDetails: {
    id: string;
    amount: number;
    status: string;
  }
) {
  const transporter = createTransporter();
  const htmlContent = generateOrderConfirmationEmailHTML(
    customerEmail,
    orderDetails
  );

  const textContent = `
Order Confirmed!

Greetings,

Thank you for your order! Your purchase has been confirmed and is being processed.

Order Details:
- Order ID: ${orderDetails.id}
- Amount: $${orderDetails.amount}
- Status: ${orderDetails.status}

What's Next?
You will receive a separate email with your download link shortly. Please check your inbox.

If you have any questions or need support, please don't hesitate to contact us.

Best regards,
The iland Team

---
This email was sent to ${customerEmail}. If you didn't make this purchase, please contact us immediately.
  `;

  await transporter.sendMail({
    from: process.env.CONTACT_EMAIL,
    to: customerEmail,
    subject: "Order Confirmation - iLand",
    text: textContent,
    html: htmlContent,
  });
}
