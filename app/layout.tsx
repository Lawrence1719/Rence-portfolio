import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rence | Full Stack Developer",
  description: "My portfolio",
  icons: {
    icon: [
      { url: 'images/favicon.ico', sizes: 'any' },
      { url: 'images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: 'images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        url: 'images/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: 'images/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
  manifest: 'images/site.webmanifest', // Link your webmanifest file
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}