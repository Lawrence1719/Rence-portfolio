"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Project } from "@/lib/types/project";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const featuredProject = projects.find((p) => p.is_featured && p.is_visible);
  const otherProjects = projects.filter((p) => !p.is_featured && p.is_visible);

  if (loading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Featured <span className="text-primary glow-text">Projects</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            A selection of projects I&apos;ve worked on, showcasing my skills in
            full-stack development and design.
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
                <h2 className="text-3xl font-bold mb-4">
                  {featuredProject.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 border border-primary text-primary rounded text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {featuredProject.status === "Work in Progress" ? (
                  <div className="flex items-center justify-center py-3 px-6 text-sm font-mono text-muted-foreground border border-dashed border-border rounded bg-muted/30">
                    🚧 Work in Progress
                  </div>
                ) : (
                  <div className="flex gap-4">
                    {featuredProject.links.Live && (
                      <a
                        href={featuredProject.links.Live}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all text-sm font-mono"
                      >
                        View Live
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {featuredProject.links.Code && (
                      <a
                        href={featuredProject.links.Code}
                        className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-all text-sm font-mono"
                      >
                        Code
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="relative flex items-center justify-center p-4 bg-linear-to-br from-primary/10 to-primary/5 rounded border border-border/50 overflow-hidden">
                {featuredProject.thumbnail_url ? (
                  <img
                    src={featuredProject.thumbnail_url}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <Code2 className="w-20 h-20 text-primary/50" />
                )}
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
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-6 border border-border rounded bg-card hover:shadow-lg hover:shadow-primary/10 transition-all flex flex-col"
            >
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 border border-primary text-primary rounded text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.status === "Work in Progress" ? (
                <div className="flex items-center justify-center py-2 text-xs font-mono text-muted-foreground border border-dashed border-border rounded">
                  🚧 Work in Progress
                </div>
              ) : (
                <div className="flex gap-3">
                  {project.links.Live && (
                    <a
                      href={project.links.Live}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all text-xs font-mono"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.links.Code && (
                    <a
                      href={project.links.Code}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-all text-xs font-mono"
                    >
                      Code
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
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
            Let&apos;s discuss your next project and build something great
            together.
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
  );
}
