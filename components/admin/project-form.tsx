"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/types/project";
import { createProject, updateProject } from "@/lib/actions/projects";
import { uploadProjectImage } from "@/lib/actions/upload";
import { TECH_STACK_OPTIONS } from "@/lib/constants/tech-stack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, X, Check } from "lucide-react";

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(project?.image_url || "");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>(project?.tech_stack || []);
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    // Set the image URL from state
    if (imageUrl) {
      formData.set("image_url", imageUrl);
    }
    // Set the tech stack from state
    formData.set("tech_stack", selectedTechStack.join(", "));

    try {
      let result;
      if (project) {
        result = await updateProject(project.id, formData);
      } else {
        result = await createProject(formData);
      }

      if (result.success) {
        toast.success(
          project ? "Project updated successfully" : "Project created successfully"
        );
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Use a placeholder ID for new projects, actual ID for updates
      const projectId = project?.id || `temp-${Date.now()}`;
      const result = await uploadProjectImage(file, projectId, imageUrl || undefined);

      if (result.success && result.url) {
        setImageUrl(result.url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(result.error || "Failed to upload image");
      }
    } catch (error) {
      toast.error("An error occurred while uploading");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="My Awesome Project"
                defaultValue={project?.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description *</Label>
              <Textarea
                id="short_description"
                name="short_description"
                placeholder="A brief description of your project"
                defaultValue={project?.short_description}
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">Full Description *</Label>
              <Textarea
                id="full_description"
                name="full_description"
                placeholder="Detailed description of your project, its features, and your role"
                defaultValue={project?.full_description}
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tech_stack">Tech Stack *</Label>
              <div className="space-y-3">
                {/* Selected Tags */}
                {selectedTechStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 border border-border rounded-md bg-muted/30">
                    {selectedTechStack.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground rounded text-sm font-mono"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedTechStack(selectedTechStack.filter((t) => t !== tech))
                          }
                          className="ml-1 hover:opacity-75"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Dropdown */}
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowTechDropdown(!showTechDropdown)}
                    className="w-full justify-between"
                  >
                    {selectedTechStack.length === 0 ? "Select Technologies..." : `${selectedTechStack.length} selected`}
                  </Button>

                  {showTechDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 border border-border rounded-md bg-card shadow-lg z-50 max-h-96 overflow-y-auto">
                      {TECH_STACK_OPTIONS.map((group) => (
                        <div key={group.category}>
                          <div className="px-3 py-2 bg-muted font-mono text-xs font-semibold text-muted-foreground sticky top-0">
                            {group.category}
                          </div>
                          <div className="px-2 py-1">
                            {group.items.map((tech) => (
                              <button
                                key={tech}
                                type="button"
                                onClick={() => {
                                  setSelectedTechStack(
                                    selectedTechStack.includes(tech)
                                      ? selectedTechStack.filter((t) => t !== tech)
                                      : [...selectedTechStack, tech]
                                  );
                                }}
                                className="w-full text-left px-2 py-1.5 rounded hover:bg-primary/10 hover:text-foreground dark:hover:text-foreground flex items-center justify-between text-sm text-foreground"
                              >
                                {tech}
                                {selectedTechStack.includes(tech) && (
                                  <Check className="w-4 h-4 text-primary" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  Click the button above to select from common technologies, or add custom ones
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links & Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                type="url"
                placeholder="https://github.com/username/repo"
                defaultValue={project?.github_url || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="live_demo_url">Live Demo URL</Label>
              <Input
                id="live_demo_url"
                name="live_demo_url"
                type="url"
                placeholder="https://your-project.vercel.app"
                defaultValue={project?.live_demo_url || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Project Image</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    ref={fileInputRef}
                    id="image_upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full"
                  >
                    {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isUploading ? "Uploading..." : "Choose Image"}
                    <Upload className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {imageUrl && (
                  <div className="space-y-2">
                    <div className="relative w-full h-48 border border-border rounded bg-muted overflow-hidden">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setImageUrl("")}
                        className="absolute top-2 right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground break-all">{imageUrl}</p>
                  </div>
                )}

                <p className="text-sm text-muted-foreground">
                  Or paste an image URL directly:
                </p>
                <Input
                  id="image_url_manual"
                  name="image_url"
                  type="url"
                  placeholder="https://example.com/project-image.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select name="status" defaultValue={project?.status || "In Progress"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility *</Label>
              <Select name="visibility" defaultValue={project?.visibility || "Draft"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public">Public - Visible to everyone</SelectItem>
                  <SelectItem value="Hidden">Hidden - Not shown publicly</SelectItem>
                  <SelectItem value="Draft">Draft - Work in progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Featured Project</Label>
                <p className="text-sm text-muted-foreground">
                  Display this project prominently on your portfolio
                </p>
              </div>
              <Switch
                id="featured"
                name="featured"
                defaultChecked={project?.featured}
                value="true"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {project ? "Update Project" : "Create Project"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
