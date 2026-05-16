import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="font-display text-8xl text-[hsl(var(--primary))] mb-4">404</h1>
      <p className="text-muted-foreground text-lg mb-8">页面不存在</p>
      <Link
        to="/"
        className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground hover:scale-105 transition-all"
      >
        返回首页
      </Link>
    </div>
  );
}
