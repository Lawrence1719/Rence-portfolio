"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import type { ReactNode } from "react"

interface ThemeProviderProps {
  children: ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
}: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemeProvider>
  )
}
