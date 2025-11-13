"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { motion } from "framer-motion"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/contact", label: "contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-xl font-bold text-primary glow-text">
            {"<"} rence {"/>"}{" "}
          </Link>
        </motion.div>

        <div className="flex items-center gap-1">
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
        </div>

        <ThemeToggle />
      </div>
    </nav>
  )
}
