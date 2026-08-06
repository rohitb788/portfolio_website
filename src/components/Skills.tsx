import type { SkillGroup } from "@/types/content";
import { Section } from "./Section";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills" index="05" title="Skills">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.category}>
            <h3 className="font-mono text-xs uppercase tracking-wide text-accent">
              {group.category}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
