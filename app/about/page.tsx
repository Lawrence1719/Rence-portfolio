"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, Palette, Github, Linkedin } from "lucide-react"

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
    { category: "Frontend", icon: Palette, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", icon: Database, items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"] },
    { category: "Tools", icon: Code2, items: ["Git", "Docker", "Vercel", "AWS", "CI/CD"] },
  ]

  const experience = [
    {
      year: "2023 - Present",
      role: "Senior Full Stack Developer",
      company: "Tech Startup Inc.",
      desc: "Led development of customer-facing applications using React and Node.js, improving performance by 40%.",
    },
    {
      year: "2021 - 2023",
      role: "Full Stack Developer",
      company: "Digital Agency Co.",
      desc: "Built and maintained 15+ web applications for clients across various industries.",
    },
    {
      year: "2019 - 2021",
      role: "Junior Developer",
      company: "StartUp Hub",
      desc: "Developed React components and APIs, collaborated with cross-functional teams.",
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
                I&apos;m a passionate full-stack developer with 5+ years of experience building web applications. I
                started my journey in tech with a curiosity about how things work on the internet.
              </p>
              <p>
                Today, I specialize in creating beautiful, performant, and scalable applications. I love the
                intersection of design and development, where pixel-perfect interfaces meet clean, efficient code.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source,
                or sharing knowledge with the developer community.
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
            I&apos;m open to opportunities and always interested in collaborating on interesting projects.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
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
