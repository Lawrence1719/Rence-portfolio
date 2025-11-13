"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Code2 } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory, payment processing, and analytics dashboard.",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    link: "#",
    github: "#",
    featured: true,
  },
  {
    title: "Task Management App",
    description: "Collaborative task management with real-time updates, team features, and notifications.",
    tech: ["React", "Firebase", "Framer Motion", "Tailwind CSS"],
    link: "#",
    github: "#",
  },
  {
    title: "Design System",
    description: "Comprehensive component library with Storybook documentation and accessible components.",
    tech: ["React", "Storybook", "Tailwind CSS", "TypeScript"],
    link: "#",
    github: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization dashboard with custom charts and interactive reports.",
    tech: ["Next.js", "Recharts", "PostgreSQL", "Vercel"],
    link: "#",
    github: "#",
  },
  {
    title: "Mobile App",
    description: "Cross-platform mobile application for task tracking with offline support.",
    tech: ["React Native", "Redux", "TypeScript", "Firebase"],
    link: "#",
    github: "#",
  },
  {
    title: "API Documentation",
    description: "Interactive API documentation with live examples and code generation.",
    tech: ["Next.js", "MDX", "OpenAPI", "Tailwind CSS"],
    link: "#",
    github: "#",
  },
]

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

export default function Projects() {
  const featuredProject = projects.find((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-20">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6">
            Featured <span className="text-primary glow-text">Projects</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl">
            A selection of projects I&apos;ve worked on, showcasing my skills in full-stack development and design.
          </motion.p>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20 p-8 border border-border rounded-lg bg-card hover:shadow-lg hover:shadow-primary/10 transition-all"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">{featuredProject.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-primary/10 border border-primary text-primary rounded text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={featuredProject.link}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all text-sm font-mono"
                  >
                    View Live
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={featuredProject.github}
                    className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-all text-sm font-mono"
                  >
                    Code
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded border border-border/50">
                <Code2 className="w-20 h-20 text-primary/50" />
              </div>
            </div>
          </motion.section>
        )}

        {/* Other Projects */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherProjects.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-6 border border-border rounded bg-card hover:shadow-lg hover:shadow-primary/10 transition-all flex flex-col"
            >
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-primary/10 border border-primary text-primary rounded text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={project.link}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all text-xs font-mono"
                >
                  View
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={project.github}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-all text-xs font-mono"
                >
                  Code
                  <Github className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 border-t border-border pt-20 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Have an idea?</h2>
          <p className="text-muted-foreground mb-8">
            Let&apos;s discuss your next project and build something great together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all font-mono text-sm"
          >
            Get in Touch
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.section>
      </div>
    </div>
  )
}
