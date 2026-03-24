export interface Project {
  title: string
  description: string
  url: string
  tags: string[]
  featured?: boolean
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export interface SkillCategory {
  label: string
  items: string[]
}

export interface NavLink {
  label: string
  href: string
}
