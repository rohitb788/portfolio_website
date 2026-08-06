import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { getRepoFile } from "@/lib/github";
import { CONTENT_PATHS, type ContentKey } from "@/lib/validate-content";
import {
  getSite,
  getProjects,
  getWipProjects,
  getExperience,
  getSkills,
} from "@/lib/content";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminDashboard, type AdminInitialData } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Prefer the latest committed content from GitHub (source of truth once the
// admin has made edits); fall back to the bundled data files if GitHub isn't
// configured yet, so the dashboard still works for local exploration.
async function fetchLatest<T>(key: ContentKey, fallback: T): Promise<T> {
  try {
    const { content } = await getRepoFile(CONTENT_PATHS[key]);
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <main className="flex-1">
        <LoginForm />
      </main>
    );
  }

  const initial: AdminInitialData = {
    site: await fetchLatest("site", getSite()),
    projects: await fetchLatest("projects", getProjects()),
    wipProjects: await fetchLatest("wip-projects", getWipProjects()),
    experience: await fetchLatest("experience", getExperience()),
    skills: await fetchLatest("skills", getSkills()),
  };

  return (
    <main className="flex-1">
      <AdminDashboard initial={initial} />
    </main>
  );
}
