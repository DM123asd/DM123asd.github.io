# DM Notes — 个人技术博客项目指南

## 项目简介

这是一个基于 **React 18 + TypeScript + Vite + Tailwind CSS** 构建的现代化个人技术博客。支持 Markdown 渲染、LaTeX 公式、代码高亮、深色模式。

## 技术栈

| 技术 | 用途 |
|------|------|
| React 18 | 前端框架 |
| TypeScript | 类型系统 |
| Vite | 构建工具 |
| Tailwind CSS | 样式框架 |
| react-router-dom | 路由 |
| react-markdown | Markdown 渲染 |
| remark-math + rehype-katex | LaTeX 公式 |
| react-syntax-highlighter | 代码高亮 |

## 项目结构

```
blog-ds/
├── content/blog/                  # 【重要】Markdown 文章文件夹
│   ├── hello-world.md             # 示例文章（测试 LaTeX、代码、图片）
│   ├── testing-guide.md           # 示例文章
│   └── system-design-notes.md     # 示例文章
├── public/assets/
│   ├── images/
│   │   ├── blog/                  # 【重要】博客文章图片文件夹
│   │   └── site/                  # 【重要】网站素材文件夹（头像、图标等）
│   └── videos/
│       └── mp_.mp4                # 首页背景视频
├── src/
│   ├── components/
│   │   ├── common/                # 通用组件
│   │   │   ├── MarkdownRenderer.tsx  # Markdown 统一渲染器
│   │   │   ├── CodeBlock.tsx         # 代码块（高亮+复制）
│   │   │   ├── ImageViewer.tsx       # 图片（懒加载+点击预览）
│   │   │   ├── ThemeToggle.tsx       # 深色/浅色主题切换
│   │   │   ├── TableOfContents.tsx   # 文章目录导航
│   │   │   ├── BackToTop.tsx         # 返回顶部按钮
│   │   │   ├── SearchBar.tsx         # 搜索栏
│   │   │   ├── TagCloud.tsx          # 标签云
│   │   │   └── Pagination.tsx        # 分页组件
│   │   ├── layout/                # 布局组件
│   │   │   ├── Navbar.tsx            # 响应式导航栏
│   │   │   ├── Footer.tsx            # 页脚
│   │   │   └── Layout.tsx            # 通用页面布局
│   │   ├── home/                  # 首页组件
│   │   ├── blog/                  # 博客组件
│   │   ├── projects/              # 项目组件
│   │   └── about/                 # 关于页组件
│   ├── pages/                     # 页面组件
│   │   ├── HomePage.tsx
│   │   ├── BlogListPage.tsx
│   │   ├── BlogDetailPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── hooks/                     # 自定义 Hooks
│   │   ├── useTheme.ts            # 主题管理
│   │   └── useScrollSpy.ts        # 滚动监听
│   ├── types/                     # TypeScript 类型定义
│   ├── utils/                     # 工具函数和常量数据
│   ├── App.tsx                    # 根组件（路由配置）
│   ├── main.tsx                   # 入口文件
│   └── index.css                  # 全局样式 + Tailwind
├── .github/workflows/deploy.yml   # GitHub Actions 自动部署
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── index.html
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
npm run dev
```

浏览器访问 `http://localhost:5173` 即可查看。

### 3. 发布新文章

在 `content/blog/` 目录下创建新的 `.md` 文件，然后在 `src/utils/constants.ts` 的 `blogPosts` 数组中添加对应的元数据：

```typescript
{
  slug: 'my-new-post',          // 文件名（不含 .md）
  title: '文章标题',
  excerpt: '文章摘要...',
  date: '2026-05-09',
  readTime: 5,
  category: '前端开发',
  tags: ['React', 'TypeScript'],
  featured: false,
}
```

### 4. 添加图片

- **博客文章图片**：放入 `public/assets/images/blog/`，在 markdown 中使用 `/assets/images/blog/your-image.png`
- **网站素材图片**：放入 `public/assets/images/site/`（如头像、图标等）

### 5. 构建生产版本

```bash
npm run build
```

产出在 `dist/` 目录。

## 部署到 GitHub Pages

### 方法一：GitHub Actions（推荐）

1. 将代码推送到 GitHub 仓库
2. 在仓库 Settings → Pages 中，将 Source 设为 **GitHub Actions**
3. 推送代码到 `main` 分支即可自动部署

### 方法二：手动部署

```bash
npm run build
# 将 dist/ 目录内容推送到 gh-pages 分支
```

## 功能特性

### Markdown 渲染
- 支持完整 Markdown 语法（GFM）
- LaTeX 公式（行内 `$...$` 和块级 `$$...$$`）
- 代码高亮（Prism + Dracula 主题）
- 代码块复制按钮和语言标签
- 图片懒加载 + 点击预览
- 响应式设计，移动端友好

### 博客功能
- 文章搜索（标题、内容、标签）
- 分类筛选
- 标签云
- 分页（每页 10 篇）
- 按日期/阅读时间排序
- 文章目录导航（滚动高亮）
- 上一篇/下一篇导航
- 返回顶部按钮

### 主题
- 深色模式（默认）
- 浅色模式
- 跟随系统主题
- Liquid Glass 毛玻璃效果

## 自定义配置

### 修改个人信息

编辑 `src/utils/constants.ts` 中的 `profile` 对象，更新姓名、简介、技能、经历等信息。

### 修改项目展示

编辑 `src/utils/constants.ts` 中的 `projects` 数组。

### 修改颜色主题

编辑 `src/index.css` 中的 CSS 变量（`.dark` 和 `.light` 两套）。

## 扩展方向

1. **CMS 集成**：接入 Contentful 或 Notion 作为内容管理后台
2. **评论系统**：集成 Giscus（基于 GitHub Discussions）
3. **RSS 订阅**：生成 RSS Feed 供读者订阅
4. **统计**：集成 Google Analytics 或 Plausible
5. **SEO 优化**：添加 react-helmet-async 管理 meta 标签
6. **全文搜索**：使用 FlexSearch 或 Fuse.js 增强搜索
7. **PWA**：添加 Service Worker 实现离线访问
