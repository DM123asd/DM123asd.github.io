// 博客文章元数据类型
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string; // 摘要
  date: string; // ISO 日期字符串
  readTime: number; // 阅读时间（分钟）
  category: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
}

// 项目类型（仅做信息聚合展示，实际代码在 GitHub 仓库）
export interface Project {
  id: string;
  name: string;
  description: string;
  coverImage?: string; // 封面图片路径
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string; // 在线预览链接
}

// 工作/教育经历类型
export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string; // e.g. "2020 - 2024"
  description: string;
  type: 'work' | 'education';
}

// 技能类型
export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

// 社交链接类型
export interface SocialLink {
  name: string;
  url: string;
  icon: string; // SVG 路径或图标名
}

// 个人资料类型
export interface Profile {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  location: string;
  email: string;
  socialLinks: SocialLink[];
  skills: Skill[];
  timeline: TimelineItem[];
}
