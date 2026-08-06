import Link from "next/link";
import type { Project } from "@/types/content";
import { MetricsTable } from "./MetricsTable";
import { TechTags } from "./TechTags";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-4 rounded-sm border border-border bg-background-elevated p-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
          {project.oneLiner}
        </p>
      </div>

      <MetricsTable metrics={project.metrics} />

      <TechTags tags={project.techStack} />

      <div className="mt-auto flex items-center gap-4 pt-2 font-mono text-xs">
        <Link
          href={`/projects/${project.slug}`}
          className="text-accent underline decoration-accent/40 hover:decoration-accent"
        >
          Full write-up →
        </Link>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground-muted underline decoration-border hover:text-accent hover:decoration-accent"
        >
          Repo ↗
        </a>
      </div>
    </article>
  );
}
