"use client";

import { useState } from "react";
import type { ExperienceEntry } from "@/types/content";
import { useContentSave } from "./useContentSave";
import { Button, FieldGroup, ItemCard, TextField } from "./fields";
import { SaveBar } from "./SaveBar";

const EMPTY_ENTRY: ExperienceEntry = { company: "", role: "", dateRange: "", bullets: [] };

export function ExperienceEditor({ initial }: { initial: ExperienceEntry[] }) {
  const [entries, setEntries] = useState(initial);
  const { status, save } = useContentSave("experience");

  function update(index: number, patch: Partial<ExperienceEntry>) {
    setEntries((list) => list.map((e, i) => (i === index ? { ...e, ...patch } : e)));
  }

  function updateBullet(eIndex: number, bIndex: number, value: string) {
    setEntries((list) =>
      list.map((e, i) =>
        i === eIndex ? { ...e, bullets: e.bullets.map((b, j) => (j === bIndex ? value : b)) } : e
      )
    );
  }

  function addBullet(eIndex: number) {
    setEntries((list) =>
      list.map((e, i) => (i === eIndex ? { ...e, bullets: [...e.bullets, ""] } : e))
    );
  }

  function removeBullet(eIndex: number, bIndex: number) {
    setEntries((list) =>
      list.map((e, i) =>
        i === eIndex ? { ...e, bullets: e.bullets.filter((_, j) => j !== bIndex) } : e
      )
    );
  }

  function addEntry() {
    setEntries((list) => [...list, { ...EMPTY_ENTRY }]);
  }

  function removeEntry(index: number) {
    setEntries((list) => list.filter((_, i) => i !== index));
  }

  return (
    <FieldGroup>
      {entries.map((entry, i) => (
        <ItemCard key={i}>
          <TextField label="Company" value={entry.company} onChange={(v) => update(i, { company: v })} />
          <TextField label="Role" value={entry.role} onChange={(v) => update(i, { role: v })} />
          <TextField
            label="Date range"
            value={entry.dateRange}
            onChange={(v) => update(i, { dateRange: v })}
          />

          <div>
            <span className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
              Bullets
            </span>
            <div className="mt-2 flex flex-col gap-2">
              {entry.bullets.map((bullet, j) => (
                <div key={j} className="flex items-end gap-2">
                  <div className="flex-1">
                    <TextField
                      label={`Bullet ${j + 1}`}
                      value={bullet}
                      onChange={(v) => updateBullet(i, j, v)}
                    />
                  </div>
                  <Button variant="danger" onClick={() => removeBullet(i, j)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={() => addBullet(i)}>+ Add bullet</Button>
            </div>
          </div>

          <Button variant="danger" onClick={() => removeEntry(i)}>
            Remove entry
          </Button>
        </ItemCard>
      ))}
      <Button onClick={addEntry}>+ Add experience entry</Button>
      <SaveBar status={status} onSave={() => save(entries)} />
    </FieldGroup>
  );
}
