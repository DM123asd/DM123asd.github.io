import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40">
      {/* 主标题 */}
      <h1 className="font-display text-5xl sm:text-7xl leading-tight animate-fade-rise">
        <span className="text-[hsl(var(--primary))]">Code</span>.{' '}
        Learn.{' '}
        <span className="text-[hsl(var(--primary))]">Build</span>.{' '}
        Share.
      </h1>

      {/* 副标题 */}
      <p className="text-muted-foreground max-w-xl mt-6 text-base sm:text-lg animate-fade-rise animate-delay-200">
        DM的个人博客 — 学习笔记、项目拆解与技术探索。
      </p>

      {/* CTA 按钮 */}
      <Link
        to="/blog"
        className="liquid-glass rounded-full px-12 py-4 mt-10 text-sm font-medium text-foreground hover:bg-white/10 transition-all animate-fade-rise animate-delay-400"
      >
        Browse Articles
      </Link>
    </section>
  );
}
