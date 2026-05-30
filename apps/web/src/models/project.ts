export type ProjectStatus = 'in-progress' | 'completed'
export type ProjectSize = 'large' | 'medium' | 'small'
export type ProjectPriority = 'hero' | 'large' | 'small'

export interface ProjectHighlight {
  title: string
  description: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  company: string
  period: string
  status: ProjectStatus
  size: ProjectSize
  priority?: ProjectPriority
  contribution: string
  techStack: string[]
  highlights: ProjectHighlight[]
  retrospective?: string
  retroKeywords?: string[]
  coverColor: string
  accentColor: string
  textColor?: string
  siteUrl?: string
  tag: string
  heroBadge?: string
}
