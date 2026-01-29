import { Suspense } from "react";
import { getProjects } from "./actions";
// Import project management components
import { ProjectForm } from "./components/project-form";
import { ProjectsList } from "./components/projects-list";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectsPageClient } from "./components/projects-page-client";

export default function AdminProjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading projects...</div>}>
      <ProjectsPageClient />
    </Suspense>
  );
}