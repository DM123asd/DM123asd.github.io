import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { CodeBlock } from './CodeBlock';
import { ImageViewer } from './ImageViewer';
import { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 从内容中提取标题用于目录导航
  const headings = useMemo(() => {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const result: { id: string; text: string; level: number }[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w一-鿿]+/g, '-')
        .replace(/(^-|-$)/g, '');
      result.push({ id, text, level: match[1].length });
    }
    return result;
  }, [content]);

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
        components={{
          // 代码块
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            if (isInline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <CodeBlock
                language={match[1]}
                code={String(children).replace(/\n$/, '')}
              />
            );
          },
          // 图片
          img({ src, alt }) {
            if (!src) return null;
            return <ImageViewer src={src} alt={alt || ''} />;
          },
          // 链接 - 外部链接在新标签页打开
          a({ href, children }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            );
          },
          // 标题绑定 id 以支持目录跳转
          h2({ children, ...props }) {
            const text = extractText(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w一-鿿]+/g, '-')
              .replace(/(^-|-$)/g, '');
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3({ children, ...props }) {
            const text = extractText(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w一-鿿]+/g, '-')
              .replace(/(^-|-$)/g, '');
            return <h3 id={id} {...props}>{children}</h3>;
          },
          h4({ children, ...props }) {
            const text = extractText(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w一-鿿]+/g, '-')
              .replace(/(^-|-$)/g, '');
            return <h4 id={id} {...props}>{children}</h4>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// 从 React children 中提取纯文本
function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as React.ReactElement).props.children);
  }
  return '';
}
