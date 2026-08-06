import type { ExperienceEntry } from "@/types/content";
import { Section } from "./Section";

export function Experience({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <Section id="experience" index="04" title="Experience">
      <ul className="max-w-2xl space-y-8">
        {entries.map((entry) => (
          <li key={`${entry.company}-${entry.role}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-medium text-foreground">
                {entry.role} · {entry.company}
              </h3>
              <span className="font-mono text-xs text-foreground-muted">
                {entry.dateRange}
              </span>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground-muted marker:text-accent">
              {entry.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
