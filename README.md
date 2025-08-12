# iLand - Source Code Selling Platform

A comprehensive source code selling platform for solo software engineers. Features secure source code sales, automated digital downloads, order management, and a modern tech stack built for developers.

## Features

- **Secure Source Code Sales**: Complete Stripe integration with secure checkout and webhook processing
- **Digital Downloads**: Automated download system with time-limited, secure proxy URLs
- **Order Management**: Full order tracking and management through Sanity CMS
- **Email Automation**: Beautiful email templates for order confirmation and download links
- **Admin Dashboard**: Comprehensive admin interface for managing downloads and orders
- **Mobile-First Design**: Fully responsive design optimized for all devices
- **Content Management**: Powerful Sanity CMS for managing content and orders
- **GitHub Integration**: Secure downloads from private repositories with authentication
- **Analytics & Monitoring**: Built-in analytics dashboard for tracking sales and performance

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **CMS**: Sanity
- **Payments**: Stripe
- **Email**: Nodemailer with SMTP
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Code Quality**: ESLint, Prettier, Husky

## Prerequisites

Before setting up iLand, ensure you have:

- **Node.js 22+** installed
- **npm or yarn** package manager
- **Git** for version control
- **Stripe account** for payment processing
- **Sanity account** for content management
- **GitHub account** with Personal Access Token (for private repository downloads)
- **Email service** (Gmail, SendGrid, Resend, etc.)

## Project Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/iland.git
cd iland

# Install dependencies
npm install

# Set up Git hooks
npm run prepare
```

### Step 2: Environment Configuration

```bash
# Copy environment template
cp env.example .env.local
```

Update `.env.local` with your configuration:

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

# GitHub Configuration (Required for private repositories)
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_personal_access_token_here

# Next.js Configuration
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
CONTACT_EMAIL=noreply@iland.com

# Download Security
DOWNLOAD_SECRET_KEY=your_secure_random_string_here_minimum_32_characters
```

### Step 3: Sanity CMS Setup

1. **Create Sanity Project**:

   ```bash
   # Install Sanity CLI globally
   npm install -g @sanity/cli
   ```

2. **Login and Configure**:

   ```bash
   sanity login
   sanity manage
   ```

3. **Create API Tokens**:
   - Go to [Sanity API settings](https://www.sanity.io/organizations/<org-id>/project/<project-id>/api)
   - Create both Admin and Read-only tokens
   - Add tokens to your environment variables

4. **Generate Types and Deploy**:
   ```bash
   npm run typegen
   npx sanity schema deploy
   ```

### Step 4: Stripe Configuration

1. **Create Stripe Account**:
   - Sign up at [stripe.com](https://stripe.com)
   - Complete account verification

2. **Create Product and Price**:
   - Go to Stripe Dashboard → Products
   - Create a new product for your source code
   - Set up pricing (one-time payment)
   - Copy the Price ID

3. **Configure Webhooks**:
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `checkout.session.expired`
   - Copy webhook secret

4. **Update Environment Variables**:
   - Add your Stripe keys and webhook secret to `.env.local`

### Step 5: GitHub Setup (For Private Repositories)

1. **Create Personal Access Token**:
   - Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
   - Generate new token (classic)
   - Select scopes: `repo`, `read:packages`
   - Copy the token

2. **Add to Environment**:
   ```env
   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
   ```

### Step 6: Email Configuration

Choose one of the following email providers:

#### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Configure Environment**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password_here
   CONTACT_EMAIL=your_email@gmail.com
   ```

#### Option 2: SendGrid (Recommended for Production)

1. **Sign up** at [sendgrid.com](https://sendgrid.com)
2. **Create API Key** with "Mail Send" permissions
3. **Verify your domain**
4. **Configure Environment**:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your_sendgrid_api_key_here
   CONTACT_EMAIL=noreply@yourdomain.com
   ```

#### Option 3: Resend (Modern Email Service)

1. **Sign up** at [resend.com](https://resend.com)
2. **Create API Key** with "Mail Send" permissions
3. **Verify your domain** (optional but recommended)
4. **Configure Environment**:
   ```env
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_USER=resend
   SMTP_PASS=your_resend_api_key_here
   CONTACT_EMAIL=noreply@yourdomain.com
   ```

### Step 7: Development and Testing

```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Build for production
npm run build
```

## Project Structure

```
iland/
├── README.md
├── markdown/ (documentation files)
├── src/
│   ├── app/ (Next.js app router)
│   ├── components/ (React components)
│   ├── lib/ (utility functions)
│   ├── hooks/ (custom React hooks)
│   └── sanity/ (Sanity CMS configuration)
├── public/ (static assets)
└── scripts/ (build and utility scripts)
```

## Key Features

### 1. Secure Source Code Sales

- Stripe-powered checkout system
- Secure payment processing
- Automated order fulfillment

### 2. Digital Download System

- Time-limited download URLs
- Secure proxy system
- GitHub integration for private repos

### 3. Admin Dashboard

- Order management
- Download tracking
- Analytics and insights
- User management

### 4. Email Automation

- Order confirmations
- Download links
- Support notifications
- Beautiful templates

## Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   - Push your code to GitHub
   - Connect repository to Vercel

2. **Environment Variables**:
   - Add all environment variables in Vercel dashboard
   - Ensure production values are set

3. **Deploy**:
   - Vercel will auto-deploy on push
   - Monitor deployment logs

### Other Platforms

The platform is designed to be platform-neutral and can be deployed to:

- Vercel (recommended)
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue on GitHub
- Check the documentation in the `markdown/` directory
- Review the code examples and setup guides

## Roadmap

- [ ] Multi-product support
- [ ] Subscription-based sales
- [ ] Advanced analytics
- [ ] API for third-party integrations
- [ ] Mobile app companion
- [ ] Advanced security features

---
