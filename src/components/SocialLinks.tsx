import type { SiteLinks } from "@/types/content";

export function SocialLinks({
  links,
  className = "",
}: {
  links: SiteLinks;
  className?: string;
}) {
  const items = [
    { label: "GitHub", href: links.github },
    { label: "LinkedIn", href: links.linkedin },
    { label: "Resume", href: links.resumeUrl },
    { label: "Email", href: `mailto:${links.email}` },
  ];

  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-foreground-muted underline decoration-border transition-colors hover:text-accent hover:decoration-accent"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
