"use client";

import { useState } from "react";
import type { SiteConfig } from "@/types/content";
import { useContentSave } from "./useContentSave";
import { Button, FieldGroup, TextAreaField, TextField } from "./fields";
import { SaveBar } from "./SaveBar";

export function SiteEditor({ initial }: { initial: SiteConfig }) {
  const [site, setSite] = useState(initial);
  const { status, save } = useContentSave("site");

  function updateLinks(field: keyof SiteConfig["links"], value: string) {
    setSite((s) => ({ ...s, links: { ...s.links, [field]: value } }));
  }

  function updateParagraph(index: number, value: string) {
    setSite((s) => ({
      ...s,
      about: {
        paragraphs: s.about.paragraphs.map((p, i) => (i === index ? value : p)),
      },
    }));
  }

  function addParagraph() {
    setSite((s) => ({ ...s, about: { paragraphs: [...s.about.paragraphs, ""] } }));
  }

  function removeParagraph(index: number) {
    setSite((s) => ({
      ...s,
      about: { paragraphs: s.about.paragraphs.filter((_, i) => i !== index) },
    }));
  }

  return (
    <FieldGroup>
      <TextField label="Name" value={site.name} onChange={(v) => setSite({ ...site, name: v })} />
      <TextField
        label="Positioning statement"
        value={site.positioning}
        onChange={(v) => setSite({ ...site, positioning: v })}
      />
      <TextField label="GitHub URL" value={site.links.github} onChange={(v) => updateLinks("github", v)} />
      <TextField
        label="LinkedIn URL"
        value={site.links.linkedin}
        onChange={(v) => updateLinks("linkedin", v)}
      />
      <TextField
        label="Resume URL"
        value={site.links.resumeUrl}
        onChange={(v) => updateLinks("resumeUrl", v)}
      />
      <TextField label="Email" value={site.links.email} onChange={(v) => updateLinks("email", v)} />

      <div>
        <span className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
          About paragraphs
        </span>
        <div className="mt-2 flex flex-col gap-3">
          {site.about.paragraphs.map((paragraph, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-sm border border-border p-3">
              <TextAreaField
                label={`Paragraph ${i + 1}`}
                value={paragraph}
                onChange={(v) => updateParagraph(i, v)}
              />
              <Button variant="danger" onClick={() => removeParagraph(i)}>
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addParagraph}>+ Add paragraph</Button>
        </div>
      </div>

      <SaveBar status={status} onSave={() => save(site)} />
    </FieldGroup>
  );
}
