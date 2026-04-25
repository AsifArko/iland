import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Disable Vercel Speed Insights toolbar
  env: {
    NEXT_PUBLIC_VERCEL_SPEED_INSIGHTS_DISABLED: "true",
  },

  // Optimize images for Vercel
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable image optimization in development to prevent URL issues
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Security headers for production
  headers(): Promise<
    Array<{ source: string; headers: Array<{ key: string; value: string }> }>
  > {
    return Promise.resolve([
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://checkout.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://*.sanity.io",
              "frame-src 'self' https://js.stripe.com https://checkout.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Strict Transport Security (only in production)
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains; preload",
                },
              ]
            : []),
        ],
      },
    ]);
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
    ],
    // Enable webpack bundle analyzer
    ...(process.env.ANALYZE === "true" && {
      webpack: (config: unknown): unknown => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
        (config as { plugins: unknown[] }).plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
          })
        );
        return config;
      },
    }),
  },

  // Server external packages
  serverExternalPackages: ["@sanity/client"],

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // Remove unused CSS
    styledComponents: true,
  },

  // Webpack configuration for bundle optimization
  webpack: (config, { dev, isServer }): unknown => {
    // Add fallbacks for Node.js modules (platform-neutral)
    if (!dev) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
      };
    }

    // Optimize bundle size
    if (!dev && !isServer) {
      // Enable tree shaking
      const optimization = config.optimization || {};
      (config as { optimization: unknown }).optimization = {
        ...optimization,
        usedExports: true,
        sideEffects: false,
        // Split chunks for better caching
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              enforce: true,
            },
          },
        },
      };
    }

    // Optimize images (only in production)
    if (!dev && !isServer) {
      (config as { module: { rules: unknown[] } }).module.rules.push({
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      });
    }

    return config;
  },

  // Output configuration
  output: "standalone",

  // Enable compression
  compress: true,

  // Power by header
  poweredByHeader: false,

  // Trailing slash
  trailingSlash: false,

  // Base path (if needed)
  // basePath: "",

  // Asset prefix (if needed)
  // assetPrefix: "",

  // Redirects for security
  redirects(): Promise<
    Array<{
      source: string;
      has: Array<{ type: string; key: string; value: string }>;
      destination: string;
      permanent: boolean;
    }>
  > {
    return Promise.resolve([
      // Redirect HTTP to HTTPS in production
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/:path*",
              has: [
                {
                  type: "header",
                  key: "x-forwarded-proto",
                  value: "http",
                },
              ],
              destination: "https://$host/:path*",
              permanent: true,
            },
          ]
        : []),
    ]);
  },

  // Rewrites for API optimization
  rewrites(): Promise<Array<{ source: string; destination: string }>> {
    return Promise.resolve([
      // Cache static assets
      {
        source: "/static/:path*",
        destination: "/api/static/:path*",
      },
    ]);
  },
};

export default nextConfig;
