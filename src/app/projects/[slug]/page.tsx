import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, getProjects } from "@/lib/content";
import { MetricsTable } from "@/components/MetricsTable";
import { TechTags } from "@/components/TechTags";
import { ProjectFigureBlock } from "@/components/FigurePlaceholder";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Project`,
    description: project.oneLiner,
    openGraph: {
      title: project.title,
      description: project.oneLiner,
      type: "article",
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="flex-1">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/#projects"
          className="font-mono text-sm text-foreground-muted hover:text-accent"
        >
          ← Back
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-muted">
          {project.oneLiner}
        </p>

        <div className="mt-6">
          <TechTags tags={project.techStack} />
        </div>

        <div className="mt-8 border-l-2 border-accent pl-4 font-mono text-sm text-foreground/90">
          {project.whatThisProves}
        </div>

        <section className="mt-12">
          <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-foreground-muted">
            Problem
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-foreground/90">
            {project.problem}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-foreground-muted">
            Method
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-foreground/90">
            {project.method}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-foreground-muted">
            Results
          </h2>
          <div className="mt-4 max-w-md">
            <MetricsTable metrics={project.metrics} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-foreground-muted">
            Figure
          </h2>
          <div className="mt-4">
            <ProjectFigureBlock figure={project.figure} />
          </div>
        </section>

        <section className="mt-12">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-sm text-accent underline decoration-accent/40 hover:decoration-accent"
          >
            View repository ↗
          </a>
        </section>
      </article>
    </main>
  );
}
