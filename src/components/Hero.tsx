import type { SiteConfig } from "@/types/content";
import { SocialLinks } from "./SocialLinks";

export function Hero({ site }: { site: SiteConfig }) {
  return (
    <header className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-6 py-24 md:min-h-[80vh]">
      <p className="mb-4 font-mono text-sm text-accent">$ whoami</p>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
        {site.name}
      </h1>
      <p className="mt-5 max-w-2xl font-mono text-base text-foreground-muted md:text-lg">
        {site.positioning}
      </p>
      <SocialLinks links={site.links} className="mt-10" />
    </header>
  );
}
