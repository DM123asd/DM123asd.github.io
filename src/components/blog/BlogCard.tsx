import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types';
import { formatDate } from '@/utils/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="liquid-glass rounded-xl p-6 transition-all hover:scale-[1.02] hover:bg-white/[0.06] block"
    >
      {/* 分类标签 */}
      <span className="text-xs text-[hsl(var(--primary))] font-medium">{post.category}</span>

      {/* 标题 */}
      <h3 className="font-semibold text-foreground mt-2 mb-2 text-lg line-clamp-2">{post.title}</h3>

      {/* 摘要 */}
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>

      {/* 标签 */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[0.65rem] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 日期 & 阅读时间 */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{formatDate(post.date)}</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
        <span>{post.readTime} 分钟阅读</span>
      </div>
    </Link>
  );
}
