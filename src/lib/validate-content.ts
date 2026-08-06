// Minimal shape validation for admin-submitted content. Not a full schema
// library — just enough to reject obviously-broken payloads before they get
// committed to the repo (this is the only write path into the site's content).

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((item) => typeof item === "string");
}

export type ContentKey = "site" | "projects" | "wip-projects" | "experience" | "skills";

export const CONTENT_PATHS: Record<ContentKey, string> = {
  site: "src/data/site.json",
  projects: "src/data/projects.json",
  "wip-projects": "src/data/wip-projects.json",
  experience: "src/data/experience.json",
  skills: "src/data/skills.json",
};

export function isContentKey(value: string): value is ContentKey {
  return value in CONTENT_PATHS;
}

export function validateContent(key: ContentKey, data: unknown): string | null {
  switch (key) {
    case "site":
      return validateSite(data);
    case "projects":
      return validateProjects(data);
    case "wip-projects":
      return validateWipProjects(data);
    case "experience":
      return validateExperience(data);
    case "skills":
      return validateSkills(data);
  }
}

function validateSite(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return "site must be an object";
  const d = data as Record<string, unknown>;
  if (!isNonEmptyString(d.name)) return "name is required";
  if (!isNonEmptyString(d.positioning)) return "positioning is required";
  const links = d.links as Record<string, unknown> | undefined;
  if (typeof links !== "object" || links === null) return "links is required";
  for (const field of ["github", "linkedin", "resumeUrl", "email"]) {
    if (!isString(links[field])) return `links.${field} is required`;
  }
  const about = d.about as Record<string, unknown> | undefined;
  if (typeof about !== "object" || about === null || !isStringArray(about.paragraphs)) {
    return "about.paragraphs must be an array of strings";
  }
  return null;
}

function validateProjects(data: unknown): string | null {
  if (!Array.isArray(data)) return "projects must be an array";
  for (const [i, item] of data.entries()) {
    const p = item as Record<string, unknown>;
    if (!isNonEmptyString(p.slug)) return `project[${i}].slug is required`;
    if (!isNonEmptyString(p.title)) return `project[${i}].title is required`;
    if (!isNonEmptyString(p.oneLiner)) return `project[${i}].oneLiner is required`;
    if (!isString(p.whatThisProves)) return `project[${i}].whatThisProves is required`;
    if (!isString(p.problem)) return `project[${i}].problem is required`;
    if (!isString(p.method)) return `project[${i}].method is required`;
    if (!Array.isArray(p.metrics)) return `project[${i}].metrics must be an array`;
    for (const [j, row] of (p.metrics as unknown[]).entries()) {
      const r = row as Record<string, unknown>;
      if (!isNonEmptyString(r.label) || !isString(r.value)) {
        return `project[${i}].metrics[${j}] needs a label and value`;
      }
    }
    const figure = p.figure as Record<string, unknown> | undefined;
    if (typeof figure !== "object" || figure === null) return `project[${i}].figure is required`;
    if (!isString(figure.src) || !isString(figure.alt) || !isString(figure.caption)) {
      return `project[${i}].figure needs src, alt, and caption`;
    }
    if (!isString(p.repoUrl)) return `project[${i}].repoUrl is required`;
    if (!isStringArray(p.techStack)) return `project[${i}].techStack must be an array of strings`;
  }
  return null;
}

function validateWipProjects(data: unknown): string | null {
  if (!Array.isArray(data)) return "wip-projects must be an array";
  for (const [i, item] of data.entries()) {
    const p = item as Record<string, unknown>;
    if (!isNonEmptyString(p.slug)) return `wip[${i}].slug is required`;
    if (!isNonEmptyString(p.title)) return `wip[${i}].title is required`;
    if (!isString(p.description)) return `wip[${i}].description is required`;
    if (!isStringArray(p.techStack)) return `wip[${i}].techStack must be an array of strings`;
    if (p.repoUrl !== undefined && !isString(p.repoUrl)) return `wip[${i}].repoUrl must be a string`;
  }
  return null;
}

function validateExperience(data: unknown): string | null {
  if (!Array.isArray(data)) return "experience must be an array";
  for (const [i, item] of data.entries()) {
    const e = item as Record<string, unknown>;
    if (!isNonEmptyString(e.company)) return `experience[${i}].company is required`;
    if (!isNonEmptyString(e.role)) return `experience[${i}].role is required`;
    if (!isString(e.dateRange)) return `experience[${i}].dateRange is required`;
    if (!isStringArray(e.bullets)) return `experience[${i}].bullets must be an array of strings`;
  }
  return null;
}

function validateSkills(data: unknown): string | null {
  if (!Array.isArray(data)) return "skills must be an array";
  for (const [i, item] of data.entries()) {
    const g = item as Record<string, unknown>;
    if (!isNonEmptyString(g.category)) return `skills[${i}].category is required`;
    if (!isStringArray(g.skills)) return `skills[${i}].skills must be an array of strings`;
  }
  return null;
}
