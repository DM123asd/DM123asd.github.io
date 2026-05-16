import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* 版权 */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-2">DM Notes</h4>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DM Notes. All rights reserved.
            </p>
          </div>

          {/* 链接 */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">导航</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">首页</Link>
              <Link to="/blog" className="hover:text-foreground transition-colors">文章</Link>
              <Link to="/projects" className="hover:text-foreground transition-colors">项目</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">关于</Link>
            </div>
          </div>

          {/* 社交媒体 */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">社交媒体</h4>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
