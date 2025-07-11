import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Manobendra Mandal - Full Stack Developer & Blockchain Enthusiast',
  description: 'Passionate full-stack developer specializing in React, Next.js, and Solana blockchain development. Currently exploring Web3 technologies and building innovative solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-work-sans">{children}</body>
    </html>
  )
}