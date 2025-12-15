import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { AuroraBackground } from "@/components/aurora-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rence | Full Stack Developer",
  description: "CLI-inspired portfolio showcasing projects, skills, and experience.",
  icons: {
    icon: '/images/Logo.png', // Standard favicon path
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
          <AuroraBackground />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
