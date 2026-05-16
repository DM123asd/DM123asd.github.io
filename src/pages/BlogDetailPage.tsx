import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { blogPosts, getMdContent } from '@/utils/constants';
import { formatDate } from '@/utils/blog';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { TableOfContents } from '@/components/common/TableOfContents';
import type { BlogPost } from '@/types';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState('');

  const post: BlogPost | undefined = useMemo(
    () => blogPosts.find((p) => p.slug === slug),
    [slug]
  );

  // 加载 markdown 内容
  useEffect(() => {
    if (!slug) return;
    const md = getMdContent(slug);
    if (md) {
      setContent(md);
    } else {
      setContent('## 文章内容未找到\n\n请在 `content/blog/` 目录下创建对应的 `.md` 文件。');
    }
  }, [slug]);

  // 提取标题用于目录导航
  const headings = useMemo(() => {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const result: { id: string; text: string; level: number }[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w一-鿿]+/g, '-')
        .replace(/(^-|-$)/g, '');
      result.push({ id, text, level: match[1].length });
    }
    return result;
  }, [content]);

  // 上一篇 / 下一篇
  const index = useMemo(() => blogPosts.findIndex((p) => p.slug === slug), [slug]);
  const prevPost = index > 0 ? blogPosts[index - 1] : null;
  const nextPost = index < blogPosts.length - 1 ? blogPosts[index + 1] : null;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-3xl text-foreground mb-4">文章未找到</h1>
        <Link to="/blog" className="text-[hsl(var(--primary))] hover:underline text-sm">
          返回文章列表 →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-10">
        {/* 主内容区 */}
        <article className="min-w-0">
          {/* 文章头部 */}
          <header className="mb-10">
            <Link to="/blog" className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
              ← 返回文章列表
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{formatDate(post.date)}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{post.readTime} 分钟阅读</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="text-[hsl(var(--primary))]">{post.category}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-xs bg-[hsl(var(--secondary))] text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Markdown 内容 */}
          <MarkdownRenderer content={content} />

          {/* 上一篇 / 下一篇 */}
          <nav className="mt-16 pt-8 border-t border-[hsl(var(--border))] grid grid-cols-2 gap-4">
            {prevPost && (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="liquid-glass rounded-xl p-4 hover:scale-[1.02] transition-all"
              >
                <span className="text-xs text-muted-foreground">← 上一篇</span>
                <p className="text-sm text-foreground mt-1 line-clamp-1">{prevPost.title}</p>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="liquid-glass rounded-xl p-4 text-right hover:scale-[1.02] transition-all col-start-2"
              >
                <span className="text-xs text-muted-foreground">下一篇 →</span>
                <p className="text-sm text-foreground mt-1 line-clamp-1">{nextPost.title}</p>
              </Link>
            )}
          </nav>
        </article>

        {/* 右侧目录 */}
        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
