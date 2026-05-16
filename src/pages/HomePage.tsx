import { Link } from 'react-router-dom';
import { blogPosts, projects } from '@/utils/constants';
import { formatDate } from '@/utils/blog';

export function HomePage() {
  const recentPosts = blogPosts.slice(0, 3);
  const recentProjects = projects.slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 全屏背景视频 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/assets/images/site/poster.jpg"
      >
        <source src="/assets/videos/mp_.mp4" type="video/mp4" />
      </video>

      {/* 视频遮罩 */}
      <div className="absolute inset-0 bg-background/70 z-[1]" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-24">
        <h1 className="font-display text-5xl sm:text-7xl leading-tight animate-fade-rise">
          <span className="text-[hsl(var(--primary))]">Code</span>.{' '}
          Learn.{' '}
          <span className="text-[hsl(var(--primary))]">Build</span>.{' '}
          Share.
        </h1>

        <p className="text-muted-foreground max-w-xl mt-6 text-base sm:text-lg animate-fade-rise animate-delay-200">
          DM的个人博客 — 学习笔记、项目拆解与技术探索。
        </p>

        <Link
          to="/blog"
          className="liquid-glass rounded-full px-12 py-4 mt-10 text-sm font-medium text-foreground hover:bg-white/10 transition-all animate-fade-rise animate-delay-400"
        >
          Browse Articles
        </Link>
      </section>

      {/* 精选文章 */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl text-foreground">最新文章</h2>
          <Link to="/blog" className="text-sm text-[hsl(var(--primary))] hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="liquid-glass rounded-xl p-6 transition-all hover:scale-[1.02] hover:bg-white/[0.06]"
            >
              <span className="text-xs text-[hsl(var(--primary))] font-medium">{post.category}</span>
              <h3 className="font-semibold text-foreground mt-2 mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime} 分钟阅读</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 精选项目 */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 pb-32">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl text-foreground">精选项目</h2>
          <Link to="/projects" className="text-sm text-[hsl(var(--primary))] hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentProjects.map((project) => (
            <div key={project.id} className="liquid-glass rounded-xl p-6 transition-all hover:scale-[1.02]">
              <h3 className="font-semibold text-foreground mb-2">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded bg-[hsl(var(--primary))]/10 text-xs text-[hsl(var(--primary))]">
                    {tech}
                  </span>
                ))}
              </div>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
