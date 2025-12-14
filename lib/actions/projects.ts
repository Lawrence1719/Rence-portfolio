"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Project } from "@/lib/types/project";

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function getProjects() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return { projects: [], error: error.message };
  }

  return { projects: data as Project[], error: null };
}

export async function getPublicProjects() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("visibility", "Public")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching public projects:", error);
    return { projects: [], error: error.message };
  }

  return { projects: data as Project[], error: null };
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("visibility", "Public")
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return { project: null, error: error.message };
  }

  return { project: data as Project, error: null };
}

export async function getProjectById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return { project: null, error: error.message };
  }

  return { project: data as Project, error: null };
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const short_description = formData.get("short_description") as string;
  const full_description = formData.get("full_description") as string;
  const tech_stack = (formData.get("tech_stack") as string).split(",").map((t) => t.trim());
  const github_url = formData.get("github_url") as string || null;
  const live_demo_url = formData.get("live_demo_url") as string || null;
  const image_url = formData.get("image_url") as string || null;
  const status = formData.get("status") as "Completed" | "In Progress";
  const visibility = formData.get("visibility") as "Public" | "Hidden" | "Draft";
  const featured = formData.get("featured") === "true";

  const slug = generateSlug(title);

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      slug,
      short_description,
      full_description,
      tech_stack,
      github_url,
      live_demo_url,
      image_url,
      status,
      visibility,
      featured,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  
  return { success: true, project: data, error: null };
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();

  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const short_description = formData.get("short_description") as string;
  const full_description = formData.get("full_description") as string;
  const tech_stack = (formData.get("tech_stack") as string).split(",").map((t) => t.trim());
  const github_url = formData.get("github_url") as string || null;
  const live_demo_url = formData.get("live_demo_url") as string || null;
  const image_url = formData.get("image_url") as string || null;
  const status = formData.get("status") as "Completed" | "In Progress";
  const visibility = formData.get("visibility") as "Public" | "Hidden" | "Draft";
  const featured = formData.get("featured") === "true";

  const slug = generateSlug(title);

  const { data, error } = await supabase
    .from("projects")
    .update({
      title,
      slug,
      short_description,
      full_description,
      tech_stack,
      github_url,
      live_demo_url,
      image_url,
      status,
      visibility,
      featured,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  
  return { success: true, project: data, error: null };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  
  return { success: true, error: null };
}
