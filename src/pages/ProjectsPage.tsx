import { useState, useMemo } from 'react';
import { projects } from '@/utils/constants';
import { SearchBar } from '@/components/common/SearchBar';
import { VideoBg } from '@/components/common/VideoBg';

export function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [activeTech, setActiveTech] = useState('');

  const allTechs = useMemo(
    () => [...new Set(projects.flatMap((p) => p.techStack))].sort(),
    []
  );

  const filteredProjects = useMemo(() => {
    let result = projects;

    // 搜索过滤
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 技术栈过滤
    if (activeTech) {
      result = result.filter((p) => p.techStack.includes(activeTech));
    }

    return result;
  }, [search, activeTech]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
      {/* 顶部视频背景区域：标题+搜索栏+技术栈筛选 */}
      <div className="relative -mx-6 sm:-mx-12 -mt-16 px-6 sm:px-12 pt-16 pb-10 mb-6 overflow-hidden">
        <VideoBg src="/assets/videos/project.mp4" />
        <div className="relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-4">项目</h1>
          <p className="text-muted-foreground mb-6">我参与和开发的一些项目。</p>
          <div className="mb-6 max-w-md">
            <SearchBar value={search} onChange={setSearch} placeholder="搜索项目..." />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTech('')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                activeTech === ''
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-[hsl(var(--secondary))] text-muted-foreground hover:text-foreground'
              }`}
            >
              全部
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  activeTech === tech
                    ? 'bg-[hsl(var(--primary))] text-white'
                    : 'bg-[hsl(var(--secondary))] text-muted-foreground hover:text-foreground'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 项目卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="liquid-glass rounded-xl p-6 transition-all hover:scale-[1.02] hover:bg-white/[0.06] flex flex-col"
          >
            {/* 封面图片 */}
            {project.coverImage ? (
              <div className="mb-4 rounded-lg overflow-hidden bg-[hsl(var(--secondary))] aspect-video">
                <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="mb-4 rounded-lg bg-[hsl(var(--secondary))] aspect-video flex items-center justify-center text-muted-foreground text-xs">
                {project.name}
              </div>
            )}

            <h3 className="font-semibold text-foreground mb-2">{project.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

            {/* 技术栈标签 */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 rounded text-[0.65rem] ${
                    activeTech === tech
                      ? 'bg-[hsl(var(--primary))] text-white'
                      : 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* 链接 */}
            <div className="flex gap-4 text-xs">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub →
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--primary))] hover:underline"
                >
                  在线演示 →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
