import Image from "next/image";
import type { ProjectFigure } from "@/types/content";

export function ProjectFigureBlock({ figure }: { figure: ProjectFigure }) {
  return (
    <figure>
      {figure.src ? (
        <Image
          src={figure.src}
          alt={figure.alt}
          width={960}
          height={540}
          className="w-full rounded-sm border border-border"
        />
      ) : (
        <div
          role="img"
          aria-label={figure.alt}
          className="flex aspect-video w-full items-center justify-center rounded-sm border border-dashed border-border bg-background-elevated px-6 text-center"
        >
          <span className="font-mono text-xs text-foreground-muted">
            {figure.caption}
          </span>
        </div>
      )}
      {figure.src && (
        <figcaption className="mt-2 font-mono text-xs text-foreground-muted">
          {figure.caption}
        </figcaption>
      )}
    </figure>
  );
}
