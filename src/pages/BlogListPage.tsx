import { useState, useMemo } from 'react';
import { blogPosts } from '@/utils/constants';
import { categories, knownTags } from '@/data/siteConfig';
import { BlogCard } from '@/components/blog/BlogCard';
import { SearchBar } from '@/components/common/SearchBar';
import { TagCloud } from '@/components/common/TagCloud';
import { Pagination } from '@/components/common/Pagination';
import { VideoBg } from '@/components/common/VideoBg';
import type { BlogPost } from '@/types';

const PAGE_SIZE = 10;

export function BlogListPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'readTime'>('date');
  const [page, setPage] = useState(1);

  // 标签 = 常用标签 + 文章自动发现的标签
  const allTags = useMemo(() => {
    const discovered = blogPosts.flatMap((p) => p.tags);
    return [...new Set([...knownTags, ...discovered])];
  }, []);

  // 筛选 & 排序
  const filteredPosts = useMemo(() => {
    let result: BlogPost[] = [...blogPosts];

    // 搜索
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 分类筛选
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 标签筛选
    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }

    // 排序
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      result.sort((a, b) => b.readTime - a.readTime);
    }

    return result;
  }, [search, activeCategory, activeTag, sortBy]);

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const pagedPosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 切换筛选条件时重置页码
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };
  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setPage(1);
  };
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
      {/* 顶部视频背景区域：铺满标题+搜索栏+分类筛选 */}
      <div className="relative -mx-6 sm:-mx-12 -mt-16 px-6 sm:px-12 pt-16 pb-10 mb-6 overflow-hidden">
        <VideoBg src="/assets/videos/blog.mp4" />
        <div className="relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-8">文章</h1>
          <div className="mb-6 max-w-md">
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('')}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  activeCategory === ''
                    ? 'bg-[hsl(var(--primary))] text-white'
                    : 'bg-[hsl(var(--secondary))] text-muted-foreground hover:text-foreground'
                }`}
              >
                全部分类
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    activeCategory === cat
                      ? 'bg-[hsl(var(--primary))] text-white'
                      : 'bg-[hsl(var(--secondary))] text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'readTime')}
              className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg px-3 py-1.5 text-xs text-muted-foreground focus:outline-none"
            >
              <option value="date">按日期排序</option>
              <option value="readTime">按阅读时间排序</option>
            </select>
          </div>
        </div>
      </div>

      {/* 下方内容：文章列表 + 分页 + 标签云 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
        <div>
          {pagedPosts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {pagedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg mb-2">没有找到匹配的文章</p>
              <p className="text-sm">请尝试其他搜索条件</p>
            </div>
          )}
          <Pagination
            currentPage={Math.min(page, totalPages || 1)}
            totalItems={filteredPosts.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h4 className="font-semibold text-foreground mb-3 text-sm">标签</h4>
            <TagCloud tags={allTags} activeTag={activeTag} onTagClick={handleTagChange} />
          </div>
        </aside>
      </div>
    </div>
  );
}
