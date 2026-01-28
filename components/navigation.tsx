"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { TerminalButton } from "./terminal-button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/resume", label: "resume" },
    { href: "/contact", label: "contact" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-xl font-bold text-primary glow-text" onClick={closeMenu}>
            {"<"} rence {"/>"}{" "}
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <motion.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded text-sm font-mono transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  $ {link.label}
                </Link>
              </motion.div>
            )
          })}
          <TerminalButton />
        </div>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 text-primary hover:text-primary/80 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded text-sm font-mono transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      $ {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}