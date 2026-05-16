// 共享的 YAML frontmatter 解析（mdLoader 和 projectLoader 共用）

export function parseFrontmatter(content: string): { meta: Record<string, string | string[]>; body: string } {
  const meta: Record<string, string | string[]> = {};
  let body = content;

  const match = content.match(/^---\n([\s\S]*?)\n---\n*/);
  if (!match) return { meta, body };

  body = content.slice(match[0].length);
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)/);
    if (!kv) continue;
    const key = kv[1];
    let value: string | string[] = kv[2].trim();

    // 数组 [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    }

    meta[key] = value;
  }

  return { meta, body };
}
