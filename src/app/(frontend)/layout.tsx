import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// ⭐ NEW: fetch CMS globals
async function getGlobals() {
  const base = getServerSideURL()

  const [headerRes, footerRes] = await Promise.all([
    fetch(`${base}/api/globals/header`, { cache: 'no-store' }),
    fetch(`${base}/api/globals/footer`, { cache: 'no-store' }),
  ])

  const header = await headerRes.json()
  const footer = await footerRes.json()

  return { header, footer }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  // ⭐ FETCH FROM PAYLOAD CMS
  const { header, footer } = await getGlobals()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* ⭐ SEND CMS DATA TO HEADER */}
          <Header data={header} />

          {children}

          {/* ⭐ SEND CMS DATA TO FOOTER */}
          <Footer data={footer} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
