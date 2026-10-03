---
title: "The Complete Guide to Next.js 16 Static Export"
date: "2026-06-23"
description: "A detailed walkthrough of building a complete blog system with Next.js 16 static export, covering dynamic routes, SEO, and deployment configuration."
category: "Tutorials"
tags: ["Next.js", "TypeScript", "frontend"]
---

# Next.js 16 Static Export Guide

Next.js 16's static export feature lets us generate complete static HTML files at build time, which makes it a great fit for blogs and documentation sites.

## Basic Configuration

Enable static export in `next.config.ts`:

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

## Dynamic Routes and generateStaticParams

Static export requires all dynamic routes to be resolved at build time. Use `generateStaticParams` to pre-generate all pages:

```tsx
export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    year: post.year,
    month: post.month,
    slug: post.slug,
  }));
}
```

### Important Changes in Next.js 16

In Next.js 16, `params` is now a Promise:

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

## Route Handlers and Static Generation

Route Handlers can generate static files at build time. For example, generating an RSS feed:

```ts
export async function GET() {
  const posts = getAllPostsMeta();

  return new Response(generateRSSXML(posts), {
    headers: { 'Content-Type': 'text/xml' },
  });
}
```

This generates a static `/rss.xml` file at build time.

## SEO Configuration

Use the Metadata API to configure page metadata:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Exploring the beauty of technology',
  openGraph: {
    title: 'My Blog',
    type: 'website',
  },
};
```

## Deployment Notes

- Disable `sharp`: set `images.unoptimized: true`
- All dynamic routes must provide `generateStaticParams`
- Server Actions, ISR, and API routes that require a runtime are not supported
- Use `trailingSlash: true` to keep URL format consistent

## Summary

Next.js 16's static export is really powerful. Combined with the App Router, you can build fully featured, high-performance static sites.
