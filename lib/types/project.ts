export type Project = {
  id: string
  title: string
  slug: string
  short_description: string
  full_description: string
  tech_stack: string[]
  github_url: string | null
  live_demo_url: string | null
  image_url: string | null
  status: 'Completed' | 'In Progress'
  visibility: 'Public' | 'Hidden' | 'Draft'
  featured: boolean
  created_at: string
  updated_at: string
}

export type ProjectFormData = Omit<Project, 'id' | 'created_at' | 'updated_at'>
