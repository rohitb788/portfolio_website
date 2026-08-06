"use client";

import type { ReactNode } from "react";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-sm border border-border bg-background-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-sm border border-border bg-background-elevated px-3 py-2 text-sm leading-relaxed text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}

export function Button({
  children,
  onClick,
  type = "button",
  variant = "secondary",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}) {
  const variantClasses = {
    primary: "bg-accent text-accent-foreground hover:opacity-90",
    secondary: "border border-border text-foreground hover:border-accent",
    danger: "border border-border text-red-400 hover:border-red-400",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-sm px-3 py-1.5 font-mono text-xs font-medium transition-colors disabled:opacity-50 ${variantClasses}`}
    >
      {children}
    </button>
  );
}

export function FieldGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function ItemCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-sm border border-border bg-background-elevated p-4">
      {children}
    </div>
  );
}
