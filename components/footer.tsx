"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:rence@example.com", label: "Email" },
  ]

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground font-mono">
              {"// "}Built with Next.js, Framer Motion & Tailwind CSS
            </p>
            <p className="text-xs text-muted-foreground mt-2">© 2025 Rence. All rights reserved.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="p-2 rounded border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
