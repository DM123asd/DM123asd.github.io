import type { BlogPost } from '@/types';
import { parseFrontmatter } from '@/utils/yaml';

// 自动发现 content/blog/ 下所有 .md 文件
const mdModules: Record<string, { default: string }> = import.meta.glob(
  '../../content/blog/*.md',
  { query: '?raw', eager: true }
);

function parseBlogPost(key: string, content: string): BlogPost | null {
  const slug = key.replace(/.*\/(.+)\.md$/, '$1');
  const { meta, body } = parseFrontmatter(content);

  if (meta.draft === 'true') return null;

  // 标题优先取 YAML title，回退取正文第一个 H1，再回退取 slug
  let title = (meta.title as string) || '';
  if (!title) {
    const h1 = body.match(/^#\s+(.+)/m);
    title = h1 ? h1[1].trim() : slug;
  }

  // 取正文第一段非空文本作摘要
  let excerpt = '';
  for (const line of body.split('\n')) {
    const t = line.trim();
    if (t && !t.startsWith('#') && !t.startsWith('![') && !t.startsWith('```')) {
      excerpt = t
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .substring(0, 150);
      break;
    }
  }

  return {
    slug,
    title,
    excerpt: excerpt || title,
    date: (meta.date as string) || new Date().toISOString().split('T')[0],
    readTime: Math.max(1, Math.ceil(content.replace(/\s/g, '').length / 500)),
    category: (meta.category as string) || '未分类',
    tags: (meta.tags as string[]) || [],
    featured: false,
  };
}

export const blogPosts: BlogPost[] = Object.entries(mdModules)
  .map(([key, mod]) => parseBlogPost(key, mod.default))
  .filter((p): p is BlogPost => p !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getMdContent(slug: string): string | null {
  const key = `../../content/blog/${slug}.md`;
  const raw = mdModules[key]?.default;
  if (!raw) return null;
  let body = parseFrontmatter(raw).body;
  body = body.replace(/^#\s+.+(\n|$)/, ''); 
  return body.trimStart();
}
