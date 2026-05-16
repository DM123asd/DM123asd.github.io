import { useState, useEffect } from 'react';

// 监听页面滚动，追踪当前处于视口的标题
export function useScrollSpy(headings: { id: string; text: string; level: number }[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // 取最靠顶部的可见标题
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return activeId;
}
