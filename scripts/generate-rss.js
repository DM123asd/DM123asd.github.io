import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');

const SITE = {
  title: 'DM Notes',
  description: '个人技术博客 — 学习笔记、项目拆解与技术探索',
  link: 'https://dm123asd.github.io',
};

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function parseFrontmatter(content) {
  const meta = {};
  let body = content;
  const match = content.match(/^---\n([\s\S]*?)\n---\n*/);
  if (!match) return { meta, body };
  body = content.slice(match[0].length);
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)/);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    }
    meta[key] = value;
  }
  return { meta, body };
}

function plainTextExcerpt(text, len = 200) {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .trim()
    .substring(0, len);
}

function safeUtcDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

// 用缩进层级构建 XML，避免模板字符串空格污染
function tag(name, content, indent = 0) {
  const pad = '  '.repeat(indent);
  if (content === '') return `${pad}<${name}/>`;
  return `${pad}<${name}>${content}</${name}>`;
}

function tagInline(name, content) {
  return `<${name}>${content}</${name}>`;
}

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

const items = files
  .map((file) => {
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { meta, body } = parseFrontmatter(content);
    const slug = file.replace(/\.md$/, '');
    if (meta.draft === 'true' || meta.draft === true) return null;

    // 标题优先取 frontmatter title，其次取 markdown 第一个 H1
    let title = meta.title || slug;
    const h1 = body.match(/^#\s+(.+)/m);
    if (!meta.title && h1) title = h1[1].trim();

    const date = meta.date || new Date().toISOString().split('T')[0];
    const firstPara = body
      .split('\n')
      .find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('!['));
    const excerpt = plainTextExcerpt(firstPara || '');

    return { title, slug, date, excerpt };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// 构建 item XML，每行精确控制缩进
const itemsXml = items
  .map((i) => {
    const lines = [
      tag('title', escapeXml(i.title), 2),
      tag('link', escapeXml(`${SITE.link}/blog/${i.slug}`), 2),
      tag('guid', escapeXml(`${SITE.link}/blog/${i.slug}`), 2),
      tag('pubDate', safeUtcDate(i.date), 2),
      tag('description', escapeXml(i.excerpt), 2),
    ];
    return ['  <item>', ...lines, '  </item>'].join('\n');
  })
  .join('\n');

const channelLines = [
  tag('title', escapeXml(SITE.title), 1),
  tag('description', escapeXml(SITE.description), 1),
  tag('link', escapeXml(SITE.link), 1),
  `  <atom:link href="${escapeXml(`${SITE.link}/rss.xml`)}" rel="self" type="application/rss+xml"/>`,
  tag('lastBuildDate', new Date().toUTCString(), 1),
  itemsXml,
];

const rssXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<?xml-stylesheet type="text/xsl" href="/rss-style.xsl"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '<channel>',
  channelLines.join('\n'),
  '</channel>',
  '</rss>',
  '',
].join('\n');

fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rssXml);
console.log(`RSS generated: ${items.length} articles`);
