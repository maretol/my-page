import React from 'react'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import FooterButtons from '@/src/components/small/footer'
import HeaderButtons from '@/src/components/small/header'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Maretol Base',
  description: 'Maretolのホームページ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
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
