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
├── content/
│   ├── blog/                      # 【重要】Markdown 文章文件夹（自动发现）
│   │   ├── hello-world.md
│   │   ├── testing-guide.md
│   │   ├── system-design-notes.md
│   │   └── ...
│   └── projects/                  # 【重要】项目信息文件夹（自动发现）
│       ├── blog-ds.md
│       ├── component-library.md
│       └── api-hub.md
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── blog/                  # 【重要】博客文章图片文件夹
│   │   │   └── site/                  # 【重要】网站素材文件夹（头像、图标等）
│   │   └── videos/                    # 视频背景文件（不同页面可指定不同视频）
│   │       └── mp_.mp4
│   └── rss-style.xsl              # RSS 浏览器友好样式
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
│   │   │   ├── Pagination.tsx        # 分页组件
│   │   │   └── VideoBg.tsx           # 视频背景组件
│   │   ├── layout/                # 布局组件
│   │   │   ├── Navbar.tsx            # 响应式导航栏
│   │   │   ├── Footer.tsx            # 页脚
│   │   │   └── Layout.tsx            # 通用页面布局
│   │   ├── home/                  # 首页组件 (HeroSection)
│   │   └── blog/                  # 博客组件 (BlogCard)
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
│   ├── data/                      # 个人数据与站点配置
│   │   ├── profile.ts             # 个人信息（姓名、技能、经历、社交链接）
│   │   └── siteConfig.ts          # 分类和标签管理
│   ├── types/                     # TypeScript 类型定义
│   ├── utils/                     # 工具函数和常量数据
│   ├── App.tsx                    # 根组件（路由配置）
│   ├── main.tsx                   # 入口文件
│   └── index.css                  # 全局样式 + Tailwind
├── .github/workflows/deploy.yml   # GitHub Actions 自动部署
├── scripts/
│   └── generate-rss.js            # RSS 订阅源生成脚本
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

在 `content/blog/` 目录下创建新的 `.md` 文件，使用 YAML frontmatter 声明元数据，文章会被**自动发现**：

```markdown
---
title: 文章标题
date: 2026-05-16
category: 前端开发
tags: [React, TypeScript]
---

这里是文章正文...
```

- `title` — 标题（可选，不写则取正文第一个 H1）
- `date` — 日期
- `category` — 分类（与 `src/data/siteConfig.ts` 中 `categories` 数组对应）
- `tags` — 标签数组
- `draft` — 设为 `true` 可隐藏该文章

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

### 订阅
- RSS Feed 生成（`/rss.xml`，带浏览器友好样式）

## 自定义配置

### 修改个人信息

编辑 `src/data/profile.ts`，更新姓名、简介、技能、经历、社交链接等信息。

### 修改项目展示

编辑 `content/projects/*.md` 中的 YAML frontmatter，或新建 `.md` 文件。每个项目的元数据格式：

```markdown
---
name: 项目名称
description: 项目简介
coverImage: /assets/images/cover.png
techStack: [React, TypeScript]
githubUrl: https://github.com/xxx
demoUrl: https://xxx.vercel.app
---
```

### 修改分类和标签

编辑 `src/data/siteConfig.ts`，在 `categories` 或 `knownTags` 数组中增减项即可。

### 修改颜色主题

编辑 `src/index.css` 中的 CSS 变量（`.dark` 和 `.light` 两套）。

## 扩展方向

1. **CMS 集成**：接入 Contentful 或 Notion 作为内容管理后台
2. **评论系统**：集成 Giscus（基于 GitHub Discussions）
3. **统计**：集成 Google Analytics 或 Plausible

