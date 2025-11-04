import type { Metadata } from "next";
import { Onest, Figtree, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { AudioPlayerProvider } from "../contexts/AudioPlayerContext";

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
  title: "Manobendra Mandal | Blockchain & Full Stack Developer",
  description: "Web3 and full-stack developer. Won 10 hackathons, creating decentralized platforms in fintech, AI, and edtech.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/avatar.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
            className={`${onest.variable} ${figtree.variable} ${caveat.variable} antialiased px-6 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 lg:px-78 lg:py-10 bg-[var(--background)] text-[var(--foreground)]`}
      >
        <ThemeProvider>
          <AudioPlayerProvider>
            {children}
          </AudioPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
