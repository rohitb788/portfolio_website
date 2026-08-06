import type { SiteConfig } from "@/types/content";
import { SocialLinks } from "./SocialLinks";

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer id="contact" className="border-t border-border py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-foreground-muted">
          {site.name} — built with Next.js
        </p>
        <SocialLinks links={site.links} />
      </div>
    </footer>
  );
}
