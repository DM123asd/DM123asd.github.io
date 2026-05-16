interface TagCloudProps {
  tags: string[];
  activeTag: string;
  onTagClick: (tag: string) => void;
}

export function TagCloud({ tags, activeTag, onTagClick }: TagCloudProps) {
  // 统计每个标签的出现次数
  const tagCount = tags.reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const uniqueTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagClick('')}
        className={`px-3 py-1 rounded-full text-xs transition-colors ${
          activeTag === ''
            ? 'bg-[hsl(var(--primary))] text-white'
            : 'bg-[hsl(var(--secondary))] text-muted-foreground hover:text-foreground'
        }`}
      >
        全部
      </button>
      {uniqueTags.map(([tag]) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`px-3 py-1 rounded-full text-xs transition-colors ${
            activeTag === tag
              ? 'bg-[hsl(var(--primary))] text-white'
              : 'bg-[hsl(var(--secondary))] text-muted-foreground hover:text-foreground'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
