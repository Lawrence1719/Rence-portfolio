"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectBySlug } from "@/lib/actions/projects";
import type { Project } from "@/lib/types/project";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      const { project, error } = await getProjectBySlug(slug);
      if (error) {
        setError(error);
      } else {
        setProject(project);
      }
      setLoading(false);
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge>{project.status}</Badge>
              {project.featured && (
                <Badge variant="secondary">⭐ Featured</Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {project.short_description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {project.live_demo_url && (
              <Button asChild size="lg">
                <Link href={project.live_demo_url} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </Link>
              </Button>
            )}
            {project.github_url && (
              <Button asChild variant="outline" size="lg">
                <Link href={project.github_url} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            )}
          </div>

          {/* Project Image */}
          {project.image_url && (
            <Card>
              <CardContent className="p-0">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          )}

          {/* Tech Stack */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Technologies Used</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.full_description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Project Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Created on {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="border-t pt-8 text-center">
            <h3 className="text-xl font-bold mb-2">Interested in working together?</h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss your project and create something amazing.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
