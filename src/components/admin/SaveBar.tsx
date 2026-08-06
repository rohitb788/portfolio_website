"use client";

import { Button } from "./fields";

type SaveStatus =
  | { state: "idle" }
  | { state: "saving" }
  | { state: "success"; commitUrl: string }
  | { state: "error"; message: string };

export function SaveBar({ status, onSave }: { status: SaveStatus; onSave: () => void }) {
  return (
    <div className="flex items-center gap-4 border-t border-border pt-4">
      <Button variant="primary" onClick={onSave} disabled={status.state === "saving"}>
        {status.state === "saving" ? "Committing…" : "Save changes"}
      </Button>
      {status.state === "success" && (
        <a
          href={status.commitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-accent underline"
        >
          Committed ✓ — view commit
        </a>
      )}
      {status.state === "error" && (
        <span role="alert" className="font-mono text-xs text-red-400">
          {status.message}
        </span>
      )}
    </div>
  );
}
