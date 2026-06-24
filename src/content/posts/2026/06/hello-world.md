---
title: "Hello World - 欢迎来到我的博客"
date: "2026-06-24"
description: "这是我的第一篇博客文章，介绍这个博客系统的技术选型和搭建过程。"
category: "技术"
tags: ["Next.js", "React", "博客"]
---

# 欢迎来到 mrsun.me

这是我使用 Next.js 16 搭建的个人博客的第一篇文章。在这里，我将分享技术探索的过程和思考。

## 技术选型

这个博客基于以下技术栈构建：

| 技术 | 用途 |
|------|------|
| Next.js 16 | React 全栈框架 |
| Tailwind CSS 4 | 原子化 CSS |
| shadcn/ui | UI 组件库 |
| TypeScript | 类型安全 |
| EdgeOne Pages | 静态部署 |

## 为什么选择静态导出？

静态导出有诸多优势：

- [x] 加载速度极快
- [x] SEO 友好
- [x] 部署成本低
- [x] 安全性高
- [ ] 实时数据处理能力有限

## 代码示例

下面是一个简单的 React 组件示例：

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      点击了 {count} 次
    </button>
  );
}
```

以及一段 JavaScript 代码：

```javascript
const posts = [
  { title: '文章一', date: '2026-06-01' },
  { title: '文章二', date: '2026-06-02' },
];

const sorted = posts.sort((a, b) => b.date.localeCompare(a.date));
console.log(sorted);
```

## 接下来的计划

1. 持续更新技术文章
2. 优化阅读体验
3. 添加更多有趣的功能

> 知识在于积累，技术在于实践。

感谢你的阅读！如果你有任何问题，欢迎在评论区留言。
