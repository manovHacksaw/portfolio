import type { Metadata, Viewport } from "next";
import { Onest, Figtree, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import { AudioPlayerProvider } from "../contexts/AudioPlayerContext";
import ErrorBoundaryWrapper from "../components/ui/ErrorBoundaryWrapper";
import StructuredData from "../components/structured-data/StructuredData";
// Validate environment variables (only runs in development/server)
import "../lib/env-validation";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Manobendra Mandal | Blockchain & Full Stack Developer",
    template: "%s | Manobendra Mandal",
  },
  description: "Web3 and full-stack developer. Won 10 hackathons, creating decentralized platforms in fintech, AI, and edtech.",
  keywords: ["Blockchain Developer", "Full Stack Developer", "Web3", "React", "Next.js", "Solidity", "Portfolio"],
  authors: [{ name: "Manobendra Mandal" }],
  creator: "Manobendra Mandal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    siteName: "Manobendra Mandal Portfolio",
    title: "Manobendra Mandal | Blockchain & Full Stack Developer",
    description: "Web3 and full-stack developer. Won 10 hackathons, creating decentralized platforms in fintech, AI, and edtech.",
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
    title: "Manobendra Mandal | Blockchain & Full Stack Developer",
    description: "Web3 and full-stack developer. Won 10 hackathons, creating decentralized platforms in fintech, AI, and edtech.",
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
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Fontshare for faster font loading */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
            className={`${onest.variable} ${figtree.variable} ${caveat.variable} antialiased px-6 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 lg:px-78 lg:py-10 bg-[var(--background)] text-[var(--foreground)]`}
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
              <main id="main-content" tabIndex={-1}>
                {children}
              </main>
            </ErrorBoundaryWrapper>
          </AudioPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
