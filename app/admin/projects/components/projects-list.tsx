"use client";

import { useState } from "react";
import { Project } from "@/lib/types/project";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Eye, EyeOff, ExternalLink, Github, Star, CheckSquare, Square } from "lucide-react";
import { deleteProject, toggleProjectVisibility, bulkDeleteProjects, bulkToggleVisibility, bulkToggleFeatured } from "../actions";
import { ProjectForm } from "./project-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProjectsListProps {
  projects: Project[];
  onRefresh?: () => void;
}

export function ProjectsList({ projects, onRefresh }: ProjectsListProps) {
  const router = useRouter();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());

  const handleDelete = async (id: string) => {
    const project = projects.find(p => p.id === id);
    try {
      await deleteProject(id);
      toast.success(`Project "${project?.title || 'Unknown'}" deleted successfully!`);
      if (onRefresh) {
        onRefresh();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error(`Failed to delete project "${project?.title || 'Unknown'}". Please try again.`);
    }
  };

  const handleToggleVisibility = async (id: string) => {
    const project = projects.find(p => p.id === id);
    try {
      await toggleProjectVisibility(id);
      toast.success(`Project "${project?.title || 'Unknown'}" visibility updated!`);
      if (onRefresh) {
        onRefresh();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to toggle visibility:", error);
      toast.error(`Failed to update project "${project?.title || 'Unknown'}" visibility. Please try again.`);
    }
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditingProject(null);
    if (onRefresh) {
      onRefresh();
    } else {
      router.refresh();
    }
  };

  const handleSelectProject = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedProjects);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedProjects(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProjects(new Set(projects.map(p => p.id)));
    } else {
      setSelectedProjects(new Set());
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProjects.size === 0) return;

    try {
      await bulkDeleteProjects(Array.from(selectedProjects));
      toast.success(`Deleted ${selectedProjects.size} project${selectedProjects.size > 1 ? 's' : ''} successfully!`);
      setSelectedProjects(new Set());
      if (onRefresh) {
        onRefresh();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to bulk delete projects:", error);
      toast.error("Failed to delete selected projects. Please try again.");
    }
  };

  const handleBulkVisibility = async (visible: boolean) => {
    if (selectedProjects.size === 0) return;

    try {
      await bulkToggleVisibility(Array.from(selectedProjects), visible);
      toast.success(`Updated visibility for ${selectedProjects.size} project${selectedProjects.size > 1 ? 's' : ''}!`);
      setSelectedProjects(new Set());
      if (onRefresh) {
        onRefresh();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to bulk toggle visibility:", error);
      toast.error("Failed to update project visibility. Please try again.");
    }
  };

  const handleBulkFeatured = async (featured: boolean) => {
    if (selectedProjects.size === 0) return;

    try {
      await bulkToggleFeatured(Array.from(selectedProjects), featured);
      toast.success(`Updated featured status for ${selectedProjects.size} project${selectedProjects.size > 1 ? 's' : ''}!`);
      setSelectedProjects(new Set());
      if (onRefresh) {
        onRefresh();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to bulk toggle featured:", error);
      toast.error("Failed to update project featured status. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "Work in Progress":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "Hidden":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      case "Archived":
        return "bg-red-500/10 text-red-500 border-red-500/30";
      default:
        return "bg-primary/10 text-primary border-primary/30";
    }
  };

  if (projects.length === 0) {
    return (
      <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm text-center">
        <p className="text-muted-foreground font-mono">
          no projects found. create your first project above.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedProjects.size > 0 && (
        <Card className="p-4 border-border/50 bg-primary/5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-foreground">
                {selectedProjects.size} project{selectedProjects.size > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleBulkVisibility(true)}
                size="sm"
                variant="outline"
                className="font-mono text-xs h-8"
              >
                <Eye className="size-3 mr-1" />
                show all
              </Button>
              <Button
                onClick={() => handleBulkVisibility(false)}
                size="sm"
                variant="outline"
                className="font-mono text-xs h-8"
              >
                <EyeOff className="size-3 mr-1" />
                hide all
              </Button>
              <Button
                onClick={() => handleBulkFeatured(true)}
                size="sm"
                variant="outline"
                className="font-mono text-xs h-8"
              >
                <Star className="size-3 mr-1" />
                feature all
              </Button>
              <Button
                onClick={() => handleBulkFeatured(false)}
                size="sm"
                variant="outline"
                className="font-mono text-xs h-8"
              >
                <Star className="size-3 mr-1" />
                unfeature all
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="font-mono text-xs h-8"
                  >
                    <Trash2 className="size-3 mr-1" />
                    delete all
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-mono">delete selected projects</AlertDialogTitle>
                    <AlertDialogDescription className="font-mono">
                      are you sure you want to delete {selectedProjects.size} selected project{selectedProjects.size > 1 ? 's' : ''}? this action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="font-mono">cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleBulkDelete}
                      className="font-mono bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      delete {selectedProjects.size} project{selectedProjects.size > 1 ? 's' : ''}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      )}

      {/* Select All */}
      <div className="flex items-center gap-2 p-2">
        <Checkbox
          checked={selectedProjects.size === projects.length && projects.length > 0}
          onCheckedChange={handleSelectAll}
        />
        <span className="text-sm font-mono text-muted-foreground">
          select all ({projects.length})
        </span>
      </div>

      {projects.map((project) => (
        <Card key={project.id} className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  checked={selectedProjects.has(project.id)}
                  onCheckedChange={(checked) => handleSelectProject(project.id, checked as boolean)}
                />
                <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-mono font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {project.is_featured && (
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                  )}
                  {!project.is_visible && (
                    <EyeOff className="size-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-mono line-clamp-2">
                  {project.description}
                </p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge className={`font-mono text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </Badge>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Links */}
            {(project.links.Code || project.links.Live) && (
              <div className="flex gap-3">
                {project.links.Live && (
                  <a
                    href={project.links.Live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-primary hover:underline"
                  >
                    <ExternalLink className="size-3" />
                    Live Demo
                  </a>
                )}
                {project.links.Code && (
                  <a
                    href={project.links.Code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-primary hover:underline"
                  >
                    <Github className="size-3" />
                    Source Code
                  </a>
                )}
              </div>
            )}

            {/* Thumbnail */}
            {project.thumbnail_url && (
              <div className="w-full max-w-xs">
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-20 object-cover rounded border border-border"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <span>created: {new Date(project.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>updated: {new Date(project.updated_at).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleToggleVisibility(project.id)}
                  size="sm"
                  variant="outline"
                  className="font-mono text-xs h-8"
                >
                  {project.is_visible ? (
                    <>
                      <Eye className="size-3 mr-1" />
                      hide
                    </>
                  ) : (
                    <>
                      <EyeOff className="size-3 mr-1" />
                      show
                    </>
                  )}
                </Button>

                <Dialog open={isEditDialogOpen && editingProject?.id === project.id} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setEditingProject(project)}
                      size="sm"
                      variant="outline"
                      className="font-mono text-xs h-8"
                    >
                      <Edit className="size-3 mr-1" />
                      edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-none max-h-[95vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-mono">edit project</DialogTitle>
                    </DialogHeader>
                    <ProjectForm
                      mode="edit"
                      project={editingProject || project}
                      onSuccess={handleEditSuccess}
                    />
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="font-mono text-xs h-8"
                    >
                      <Trash2 className="size-3 mr-1" />
                      delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-mono">delete project</AlertDialogTitle>
                      <AlertDialogDescription className="font-mono">
                        are you sure you want to delete "{project.title}"? this action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-mono">cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(project.id)}
                        className="font-mono bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}