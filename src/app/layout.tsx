import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import NeonCursor from "@/components/NeonCursor";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noorululama.org';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#059669' },
    { media: '(prefers-color-scheme: dark)', color: '#047857' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Noorul Ulama - Islamic Excellence & Education | Jamia Nooriyya Arabiyya",
    template: "%s | Noorul Ulama",
  },
  description: "Noorul Ulama Students Association at Jamia Nooriyya Arabiyya Pattikkad - Empowering students through Islamic education, cultural heritage, and community service since 1985.",
  keywords: [
    "Noorul Ulama",
    "Jamia Nooriyya Arabiyya",
    "Islamic Education",
    "Pattikkad",
    "Student Association",
    "Kerala Islamic Education",
    "Malappuram",
    "Arabic Studies",
    "Islamic Scholarship",
    "Student Organization",
    "Community Service",
    "نور العلماء",
  ],
  authors: [
    { name: "Noorul Ulama Students Association" },
    { name: "Jamia Nooriyya Arabiyya Pattikkad" },
  ],
  creator: "Noorul Ulama Students Association",
  publisher: "Noorul Ulama Students Association",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Noorul Ulama - Islamic Excellence & Education",
    description: "Empowering students through Islamic knowledge, cultural preservation, and community service at Jamia Nooriyya Arabiyya Pattikkad.",
    siteName: "Noorul Ulama Students Association",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Noorul Ulama Students Association",
      },
      {
        url: `${siteUrl}/og-image-square.jpg`,
        width: 1200,
        height: 1200,
        alt: "Noorul Ulama Students Association",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noorul Ulama - Islamic Excellence & Education",
    description: "Empowering students through Islamic knowledge and community service",
    creator: "@noorululama",
    images: [`${siteUrl}/twitter-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'KVXemRNq5bBTJadrMPQXLbSxFtPnazEmvfX6uguvd5U',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <TooltipProvider delayDuration={0}>
          <NeonCursor />
          {children}
          <Navbar />
        </TooltipProvider>
      </body>
    </html>
  );
}
