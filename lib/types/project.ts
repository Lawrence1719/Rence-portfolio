export type ProjectStatus = 'Live' | 'Work in Progress' | 'Hidden' | 'Archived';

export interface ProjectLink {
  type: string;
  url: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  links: {
    Code?: string;
    Live?: string;
  };
  thumbnail_url?: string;
  is_visible: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  links: Record<string, string>;
  thumbnail_url?: string;
  is_visible: boolean;
  is_featured: boolean;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string;
}