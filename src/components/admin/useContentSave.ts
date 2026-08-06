"use client";

import { useState } from "react";
import type { ContentKey } from "@/lib/validate-content";

type SaveStatus = { state: "idle" } | { state: "saving" } | { state: "success"; commitUrl: string } | { state: "error"; message: string };

export function useContentSave(key: ContentKey) {
  const [status, setStatus] = useState<SaveStatus>({ state: "idle" });

  async function save(data: unknown) {
    setStatus({ state: "saving" });
    try {
      const res = await fetch(`/api/admin/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const body = await res.json();

      if (!res.ok) {
        setStatus({ state: "error", message: body.error ?? "Save failed." });
        return;
      }

      setStatus({ state: "success", commitUrl: body.commitUrl });
    } catch {
      setStatus({ state: "error", message: "Network error — try again." });
    }
  }

  return { status, save };
}
