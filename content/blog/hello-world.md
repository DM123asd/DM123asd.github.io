---
title: 搭建个人技术博客的完整指南
date: 2025-05-01
category: 前端开发
tags: [React, TypeScript, Vite, 博客]
---

这是一篇**测试博文**，用于验证博客的 Markdown 渲染功能。

## LaTeX 公式测试

行内公式测试：质能方程 $E=mc^2$ 是物理学中最著名的公式之一。

块级公式测试：

$$\int_0^\infty e^{-x}dx = 1$$

另一个常用公式：

$$\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

## 代码高亮测试

### JavaScript

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

console.log(fibonacci(10)); // 55
```

### Python

```python
from typing import List

def quick_sort(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))
```

### HTML

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>示例页面</title>
</head>
<body>
  <div id="app">
    <h1>Hello World</h1>
  </div>
</body>
</html>
```

## 图片测试

### 远程图片

![React Logo](https://react.dev/images/home/conf2021/cover.svg)

### 相对路径图片

![本地图片](/assets/images/site/favicon.svg)


## 表格测试

| 技术 | 用途 | 难度 |
|------|------|------|
| React | 前端框架 | 中等 |
| TypeScript | 类型系统 | 中等 |
| Vite | 构建工具 | 简单 |
| Tailwind CSS | 样式框架 | 简单 |

## 引用测试

> 代码是写给人看的，顺便让机器执行。
> — *Structure and Interpretation of Computer Programs*

## 列表测试

### 有序列表

1. 初始化项目
2. 安装依赖
3. 编写代码
4. 测试
5. 部署

### 无序列表

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式
- GitHub Pages 部署

---

以上就是本篇测试博文的全部内容。如果所有元素都渲染正常，说明博客系统工作良好！
