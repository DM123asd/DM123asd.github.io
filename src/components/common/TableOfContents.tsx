import { useScrollSpy } from '@/hooks/useScrollSpy';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const activeId = useScrollSpy(headings);

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm">
      <h4 className="font-semibold text-foreground mb-3">目录</h4>
      <ul className="space-y-1.5 border-l-2 border-[hsl(var(--border))]">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: `${(h.level - 1) * 12}px` }}
          >
            <a
              href={`#${h.id}`}
              className={`block py-0.5 text-xs transition-colors hover:text-[hsl(var(--primary))] ${
                activeId === h.id
                  ? 'text-[hsl(var(--primary))] border-l-2 border-[hsl(var(--primary))] -ml-[2px] pl-[10px]'
                  : 'text-muted-foreground'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
