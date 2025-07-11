import type { Metadata } from 'next'
import { poppins, workSans, firaSans, jetbrainsMono, rubik, ibmPlexSans, spaceGrotesk } from "./fonts"
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" className={`
      ${poppins.variable} 
      ${workSans.variable} 
      ${firaSans.variable} 
      ${jetbrainsMono.variable} 
      ${rubik.variable} 
      ${ibmPlexSans.variable} 
      ${spaceGrotesk.variable}
    `}>
      <body >{children}</body>
    </html>
  )
}