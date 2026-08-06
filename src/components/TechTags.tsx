export function TechTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-foreground-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
