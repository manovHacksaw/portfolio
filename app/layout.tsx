import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import { AudioPlayerProvider } from "../contexts/AudioPlayerContext";
import ErrorBoundaryWrapper from "../components/ui/ErrorBoundaryWrapper";
import StructuredData from "../components/structured-data/StructuredData";
import PageTransition from "../components/motion/PageTransition";
import CustomCursor from "../components/motion/CustomCursor";
import BackToTop from "../components/BackToTop";
// Validate environment variables (only runs in development/server)
import "../lib/env-validation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Manobendra Mandal | Web3 & Blockchain Developer",
    template: "%s | Manobendra Mandal",
  },
  description: "Web3 and blockchain developer building on Ethereum, Solana, Starknet, and Celo. Winner of 10+ hackathons across fintech, DeFi, and edtech.",
  keywords: ["Web3 Developer", "Blockchain Developer", "Full Stack Developer", "Solidity", "Rust", "Solana", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Manobendra Mandal" }],
  creator: "Manobendra Mandal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    siteName: "Manobendra Mandal Portfolio",
    title: "Manobendra Mandal | Web3 & Blockchain Developer",
    description: "Web3 and blockchain developer building on Ethereum, Solana, Starknet, and Celo. Winner of 10+ hackathons across fintech, DeFi, and edtech.",
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Manobendra Mandal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manobendra Mandal | Web3 & Blockchain Developer",
    description: "Web3 and blockchain developer building on Ethereum, Solana, Starknet, and Celo. Winner of 10+ hackathons across fintech, DeFi, and edtech.",
    images: ["/avatar.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/avatar.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-6 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 lg:px-78 lg:py-10 bg-[var(--background)] text-[var(--foreground)]`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="absolute left-[-9999px] w-1 h-1 overflow-hidden focus:left-4 focus:top-4 focus:z-50 focus:w-auto focus:h-auto focus:px-4 focus:py-2 focus:bg-[var(--foreground)] focus:text-[var(--background)] focus:rounded-lg focus:font-medium focus:outline-none focus:ring-2 focus:ring-[var(--nav-accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
        >
          Skip to main content
        </a>
        {/* Structured Data (JSON-LD) for SEO */}
        <StructuredData />
        <ThemeProvider>
          <AudioPlayerProvider>
            <ErrorBoundaryWrapper>
              <CustomCursor />
              <main id="main-content" tabIndex={-1}>
                <PageTransition>{children}</PageTransition>
              </main>
              <BackToTop />
            </ErrorBoundaryWrapper>
          </AudioPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
