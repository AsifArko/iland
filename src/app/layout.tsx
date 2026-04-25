import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/error-boundary";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClientAnalytics } from "@/components/analytics/client-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iLand - Source Code Selling Platform",
  description:
    "A comprehensive source code selling platform for solo software engineers. Features secure downloads, payment processing, analytics, and a modern tech stack built for developers.",
  keywords: [
    "source code marketplace",
    "code selling platform",
    "developer tools",
    "software marketplace",
    "secure downloads",
    "payment processing",
  ],
  authors: [{ name: "iLand Team" }],
  icons: {
    icon: "/iland-icon.svg",
    shortcut: "/iland-icon.svg",
    apple: "/iland-icon.svg",
  },
  openGraph: {
    title: "iLand - Source Code Selling Platform",
    description:
      "A comprehensive source code selling platform for solo software engineers",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "iLand - Source Code Selling Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iLand - Source Code Selling Platform",
    description:
      "A comprehensive source code selling platform for solo software engineers",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>{children}</ErrorBoundary>
        <SpeedInsights />
        <ClientAnalytics
          sessionId={`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`}
        />
      </body>
    </html>
  );
}
