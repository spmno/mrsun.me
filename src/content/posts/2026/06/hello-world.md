---
title: "Hello World - Welcome to My Blog"
date: "2026-06-24"
description: "My first blog post, covering the tech choices and setup process behind this blog."
category: "Tech"
tags: ["Next.js", "React", "blogging"]
---

# Welcome to mrsun.me

This is the first post on the personal blog I built with Next.js 16. Here I'll share my process and thoughts as I explore technology.

## Tech Choices

This blog is built on the following stack:

| Technology | Purpose |
|------|------|
| Next.js 16 | Full-stack React framework |
| Tailwind CSS 4 | Utility-first CSS |
| shadcn/ui | UI component library |
| TypeScript | Type safety |
| EdgeOne Pages | Static deployment |

## Why Static Export?

Static export has plenty of advantages:

- [x] Extremely fast loading
- [x] SEO friendly
- [x] Low deployment costs
- [x] High security
- [ ] Limited real-time data processing

## Code Examples

Here's a simple React component:

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

And some JavaScript:

```javascript
const posts = [
  { title: 'Post One', date: '2026-06-01' },
  { title: 'Post Two', date: '2026-06-02' },
];

const sorted = posts.sort((a, b) => b.date.localeCompare(a.date));
console.log(sorted);
```

## What's Next

1. Keep publishing tech articles
2. Improve the reading experience
3. Add more interesting features

> Knowledge is built through accumulation; skill is honed through practice.

Thanks for reading! If you have any questions, feel free to leave a comment.
