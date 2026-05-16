import type { Project } from '@/types';
import { parseFrontmatter } from '@/utils/yaml';

// 自动发现 content/projects/ 下所有 .md 文件（只有 YAML 元数据，不内嵌内容）
const projModules: Record<string, { default: string }> = import.meta.glob(
  '../../content/projects/*.md',
  { query: '?raw', eager: true }
);

function parseProject(key: string, content: string): Project {
  const id = key.replace(/.*\/(.+)\.md$/, '$1');
  const { meta } = parseFrontmatter(content);

  return {
    id,
    name: (meta.name as string) || id,
    description: (meta.description as string) || '',
    coverImage: meta.coverImage as string | undefined,
    techStack: (meta.techStack as string[]) || [],
    githubUrl: meta.githubUrl as string | undefined,
    demoUrl: meta.demoUrl as string | undefined,
  };
}

export const projects: Project[] = Object.entries(projModules).map(([key, mod]) =>
  parseProject(key, mod.default)
);
