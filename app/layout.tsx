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
  description: "My porftolio",
   icons: {
    icon: [
      { url: '/images/Logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/Logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/Logo.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/images/Logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
