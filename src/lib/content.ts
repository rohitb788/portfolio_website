import siteData from "@/data/site.json";
import projectsData from "@/data/projects.json";
import wipProjectsData from "@/data/wip-projects.json";
import experienceData from "@/data/experience.json";
import skillsData from "@/data/skills.json";
import type {
  ExperienceEntry,
  Project,
  SiteConfig,
  SkillGroup,
  WipProject,
} from "@/types/content";

export function getSite(): SiteConfig {
  return siteData as SiteConfig;
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getWipProjects(): WipProject[] {
  return wipProjectsData as WipProject[];
}

export function getExperience(): ExperienceEntry[] {
  return experienceData as ExperienceEntry[];
}

export function getSkills(): SkillGroup[] {
  return skillsData as SkillGroup[];
}
