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

export async function getLoginAttempts(limit: number = 100) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('login_attempts')
    .select('*')
    .order('attempted_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching login attempts:', error);
    throw new Error('Failed to fetch login attempts');
  }

  return data || [];
}

export async function cleanupOldLoginAttempts(daysOld: number = 90) {
  const supabase = await createClient();

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  console.log('Cleanup cutoff date:', cutoffDate.toISOString());
  console.log('Current date:', new Date().toISOString());

  // First, let's see what records exist
  const { data: allRecords, error: fetchError } = await supabase
    .from('login_attempts')
    .select('id, attempted_at')
    .order('attempted_at', { ascending: false })
    .limit(10);

  console.log('Recent records:', allRecords?.map(r => ({
    id: r.id,
    attempted_at: r.attempted_at,
    age_days: Math.floor((Date.now() - new Date(r.attempted_at).getTime()) / (1000 * 60 * 60 * 24))
  })));

  const { data, error } = await supabase
    .from('login_attempts')
    .delete()
    .lt('attempted_at', cutoffDate.toISOString());

  console.log('Cleanup result:', { data, error, deletedCount: data?.length || 0 });

  if (error) {
    console.error('Error cleaning up old login attempts:', error);
    throw new Error('Failed to cleanup old login attempts');
  }

  return data;
}

export async function getLoginAttemptsStats() {
  const supabase = await createClient();

  // Get total attempts
  const { count: totalAttempts, error: totalError } = await supabase
    .from('login_attempts')
    .select('*', { count: 'exact', head: true });

  if (totalError) {
    console.error('Error getting total attempts:', totalError);
    throw new Error('Failed to get login attempts stats');
  }

  // Get successful attempts
  const { count: successfulAttempts, error: successError } = await supabase
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('success', true);

  if (successError) {
    console.error('Error getting successful attempts:', successError);
    throw new Error('Failed to get login attempts stats');
  }

  // Get attempts from last 24 hours
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const { count: recentAttempts, error: recentError } = await supabase
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .gte('attempted_at', yesterday.toISOString());

  if (recentError) {
    console.error('Error getting recent attempts:', recentError);
    throw new Error('Failed to get login attempts stats');
  }

  return {
    total: totalAttempts || 0,
    successful: successfulAttempts || 0,
    failed: (totalAttempts || 0) - (successfulAttempts || 0),
    recent: recentAttempts || 0,
  };
}

export async function deleteLoginAttempt(id: string): Promise<void> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('login_attempts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting login attempt:', error);
    throw new Error(`Failed to delete login attempt: ${error.message}`);
  }

  // Note: Supabase delete operations may not always return the deleted data
  // The operation is considered successful if no error occurred
}