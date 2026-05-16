---
title: 前端测试策略与实践
date: 2025-04-25
category: 前端开发
tags: [测试, Jest, Cypress]
---

这是一篇关于前端测试的示例文章。

## 单元测试

单元测试是前端测试的基础。使用 Jest 或 Vitest 编写：

```javascript
import { describe, it, expect } from 'vitest';

describe('sum', () => {
  it('should add two numbers', () => {
    expect(1 + 1).toBe(2);
  });
});
```

## 关键公式

测试覆盖率公式：

$$\text{Coverage} = \frac{\text{Lines Covered}}{\text{Total Lines}} \times 100\%$$

## 组件测试

使用 React Testing Library：

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello world', () => {
  render(<App />);
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});
```

## 总结

一个好的测试策略能显著提升代码质量和开发效率。
