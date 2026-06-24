---
title: "Next.js 16 静态导出完全指南"
date: "2026-06-23"
description: "详解如何使用 Next.js 16 的静态导出功能构建一个完整的博客系统，包括动态路由、SEO 和部署配置。"
category: "教程"
tags: ["Next.js", "TypeScript", "前端"]
---

# Next.js 16 静态导出指南

Next.js 16 的静态导出功能让我们可以在构建时生成完整的静态 HTML 文件，非常适合博客和文档站点。

## 基础配置

在 `next.config.ts` 中开启静态导出：

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

## 动态路由与 generateStaticParams

静态导出要求所有动态路由在构建时确定。使用 `generateStaticParams` 来预生成所有页面：

```tsx
export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    year: post.year,
    month: post.month,
    slug: post.slug,
  }));
}
```

### Next.js 16 的重要变化

在 Next.js 16 中，`params` 现在是一个 Promise：

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ...
}
```

## Route Handlers 与静态生成

Route Handlers 可以在构建时生成静态文件。例如，生成 RSS feed：

```ts
export async function GET() {
  const posts = getAllPostsMeta();

  return new Response(generateRSSXML(posts), {
    headers: { 'Content-Type': 'text/xml' },
  });
}
```

这会在构建时生成 `/rss.xml` 静态文件。

## SEO 配置

使用 Metadata API 配置页面元数据：

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的博客',
  description: '探索技术之美',
  openGraph: {
    title: '我的博客',
    type: 'website',
  },
};
```

## 部署注意事项

- 禁用 `sharp`：设置 `images.unoptimized: true`
- 所有动态路由必须提供 `generateStaticParams`
- 不能使用 Server Actions、ISR 或需要运行时的 API 路由
- 使用 `trailingSlash: true` 确保 URL 格式统一

## 总结

Next.js 16 的静态导出功能非常强大，结合 App Router 可以构建出功能完整、性能优异的静态站点。
