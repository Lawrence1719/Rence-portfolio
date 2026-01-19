"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProjects, searchProjects } from "../actions";
import { ProjectForm } from "./project-form";
import { ProjectsList } from "./projects-list";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/types/project";
import { ProjectsGreeting } from "@/components/projects-greeting";

const PROJECTS_PER_PAGE = 6;

export function ProjectsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || "";

  const [projects, setProjects] = useState<Project[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let result;
      if (searchQuery) {
        result = await searchProjects(searchQuery, currentPage, PROJECTS_PER_PAGE);
      } else {
        result = await getProjects(currentPage, PROJECTS_PER_PAGE);
      }
      setProjects(result.projects);
      setTotalProjects(result.total);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, searchQuery]);

  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/admin/projects?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to first page on search
    router.push(`/admin/projects?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchInput("");
    handleSearch("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Back Button */}
      <div className="flex items-center justify-start">
        <Link href="/admin">
          <Button
            variant="outline"
            size="sm"
            className="font-mono text-xs h-8 gap-2"
          >
            <ArrowLeft className="size-3" />
            back to dashboard
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-wide">
            projects
          </h2>
          <ProjectsGreeting />
        </div>
      </div>

      {/* Search Bar */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="search projects..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchInput);
                }
              }}
              className="pl-10 pr-10 font-mono text-sm"
            />
            {searchInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button
            onClick={() => handleSearch(searchInput)}
            size="sm"
            className="font-mono text-xs h-8"
          >
            search
          </Button>
          {searchQuery && (
            <div className="text-sm text-muted-foreground font-mono">
              {totalProjects} result{totalProjects !== 1 ? 's' : ''} for "{searchQuery}"
            </div>
          )}
        </div>
      </Card>

      {/* Add Project Form */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="space-y-4">
          <h3 className="text-lg font-mono font-semibold text-foreground">
            add new project
          </h3>
          <ProjectForm mode="create" onSuccess={fetchProjects} />
        </div>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-mono font-semibold text-foreground">
            {searchQuery ? 'search results' : 'all projects'} ({totalProjects})
          </h3>
          {totalPages > 1 && (
            <div className="text-sm text-muted-foreground font-mono">
              page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        <Suspense fallback={<ProjectsListSkeleton />}>
          {loading ? (
            <ProjectsListSkeleton />
          ) : (
            <ProjectsList projects={projects} onRefresh={fetchProjects} />
          )}
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="font-mono text-xs h-8"
            >
              <ChevronLeft className="size-3 mr-1" />
              previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="font-mono text-xs h-8 w-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="font-mono text-xs h-8"
            >
              next
              <ChevronRight className="size-3 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectsListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: PROJECTS_PER_PAGE }).map((_, i) => (
        <Card key={i} className="p-6 border-border/50 bg-card/50">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}