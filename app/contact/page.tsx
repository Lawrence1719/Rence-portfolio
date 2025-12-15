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
    website: "", // Honeypot field
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log('Sending form data:', formState)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()
      console.log('Response:', data)

      if (!response.ok) {
        // Handle rate limit error specifically
        if (response.status === 429) {
          throw new Error(data.error || 'Too many attempts. Please try again in an hour.')
        }
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormState({ name: "", email: "", message: "", website: "" })
      }, 5000) // Increased timeout so user can see success message longer
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  const socialLinks = [
    { icon: Mail, href: "mailto:lawrence.dizon@proton.me", label: "Email" },
    { icon: Github, href: "https://github.com/Lawrence1719", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/lawrence-dizon-343899299", label: "LinkedIn" },
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
            className="p-8 border border-border rounded bg-card space-y-6 relative"
          >
            {/* Honeypot Field - Hidden from real users */}
            <div className="absolute left-[-9999px] opacity-0">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formState.website}
                onChange={(e) => setFormState({ ...formState, website: e.target.value })}
              />
            </div>

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
                disabled={isLoading}
                minLength={2}
                maxLength={100}
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
                disabled={isLoading}
                maxLength={100}
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
                disabled={isLoading}
                minLength={10}
                maxLength={2000}
              />
              <div className="text-xs text-muted-foreground text-right">
                {formState.message.length}/2000
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border border-red-500/50 bg-red-500/10 rounded text-red-500 text-sm"
              >
                {error}
              </motion.div>
            )}

            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border border-green-500/50 bg-green-500/10 rounded text-green-500 text-sm"
              >
                ✓ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              disabled={isLoading || submitted}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all font-mono text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                  Sending...
                </span>
              ) : submitted ? (
                "✓ Message Sent!"
              ) : (
                "Send Message"
              )}
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
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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