"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login?logout=success")
}

export async function getDashboardStats() {
  const supabase = await createClient()

  // Get total projects
  const { count: totalProjects, error: projectsError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })

  if (projectsError) {
    console.error("Error counting projects:", projectsError)
    throw new Error("Failed to count projects")
  }

  // Get visible projects
  const { count: visibleProjects, error: visibleError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("is_visible", true)

  if (visibleError) {
    console.error("Error counting visible projects:", visibleError)
    throw new Error("Failed to count visible projects")
  }

  // Get featured projects
  const { count: featuredProjects, error: featuredError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("is_featured", true)

  if (featuredError) {
    console.error("Error counting featured projects:", featuredError)
    throw new Error("Failed to count featured projects")
  }

  // Get total login attempts
  const { count: totalLoginAttempts, error: loginError } = await supabase
    .from("login_attempts")
    .select("*", { count: "exact", head: true })

  if (loginError) {
    console.error("Error counting login attempts:", loginError)
    throw new Error("Failed to count login attempts")
  }

  // Get successful login attempts
  const { count: successfulLogins, error: successError } = await supabase
    .from("login_attempts")
    .select("*", { count: "exact", head: true })
    .eq("success", true)

  if (successError) {
    console.error("Error counting successful logins:", successError)
    throw new Error("Failed to count successful logins")
  }

  // Get recent login attempts (last 10)
  const { data: recentLoginAttempts, error: recentError } = await supabase
    .from("login_attempts")
    .select("*")
    .order("attempted_at", { ascending: false })
    .limit(10)

  if (recentError) {
    console.error("Error fetching recent login attempts:", recentError)
    throw new Error("Failed to fetch recent login attempts")
  }

  // Get recent projects (last 5 updated)
  const { data: recentProjects, error: recentProjectsError } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(5)

  if (recentProjectsError) {
    console.error("Error fetching recent projects:", recentProjectsError)
    throw new Error("Failed to fetch recent projects")
  }

  return {
    totalProjects: totalProjects || 0,
    visibleProjects: visibleProjects || 0,
    featuredProjects: featuredProjects || 0,
    totalLoginAttempts: totalLoginAttempts || 0,
    successfulLogins: successfulLogins || 0,
    recentLoginAttempts: recentLoginAttempts || [],
    recentProjects: recentProjects || []
  }
}
