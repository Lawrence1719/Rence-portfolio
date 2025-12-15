"use server";

import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types/project";

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
