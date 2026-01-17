"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Project, CreateProjectData, UpdateProjectData } from "@/lib/types/project";

export async function getProjects(page: number = 1, limit: number = 10): Promise<{ projects: Project[], total: number }> {
  const supabase = await createClient();

  // Get total count
  const { count: total, error: countError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("Error counting projects:", countError);
    throw new Error("Failed to count projects");
  }

  // Get paginated data
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }

  return { projects: data || [], total: total || 0 };
}

export async function getVisibleProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_visible", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching visible projects:", error);
    throw new Error("Failed to fetch projects");
  }

  return data || [];
}

export async function createProject(data: CreateProjectData): Promise<Project> {
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }

  revalidatePath("/admin");
  revalidatePath("/projects");

  return project;
}

export async function updateProject(data: UpdateProjectData): Promise<Project> {
  const supabase = await createClient();

  const { id, ...updateData } = data;

  const { data: project, error } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project");
  }

  revalidatePath("/admin");
  revalidatePath("/projects");

  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }

  revalidatePath("/admin");
  revalidatePath("/projects");
}

export async function toggleProjectVisibility(id: string): Promise<Project> {
  const supabase = await createClient();

  // First get current visibility
  const { data: current, error: fetchError } = await supabase
    .from("projects")
    .select("is_visible")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching project:", fetchError);
    throw new Error("Failed to fetch project");
  }

  // Toggle visibility
  const { data: project, error } = await supabase
    .from("projects")
    .update({ is_visible: !current.is_visible })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project visibility:", error);
    throw new Error("Failed to update project visibility");
  }

  revalidatePath("/admin");
  revalidatePath("/projects");

  return project;
}

export async function logLoginAttempt(email: string, success: boolean, errorMessage?: string, request?: Request) {
  try {
    const supabase = await createClient();

    const ipAddress = request?.headers.get('x-forwarded-for') ||
                     request?.headers.get('x-real-ip') ||
                     'unknown';

    const userAgent = request?.headers.get('user-agent') || 'unknown';

    const { error } = await supabase
      .from('login_attempts')
      .insert({
        email,
        ip_address: ipAddress,
        user_agent: userAgent,
        success,
        error_message: errorMessage,
      });

    if (error) {
      console.error('Failed to log login attempt:', error);
    }
  } catch (error) {
    console.error('Error logging login attempt:', error);
  }
}

export async function getLoginAttempts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('login_attempts')
    .select('*')
    .order('attempted_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error fetching login attempts:', error);
    throw new Error('Failed to fetch login attempts');
  }

  return data || [];
}