import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import FooterButtons from '@/src/components/small/footer'
import HeaderButtons from '@/src/components/small/header'
import Script from 'next/script'

export const runtime = 'edge'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export const metadata: Metadata = {
  title: 'Maretol Base',
  description: 'Maretolのホームページ',
  openGraph: {
    title: 'Maretol Base',
    description: 'Maretolのホームページ',
    type: 'website',
    url: process.env.HOST_NAME || 'https://www.maretol.com/',
    siteName: 'Maretol Base',
    images: [],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <Script
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "e7ad45139e61492b95a8686432f438e4"}'
      />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased bg-gray-300',
          fontSans.variable,
        )}
      >
        <div className="flex justify-center pb-10" id="top">
          <div className="max-w-[1500px] w-full mx-6">
            <div className="my-10">
              <div className="mb-2">
                <Link href="/">
                  <Button variant={'link'}>
                    <h1 className="">Maretol Base</h1>
                  </Button>
                </Link>
              </div>
              <HeaderButtons />
            </div>
            {children}
            <div className="my-10">
              <footer className="text-center text-sm text-gray-500">
                <FooterButtons />
                <div>
                  © 2024 Maretol
                  <br />
                  DO NOT REPOST WITHOUT PERMISSION
                </div>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
