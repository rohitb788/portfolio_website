"use client";

import { useState } from "react";
import type { Project } from "@/types/content";
import { useContentSave } from "./useContentSave";
import { Button, FieldGroup, ItemCard, TextAreaField, TextField } from "./fields";
import { SaveBar } from "./SaveBar";

const EMPTY_PROJECT: Project = {
  slug: "",
  title: "",
  oneLiner: "",
  whatThisProves: "[TBD]",
  problem: "",
  method: "",
  metrics: [],
  figure: { src: "", alt: "", caption: "[Figure placeholder]" },
  repoUrl: "",
  techStack: [],
};

export function ProjectsEditor({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const { status, save } = useContentSave("projects");

  function updateProject(index: number, patch: Partial<Project>) {
    setProjects((list) => list.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  function updateMetric(pIndex: number, mIndex: number, field: "label" | "value", value: string) {
    setProjects((list) =>
      list.map((p, i) =>
        i === pIndex
          ? {
              ...p,
              metrics: p.metrics.map((m, j) => (j === mIndex ? { ...m, [field]: value } : m)),
            }
          : p
      )
    );
  }

  function addMetric(pIndex: number) {
    setProjects((list) =>
      list.map((p, i) =>
        i === pIndex ? { ...p, metrics: [...p.metrics, { label: "", value: "[TBD]" }] } : p
      )
    );
  }

  function removeMetric(pIndex: number, mIndex: number) {
    setProjects((list) =>
      list.map((p, i) =>
        i === pIndex ? { ...p, metrics: p.metrics.filter((_, j) => j !== mIndex) } : p
      )
    );
  }

  function updateFigure(pIndex: number, field: keyof Project["figure"], value: string) {
    setProjects((list) =>
      list.map((p, i) => (i === pIndex ? { ...p, figure: { ...p.figure, [field]: value } } : p))
    );
  }

  function addProject() {
    setProjects((list) => [...list, { ...EMPTY_PROJECT }]);
  }

  function removeProject(index: number) {
    setProjects((list) => list.filter((_, i) => i !== index));
  }

  return (
    <FieldGroup>
      {projects.map((project, i) => (
        <ItemCard key={i}>
          <TextField label="Slug" value={project.slug} onChange={(v) => updateProject(i, { slug: v })} />
          <TextField label="Title" value={project.title} onChange={(v) => updateProject(i, { title: v })} />
          <TextAreaField
            label="One-liner (card summary)"
            rows={2}
            value={project.oneLiner}
            onChange={(v) => updateProject(i, { oneLiner: v })}
          />
          <TextAreaField
            label="What this proves (for a GNC/controls reviewer)"
            rows={2}
            value={project.whatThisProves}
            onChange={(v) => updateProject(i, { whatThisProves: v })}
          />
          <TextAreaField
            label="Problem statement"
            value={project.problem}
            onChange={(v) => updateProject(i, { problem: v })}
          />
          <TextAreaField
            label="Method"
            rows={6}
            value={project.method}
            onChange={(v) => updateProject(i, { method: v })}
          />

          <div>
            <span className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
              Metrics
            </span>
            <div className="mt-2 flex flex-col gap-2">
              {project.metrics.map((metric, j) => (
                <div key={j} className="flex items-end gap-2">
                  <div className="flex-1">
                    <TextField
                      label="Label"
                      value={metric.label}
                      onChange={(v) => updateMetric(i, j, "label", v)}
                    />
                  </div>
                  <div className="flex-1">
                    <TextField
                      label="Value"
                      value={metric.value}
                      onChange={(v) => updateMetric(i, j, "value", v)}
                    />
                  </div>
                  <Button variant="danger" onClick={() => removeMetric(i, j)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={() => addMetric(i)}>+ Add metric</Button>
            </div>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
              Figure
            </span>
            <div className="mt-2 flex flex-col gap-2">
              <TextField
                label="Image path (leave blank to show placeholder box)"
                value={project.figure.src}
                onChange={(v) => updateFigure(i, "src", v)}
              />
              <TextField
                label="Alt text"
                value={project.figure.alt}
                onChange={(v) => updateFigure(i, "alt", v)}
              />
              <TextField
                label="Caption"
                value={project.figure.caption}
                onChange={(v) => updateFigure(i, "caption", v)}
              />
            </div>
          </div>

          <TextField
            label="Repo URL"
            value={project.repoUrl}
            onChange={(v) => updateProject(i, { repoUrl: v })}
          />
          <TextField
            label="Tech stack (comma-separated)"
            value={project.techStack.join(", ")}
            onChange={(v) =>
              updateProject(i, {
                techStack: v
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
          />

          <Button variant="danger" onClick={() => removeProject(i)}>
            Remove project
          </Button>
        </ItemCard>
      ))}

      <Button onClick={addProject}>+ Add project</Button>
      <SaveBar status={status} onSave={() => save(projects)} />
    </FieldGroup>
  );
}
