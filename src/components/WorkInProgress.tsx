import type { WipProject } from "@/types/content";
import { Section } from "./Section";
import { TechTags } from "./TechTags";

export function WorkInProgress({ items }: { items: WipProject[] }) {
  return (
    <Section id="work-in-progress" index="03" title="Work in Progress">
      <p className="mb-6 max-w-xl text-sm text-foreground-muted">
        Projects that don&apos;t yet have validated metrics or a public repo.
        Listed here honestly rather than padded into the main grid above.
      </p>

      {items.length === 0 ? (
        <p className="rounded-sm border border-dashed border-border px-4 py-6 font-mono text-sm text-foreground-muted">
          Nothing here yet — check back soon.
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.slug}
              className="rounded-sm border border-dashed border-border p-4 opacity-80"
            >
              <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <TechTags tags={item.techStack} />
                {item.repoUrl && (
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-foreground-muted underline decoration-border hover:text-accent hover:decoration-accent"
                  >
                    Repo ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
