"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertCircle, Loader2, Plus, X, Github, ExternalLink } from "lucide-react";
import { createProject, updateProject } from "../actions";
import { Project, ProjectStatus } from "@/lib/types/project";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBrowserClient } from "@supabase/ssr";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  status: z.enum(["Live", "Work in Progress", "Hidden", "Archived"]),
  links: z.object({
    Code: z.string().url("Code link must be a valid URL").optional(),
    Live: z.string().url("Live link must be a valid URL").optional(),
  }).optional(),
  thumbnail_url: z.string().url().optional().or(z.literal("")),
  is_visible: z.boolean(),
  is_featured: z.boolean(),
}).refine((data) => {
  // Only require Live link if status is "Live"
  if (data.status === "Live") {
    return data.links?.Live && data.links.Live.trim() !== "";
  }
  return true;
}, {
  message: "Live link is required for Live projects",
  path: ["links", "Live"],
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  mode: "create" | "edit";
  project?: Project;
  onSuccess?: () => void;
}

export function ProjectForm({ mode, project, onSuccess }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [linkInputs, setLinkInputs] = useState<{ Code?: string; Live?: string }>(
    project?.links || {}
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      tags: project?.tags || [],
      status: project?.status || "Work in Progress",
      links: project?.links || {},
      thumbnail_url: project?.thumbnail_url || "",
      is_visible: project?.is_visible ?? true,
      is_featured: project?.is_featured ?? false,
    },
  });

  const watchedTags = watch("tags");
  const watchedStatus = watch("status");
  const watchedIsVisible = watch("is_visible");
  const watchedIsFeatured = watch("is_featured");

  const addTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      setValue("tags", [...watchedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue("tags", watchedTags.filter(tag => tag !== tagToRemove));
  };

  const updateLink = (type: "Code" | "Live", url: string) => {
    const newLinks = { ...linkInputs, [type]: url };
    setLinkInputs(newLinks);
    setValue("links", newLinks);
  };

  const removeLink = (type: "Code" | "Live") => {
    const newLinks = { ...linkInputs };
    delete newLinks[type];
    setLinkInputs(newLinks);
    setValue("links", newLinks);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `project-thumbnails/${fileName}`;

      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      setValue("thumbnail_url", publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      uploadImage(file);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const projectData = {
        ...data,
        thumbnail_url: data.thumbnail_url || undefined,
        links: data.links || { },
      };

      if (mode === "create") {
        await createProject(projectData);
        toast.success(`Project "${data.title}" created successfully!`);
        
        // Reset form after successful creation
        reset({
          title: "",
          description: "",
          tags: [],
          status: "Work in Progress",
          links: {},
          thumbnail_url: "",
          is_visible: true,
          is_featured: false,
        });
        setTagInput("");
        setLinkInputs({});
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else if (project) {
        await updateProject({
          id: project.id,
          ...projectData,
        });
        toast.success(`Project "${data.title}" updated successfully!`);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="flex gap-3 p-3 rounded-sm bg-destructive/10 border border-destructive/30">
          <AlertCircle className="size-4 mt-0.5 text-destructive shrink-0" />
          <p className="text-sm text-destructive font-mono">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-xs font-mono text-foreground/70">
            title *
          </Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Project Title"
            className="font-mono text-sm"
          />
          {errors.title && (
            <p className="text-xs text-destructive font-mono">{errors.title.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="text-xs font-mono text-foreground/70">
            status *
          </Label>
          <Select
            value={watchedStatus}
            onValueChange={(value: ProjectStatus) => setValue("status", value)}
          >
            <SelectTrigger className="font-mono text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Live">Live</SelectItem>
              <SelectItem value="Work in Progress">Work in Progress</SelectItem>
              <SelectItem value="Hidden">Hidden</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-xs font-mono text-foreground/70">
          description *
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Project description..."
          rows={3}
          className="font-mono text-sm"
        />
        {errors.description && (
          <p className="text-xs text-destructive font-mono">{errors.description.message}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-xs font-mono text-foreground/70">
          tags/tech stack *
        </Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag..."
            className="font-mono text-sm"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          />
          <Button type="button" onClick={addTag} size="sm" variant="outline">
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {watchedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 hover:text-destructive"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
        {errors.tags && (
          <p className="text-xs text-destructive font-mono">{errors.tags.message}</p>
        )}
      </div>

      {/* Links */}
      <div className="space-y-2">
        <Label className="text-xs font-mono text-foreground/70">
          links *
        </Label>
        <div className="space-y-3">
          {/* Live Link - Required */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ExternalLink className="size-4 text-primary" />
              <Label className="text-xs font-mono text-foreground/70">
                Live Demo *
              </Label>
            </div>
            <Input
              value={linkInputs.Live || ""}
              onChange={(e) => updateLink("Live", e.target.value)}
              placeholder="https://yourproject.com"
              className="font-mono text-sm"
            />
            {errors.links?.Live && (
              <p className="text-xs text-destructive font-mono">{errors.links.Live.message}</p>
            )}
          </div>

          {/* Code Link - Optional */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Github className="size-4 text-primary" />
              <Label className="text-xs font-mono text-foreground/70">
                Source Code
              </Label>
            </div>
            <div className="flex gap-2">
              <Input
                value={linkInputs.Code || ""}
                onChange={(e) => updateLink("Code", e.target.value)}
                placeholder="https://github.com/username/repo"
                className="font-mono text-sm flex-1"
              />
              {linkInputs.Code && (
                <Button
                  type="button"
                  onClick={() => removeLink("Code")}
                  size="sm"
                  variant="outline"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
            {errors.links?.Code && (
              <p className="text-xs text-destructive font-mono">{errors.links.Code.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail Image */}
      <div className="space-y-2">
        <Label className="text-xs font-mono text-foreground/70">
          thumbnail image
        </Label>

        {/* URL Input */}
        <Input
          id="thumbnail_url"
          {...register("thumbnail_url")}
          placeholder="https://example.com/image.jpg"
          className="font-mono text-sm"
        />
        {errors.thumbnail_url && (
          <p className="text-xs text-destructive font-mono">{errors.thumbnail_url.message}</p>
        )}

        {/* File Upload */}
        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="font-mono text-sm file:font-mono file:text-sm file:bg-secondary file:border-0 file:rounded file:px-2 file:py-1"
          />
          {isUploading && (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          Upload an image (max 5MB) or paste a URL above
        </p>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_visible"
            checked={watchedIsVisible}
            onCheckedChange={(checked) => setValue("is_visible", checked)}
          />
          <Label htmlFor="is_visible" className="text-sm font-mono">
            visible on portfolio
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={watchedIsFeatured}
            onCheckedChange={(checked) => setValue("is_featured", checked)}
          />
          <Label htmlFor="is_featured" className="text-sm font-mono">
            featured project
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full font-mono text-sm h-9"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            {mode === "create" ? "creating..." : "updating..."}
          </>
        ) : (
          <span>$: {mode === "create" ? "create project" : "update project"}</span>
        )}
      </Button>
    </form>
  );
}