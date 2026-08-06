"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  ExperienceEntry,
  Project,
  SiteConfig,
  SkillGroup,
  WipProject,
} from "@/types/content";
import { SiteEditor } from "./SiteEditor";
import { ProjectsEditor } from "./ProjectsEditor";
import { WipEditor } from "./WipEditor";
import { ExperienceEditor } from "./ExperienceEditor";
import { SkillsEditor } from "./SkillsEditor";
import { Button } from "./fields";

export interface AdminInitialData {
  site: SiteConfig;
  projects: Project[];
  wipProjects: WipProject[];
  experience: ExperienceEntry[];
  skills: SkillGroup[];
}

const TABS = ["Site & About", "Projects", "Work in Progress", "Experience", "Skills"] as const;
type Tab = (typeof TABS)[number];

export function AdminDashboard({ initial }: { initial: AdminInitialData }) {
  const [tab, setTab] = useState<Tab>("Site & About");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="font-mono text-sm text-accent">$ admin</p>
          <h1 className="text-2xl font-semibold text-foreground">Edit content</h1>
          <p className="mt-1 max-w-md text-sm text-foreground-muted">
            Saving commits directly to the repo and Vercel redeploys automatically — usually
            live within a minute or two.
          </p>
        </div>
        <Button onClick={handleLogout}>Log out</Button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
              tab === t
                ? "bg-accent text-accent-foreground"
                : "border border-border text-foreground-muted hover:border-accent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Site & About" && <SiteEditor initial={initial.site} />}
      {tab === "Projects" && <ProjectsEditor initial={initial.projects} />}
      {tab === "Work in Progress" && <WipEditor initial={initial.wipProjects} />}
      {tab === "Experience" && <ExperienceEditor initial={initial.experience} />}
      {tab === "Skills" && <SkillsEditor initial={initial.skills} />}
    </div>
  );
}
