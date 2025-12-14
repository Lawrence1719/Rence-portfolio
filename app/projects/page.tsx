"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicProjects } from "@/lib/actions/projects";
import type { Project } from "@/lib/types/project";

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
    async function fetchProjects() {
      const { projects } = await getPublicProjects();
      setProjects(projects);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  if (loading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-12"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Featured <span className="text-primary glow-text">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            A selection of projects I&apos;ve worked on, showcasing my skills in
            full-stack development and design.
          </motion.p>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-8 p-8 border border-primary/20 rounded-lg bg-card hover:border-primary/40 transition-all">
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/50 rounded w-fit text-xs font-mono text-primary mb-4">
                  ⭐ Featured Project
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {featuredProject.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredProject.short_description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-primary/10 border border-primary text-primary rounded text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {featuredProject.status === "In Progress" ? (
                  <div className="flex items-center justify-center py-3 px-6 text-sm font-mono text-muted-foreground border border-dashed border-border rounded bg-muted/30">
                    🚧 Work in Progress
                  </div>
                ) : (
                  <div className="flex gap-4">
                    {featuredProject.live_demo_url && (
                      <Link
                        href={featuredProject.live_demo_url}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all text-sm font-mono"
                      >
                        View Live
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    {featuredProject.github_url && (
                      <Link
                        href={featuredProject.github_url}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-all text-sm font-mono"
                      >
                        Code
                        <Github className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div className="relative flex items-center justify-center p-4 bg-linear-to-br from-primary/10 to-primary/5 rounded border border-border/50 overflow-hidden">
                {featuredProject.image_url ? (
                  <img
                    src={featuredProject.image_url}
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
        {otherProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-6 border border-border rounded bg-card hover:shadow-lg hover:shadow-primary/10 transition-all flex flex-col"
              >
                <Link href={`/projects/${project.slug}`} className="group">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {project.short_description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-primary/10 border border-primary text-primary rounded text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.status === "In Progress" ? (
                  <div className="flex items-center justify-center py-2 text-xs font-mono text-muted-foreground border border-dashed border-border rounded">
                    🚧 Work in Progress
                  </div>
                ) : (
                  <div className="flex gap-3">
                    {project.live_demo_url ? (
                      <Link
                        href={project.live_demo_url}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all text-xs font-mono"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded hover:shadow-lg hover:shadow-primary/50 transition-all text-xs font-mono"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                    {project.github_url && (
                      <Link
                        href={project.github_url}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-all text-xs font-mono"
                      >
                        Code
                        <Github className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.section>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center py-20"
          >
            <Code2 className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Projects Yet</h2>
            <p className="text-muted-foreground">
              Check back soon for exciting new projects!
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
    </motion.div>
  );
}
