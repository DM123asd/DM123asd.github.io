// 在这管理博客的分类和标签
// 新增分类/标签：直接在数组里加一项即可

// 博客分类列表（在文章列表页显示为筛选按钮）
export const categories: string[] = [
  '前端开发',
  '后端开发',
  '系统设计',
  'DevOps',
  'AI',
  '数学',
  '工具推荐',
  '计算机基础知识',
  '随笔',
];

// 常用标签（在标签云中会显示，超出此列表的标签由文章自动发现）
export const knownTags: string[] = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Node.js',
  'Python',
  'Docker',
  'Architecture',
  'Microservices',
  '测试',
  '线性代数',
  '数据结构',
  'CI/CD',
  'GitHub',
];
