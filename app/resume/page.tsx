"use client"

import { motion } from "framer-motion"
import { Download, Mail, Github, Linkedin, MapPin, Calendar } from "lucide-react"

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

export default function Resume() {
  const handleDownload = () => {
    // This will download the PDF from the public folder
    const link = document.createElement('a')
    link.href = '/resume.pdf' // Make sure to add your resume.pdf to the public folder
    link.download = 'Lawrence_Dizon_Resume.pdf'
    link.click()
  }

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "Cavite State University - Trece Martires Campus",
      location: "Trece Martires, Philippines",
      period: "2021 - 2025",
      achievements: [
        "Focus on Full-Stack Web Development",
        "Capstone Project: IoT-Enabled Inventory Management System"
      ]
    }
  ]

  const experience = [
    {
      title: "Student Developer (Capstone Project)",
      company: "Never Stop Dreaming Trading",
      location: "Cavite, Philippines",
      period: "2024 - Present",
      description: [
        "Developed full-stack IoT-powered inventory and e-commerce platform",
        "Built RESTful APIs using Node.js and Express.js with Supabase integration",
        "Implemented responsive UI with React, TypeScript, and Tailwind CSS",
        "Integrated real-time IoT sensors for automated stock monitoring"
      ]
    },
    {
      title: "Freelance Developer",
      company: "Personal Projects",
      location: "Remote",
      period: "2023 - 2024",
      description: [
        "Created CalculaStats - Statistics calculator using React and TypeScript",
        "Built ArraySort - Interactive sorting visualization tool",
        "Deployed multiple projects to Vercel with CI/CD integration"
      ]
    }
  ]

  const skills = {
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    "Backend": ["Node.js", "Express.js", "Supabase", "PostgreSQL", "REST APIs", "JWT"],
    "Tools & Others": ["Git", "Vite", "Vercel", "React Hook Form", "Zod", "Axios"]
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Download Button */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl font-bold mb-2">
                Lawrence <span className="text-primary">Dizon</span>
              </h1>
              <p className="text-xl text-muted-foreground">Full-Stack Developer</p>
            </motion.div>
            
            <motion.button
              variants={itemVariants}
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all font-mono text-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </motion.button>
          </div>

          {/* Contact Info */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 text-sm text-muted-foreground"
          >
            <a 
              href="mailto:lawrence.dizon@proton.me"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              lawrence.dizon@proton.me
            </a>
            <a 
              href="https://github.com/Lawrence1719"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              github.com/Lawrence1719
            </a>
            <a 
              href="https://www.linkedin.com/in/lawrence-dizon-343899299"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Manila, Philippines
            </span>
          </motion.div>
        </motion.div>

        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 p-6 border border-border rounded bg-card"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">Professional Summary</h2>
          <p className="text-muted-foreground leading-relaxed">
            Passionate IT student and full-stack developer with hands-on experience in building modern web applications 
            using the PERN stack (PostgreSQL, Express, React, Node.js). Proficient in TypeScript, Next.js, and Supabase. 
            Currently developing an IoT-enabled inventory management system as a capstone project. Strong focus on creating 
            responsive, user-friendly interfaces and robust backend solutions.
          </p>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border-l-2 border-primary pl-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-primary font-mono text-sm">@ {exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 md:mt-0">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </p>
                <ul className="space-y-2">
                  {exp.description.map((item, j) => (
                    <li key={j} className="text-muted-foreground text-sm flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">Education</h2>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="border-l-2 border-primary pl-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-primary font-mono text-sm">{edu.school}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 md:mt-0">
                  <Calendar className="w-4 h-4" />
                  {edu.period}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {edu.location}
              </p>
              <ul className="space-y-2">
                {edu.achievements.map((item, j) => (
                  <li key={j} className="text-muted-foreground text-sm flex gap-2">
                    <span className="text-primary mt-1">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 border border-border rounded bg-card"
              >
                <h3 className="font-bold mb-3 text-primary text-sm">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-primary/10 border border-primary text-primary rounded text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-border pt-12 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-muted-foreground mb-8">
            I&apos;m always open to discussing new opportunities and projects.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all font-mono text-sm"
          >
            Get in Touch
          </a>
        </motion.section>
      </div>
    </div>
  )
}