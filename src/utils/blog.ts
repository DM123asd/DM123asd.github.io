import type { BlogPost } from '@/types';

// 格式化日期为更友好的中文显示
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

//分类映射（slug 到中文名）
export const categoryMap: Record<string, string> = {
  'frontend': '前端开发',
  'backend': '后端开发',
  'system-design': '系统设计',
  'ai': '人工智能',
  'devops': 'DevOps',
  'other': '其他',
};

// 估算阅读时间（基于中文字数）
export function estimateReadTime(text: string): number {
  const charCount = text.replace(/\s/g, '').length;
  return Math.max(1, Math.ceil(charCount / 500)); // 约 500 字/分钟
}
