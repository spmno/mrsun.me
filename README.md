# 程序员老孙

基于 Next.js 16 + Tailwind CSS 4 + shadcn/ui 的极简深色科技风个人博客，静态导出部署到 EdgeOne Pages。

## 技术栈

- **框架**: Next.js 16 (App Router, 静态导出)
- **UI**: shadcn/ui (Base UI) + Tailwind CSS 4
- **语言**: TypeScript
- **内容**: Markdown + gray-matter + react-markdown
- **代码高亮**: rehype-highlight
- **评论**: Giscus (GitHub Discussions)
- **部署**: EdgeOne Pages (静态导出)

## 快速开始

```bash
npm install
npm run dev      # 开发模式 http://localhost:3000
npm run build    # 构建静态站点到 dist/
npm run lint     # 代码检查
```

## 新增文章

1. 在 `src/content/posts/<年>/<月>/` 下创建 `.md` 文件
2. 文件名即为 URL slug，例如 `my-post.md` → `/posts/2026/06/my-post/`
3. frontmatter 格式：

```yaml
---
title: "文章标题"
date: "2026-06-24"
description: "文章摘要"
category: "分类名"
tags: ["标签1", "标签2"]
cover: "/images/cover.png"  # 可选
---

正文内容（标准 Markdown）...
```

4. 图片放在 `public/images/` 目录，文章中用 `/images/xxx.png` 引用

## 配置修改

### 站点信息

编辑 `src/lib/site.ts`：

```ts
export const siteConfig = {
  title: 'mrsun.me',
  description: '探索技术之美，记录编程之旅',
  url: 'https://mrsun.me',
  author: 'MrSun',
  // ...
};
```

### 主题色

编辑 `src/app/globals.css` 中的 CSS Variables：

- `:root` — 浅色模式配色
- `.dark` — 深色模式配色
- `--primary` — 主色调（当前 indigo）
- `--accent` — 强调色（当前 cyan）

### 评论系统 (Giscus)

1. 在 GitHub 仓库 Settings → Features → Discussions 中启用 Discussions
2. 访问 [giscus.app](https://giscus.app) 获取配置
3. 将 `repo`、`repoId`、`category`、`categoryId` 填入 `src/lib/site.ts` 的 `giscus` 对象

### 导航栏

编辑 `src/lib/site.ts` 中的 `nav` 数组：

```ts
nav: [
  { title: '首页', href: '/' },
  { title: '归档', href: '/archive' },
  { title: '搜索', href: '/search' },
  { title: '关于', href: '/about' },
],
```

## 功能列表

- [x] 首页文章列表 + 客户端分页（每页 10 篇）
- [x] 文章详情页（Markdown 渲染、SEO、OG 标签）
- [x] 分类页面 `/categories/<category>/`
- [x] 标签页面 `/tags/<tag>/`
- [x] 时间归档 `/archive/`
- [x] 客户端关键词搜索 `/search/`
- [x] RSS 订阅 `/rss.xml`
- [x] 站点地图 `/sitemap.xml`
- [x] robots.txt
- [x] 代码语法高亮 + 复制按钮
- [x] 深色/浅色/自动主题切换
- [x] 响应式设计（移动端汉堡菜单）
- [x] Giscus 评论
- [x] 自定义 404 页面

## 部署到 EdgeOne Pages

1. 将代码推送到 GitHub 仓库
2. 在 EdgeOne Pages 控制台导入该仓库
3. 构建命令：`npm run build`
4. 输出目录：`dist`
5. 配置自定义域名 `mrsun.me`

## 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页
│   ├── layout.tsx           # 根布局
│   ├── about/               # 关于页
│   ├── archive/             # 归档页
│   ├── categories/[category]/  # 分类页
│   ├── tags/[tag]/          # 标签页
│   ├── posts/[year]/[month]/[slug]/  # 文章详情
│   ├── search/              # 搜索页
│   ├── rss.xml/route.ts     # RSS
│   ├── sitemap.ts           # 站点地图
│   ├── robots.ts            # robots.txt
│   ├── not-found.tsx        # 404
│   └── globals.css         # 全局样式
├── components/
│   ├── ui/                  # shadcn/ui 组件
│   ├── post-card.tsx
│   ├── post-list.tsx
│   ├── paginated-post-list.tsx
│   ├── pagination.tsx
│   ├── search-box.tsx
│   ├── theme-toggle.tsx
│   ├── theme-provider.tsx
│   ├── navbar.tsx
│   ├── mobile-nav.tsx
│   ├── footer.tsx
│   ├── markdown-renderer.tsx
│   ├── code-block.tsx
│   └── giscus-comments.tsx
├── lib/
│   ├── posts.ts             # 文章读取/解析
│   ├── site.ts              # 站点配置
│   ├── seo.ts               # SEO 元数据
│   └── utils.ts             # 工具函数
└── content/posts/           # Markdown 文章
    └── 2026/06/
```
