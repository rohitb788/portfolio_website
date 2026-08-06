"use client";

import { useState } from "react";
import type { WipProject } from "@/types/content";
import { useContentSave } from "./useContentSave";
import { Button, FieldGroup, ItemCard, TextAreaField, TextField } from "./fields";
import { SaveBar } from "./SaveBar";

const EMPTY_WIP: WipProject = { slug: "", title: "", description: "", techStack: [], repoUrl: "" };

export function WipEditor({ initial }: { initial: WipProject[] }) {
  const [items, setItems] = useState(initial);
  const { status, save } = useContentSave("wip-projects");

  function update(index: number, patch: Partial<WipProject>) {
    setItems((list) => list.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((list) => [...list, { ...EMPTY_WIP }]);
  }

  function removeItem(index: number) {
    setItems((list) => list.filter((_, i) => i !== index));
  }

  return (
    <FieldGroup>
      {items.map((item, i) => (
        <ItemCard key={i}>
          <TextField label="Slug" value={item.slug} onChange={(v) => update(i, { slug: v })} />
          <TextField label="Title" value={item.title} onChange={(v) => update(i, { title: v })} />
          <TextAreaField
            label="Description"
            value={item.description}
            onChange={(v) => update(i, { description: v })}
          />
          <TextField
            label="Tech stack (comma-separated)"
            value={item.techStack.join(", ")}
            onChange={(v) =>
              update(i, {
                techStack: v
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
          />
          <TextField
            label="Repo URL (optional)"
            value={item.repoUrl ?? ""}
            onChange={(v) => update(i, { repoUrl: v })}
          />
          <Button variant="danger" onClick={() => removeItem(i)}>
            Remove
          </Button>
        </ItemCard>
      ))}
      <Button onClick={addItem}>+ Add work-in-progress project</Button>
      <SaveBar status={status} onSave={() => save(items)} />
    </FieldGroup>
  );
}
