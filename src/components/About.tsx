import type { SiteConfig } from "@/types/content";
import { Section } from "./Section";

export function About({ site }: { site: SiteConfig }) {
  return (
    <Section id="about" index="01" title="About">
      <div className="max-w-2xl space-y-5 text-base leading-relaxed text-foreground/90">
        {site.about.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
