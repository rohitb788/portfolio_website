import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  children,
  className = "",
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-border py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-baseline gap-3 md:mb-10">
          <span className="font-mono text-sm text-accent">{index}</span>
          <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-foreground-muted">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
