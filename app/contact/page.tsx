"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"
import { useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: "", email: "", message: "" })
    }, 3000)
  }

  const socialLinks = [
    { icon: Mail, href: "mailto:rence@example.com", label: "Email" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="mb-16 text-center">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6">
            Let&apos;s <span className="text-primary glow-text">Connect</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
            Have a question or want to work together? Get in touch, and I&apos;ll respond as soon as possible.
          </motion.p>
        </motion.section>

        {/* Form Section */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="p-8 border border-border rounded bg-card space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-mono text-primary">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-mono text-primary">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-mono text-primary">
                Message
              </label>
              <textarea
                id="message"
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all font-mono text-sm font-semibold"
            >
              {submitted ? "✓ Message Sent!" : "Send Message"}
            </motion.button>
          </motion.form>
        </motion.section>

        {/* Social Links */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center border-t border-border pt-16"
        >
          <p className="text-muted-foreground mb-8">Or reach out directly on social media</p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 border border-border rounded hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
