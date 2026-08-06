"use client";

import { useState } from "react";
import type { SkillGroup } from "@/types/content";
import { useContentSave } from "./useContentSave";
import { Button, FieldGroup, ItemCard, TextField } from "./fields";
import { SaveBar } from "./SaveBar";

const EMPTY_GROUP: SkillGroup = { category: "", skills: [] };

export function SkillsEditor({ initial }: { initial: SkillGroup[] }) {
  const [groups, setGroups] = useState(initial);
  const { status, save } = useContentSave("skills");

  function update(index: number, patch: Partial<SkillGroup>) {
    setGroups((list) => list.map((g, i) => (i === index ? { ...g, ...patch } : g)));
  }

  function addGroup() {
    setGroups((list) => [...list, { ...EMPTY_GROUP }]);
  }

  function removeGroup(index: number) {
    setGroups((list) => list.filter((_, i) => i !== index));
  }

  return (
    <FieldGroup>
      {groups.map((group, i) => (
        <ItemCard key={i}>
          <TextField
            label="Category"
            value={group.category}
            onChange={(v) => update(i, { category: v })}
          />
          <TextField
            label="Skills (comma-separated)"
            value={group.skills.join(", ")}
            onChange={(v) =>
              update(i, {
                skills: v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
          <Button variant="danger" onClick={() => removeGroup(i)}>
            Remove group
          </Button>
        </ItemCard>
      ))}
      <Button onClick={addGroup}>+ Add skill group</Button>
      <SaveBar status={status} onSave={() => save(groups)} />
    </FieldGroup>
  );
}
