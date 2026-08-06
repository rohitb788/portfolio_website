// Shared content shapes. Kept separate from data files so the admin
// editing system (added later) can validate writes against one schema.

export interface SiteLinks {
  github: string;
  linkedin: string;
  resumeUrl: string;
  email: string;
}

export interface SiteConfig {
  name: string;
  positioning: string;
  links: SiteLinks;
  about: {
    paragraphs: string[];
  };
}

export interface MetricRow {
  label: string;
  value: string;
}

export interface ProjectFigure {
  /** Path under /public, e.g. "/projects/quadrotor/response.png". Empty until a real plot is added. */
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short one-line summary shown on the grid card. */
  oneLiner: string;
  /** One sentence aimed at a GNC/controls reviewer: what this proves. */
  whatThisProves: string;
  problem: string;
  method: string;
  metrics: MetricRow[];
  figure: ProjectFigure;
  repoUrl: string;
  techStack: string[];
}

export interface WipProject {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  dateRange: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
