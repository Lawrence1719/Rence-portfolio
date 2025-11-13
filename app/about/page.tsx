"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, Palette, Github, Linkedin, Wrench } from "lucide-react"

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

export default function About() {
  const skills = [
    {
      category: "Frontend",
      icon: Palette,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    },
    {
      category: "Backend",
      icon: Database,
      items: ["Node.js", "Express.js", "Supabase", "PostgreSQL", "REST APIs", "JWT"],
    },
    {
      category: "Tools & Others",
      icon: Wrench,
      items: ["Git", "Vite", "Vercel", "React Hook Form", "Zod", "Axios"],
    },
  ]

  const experience = [
    {
      year: "2024 - Present",
      role: "Student Developer",
      company: "Never Stop Dreaming Trading (Capstone Project)",
      desc: "Building a full-stack IoT-powered inventory and e-commerce system using React, TypeScript, Tailwind CSS, Supabase, Node.js, and Express.",
    },
    {
      year: "2023 - 2024",
      role: "Personal Projects",
      company: "Self-Learning Journey",
      desc: "Created and deployed web applications including CalculaStats (Statistics Calculator) and ArraySort visualizer using React, TypeScript, Vite, and modern web technologies.",
    },
  ]

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* About Section */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="mb-20">
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              About <span className="text-primary glow-text">Me</span>
            </h1>
            <div className="space-y-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              <p>
                I&apos;m an IT student and a hands-on developer who enjoys working with modern web technologies
                — especially <span className="text-primary font-semibold">React</span>, <span className="text-primary font-semibold">TypeScript</span>, 
                and the <span className="text-primary font-semibold">PERN stack</span> (PostgreSQL, Express, React, Node.js).
                I&apos;ve also been exploring <span className="text-primary font-semibold">Next.js</span> and <span className="text-primary font-semibold">Supabase</span> for 
                modern full-stack development.
              </p>
              <p>
                I like building things that look good and work well — from simple tools to interactive web apps. Most
                of what I've learned comes from experimenting, debugging, and vibing with code until it works.
              </p>
              <p>
                My goal is to keep growing as a full-stack developer and eventually contribute to real-world projects
                that make an impact.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 border-t border-border pt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills & Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="p-6 border border-border rounded bg-card hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <skillGroup.icon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-primary/10 border-primary text-primary hover:bg-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 border-t border-border pt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 pb-8 border-b border-border last:border-b-0"
              >
                <div className="md:w-32 flex-shrink-0">
                  <p className="text-primary font-mono font-bold text-sm">{exp.year}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-primary font-mono text-sm mb-2">@ {exp.company}</p>
                  <p className="text-muted-foreground">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
          <p className="text-muted-foreground mb-8">
            I&apos;m open to collaboration, learning opportunities, and fun coding projects.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/Lawrence1719"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-border rounded hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 border border-border rounded hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}