---
title: "使用Tauri+Next.js+shadcn构建高性能桌面应用"
date: "2025-03-30"
description: "详细指南：使用Tauri+Next.js+shadcn构建高性能桌面应用，包含项目配置、组件集成与开发流程"
category: "前端"
tags: ["tauri", "next.js", "shadcn", "桌面应用", "前端开发"]
---

## 背景

近年来，随着 Web 技术的快速发展，越来越多的开发者开始探索如何利用这些技术来构建跨平台的桌面应用程序。Tauri 是一个新兴的框架，它允许开发者使用 Web 技术（如 HTML、CSS 和 JavaScript）构建轻量级的桌面应用，同时提供了比 Electron 更高的性能和更低的资源占用。

与此同时，Next.js 作为一个强大的 React 框架，为开发者提供了服务端渲染（SSR）、静态生成（SSG）等功能，使得复杂的 Web 应用开发变得更加简单。而 shadcn 则是一个基于 Radix UI 和 Tailwind CSS 的组件库，专注于易用性和可定制性，能够快速搭建美观的用户界面。

本文将介绍如何将这三个工具结合起来，构建一个高性能且现代化的桌面应用程序。

---

## 为什么选择这个技术栈？

1. **性能优越**：Tauri 使用系统原生的 WebView 渲染界面，相较于 Electron，内存占用更低，启动速度更快。
2. **开发体验良好**：Next.js 提供了直观的 API 和丰富的功能集，使开发者能够专注于业务逻辑而非底层实现细节。
3. **UI 组件丰富**：shadcn 提供了一套高质量的 UI 组件，支持轻松定制以满足不同设计需求。

---

## 项目设置

### 初始化项目

### 初始化 Tauri 项目

首先，使用以下命令初始化一个新的 Tauri 项目：

```bash
npm create tauri-app@latest my-tauri-next-app
cd my-tauri-next-app
```

由于我们的目标是使用 Next.js 开发，因此需要删除 `vite` 和 `react` 相关的文件和配置。具体操作如下：

1. 删除 `src` 目录和 `vite.config.ts` 文件。
2. 使用以下命令创建一个新的 Next.js 项目（在另处一个目录创建copy过来）：

```bash
npx create-next-app@latest .
```

这将生成一个标准的 Next.js 项目结构。

3. 合并 `package.json` 文件：
   - 将原有 Tauri 项目的依赖项与新生成的 Next.js 项目依赖项合并，两个项目的单独项目都保留。dependencies和devDependencies都保留。
   - 确保脚本部分包含以下内容：

```json
"scripts": {
  "dev": "next dev -p 1420",
  "build": "next build",
  "start": "next start -p 1420",
  "lint": "next lint",
  "tauri": "tauri"
}
```

### 更新 Tauri 配置

在 `tauri.conf.json` 文件中，更新以下配置以适配 Next.js：

```json
{
  "build": {
      "beforeDevCommand": "pnpm dev",
      "beforeBuildCommand": "pnpm build",
      "devUrl": "http://localhost:1420",
      "frontendDist": "../dist"
  }
}
```


### 更新 Next.js 配置

在项目的根目录下创建或更新 `next.config.ts` 文件，添加以下配置：

```typescript
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const internalHost = process.env.TAURI_DEV_HOST || 'localhost';

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? undefined : `http://${internalHost}:1420`,
  devIndicators: {
    appIsrStatus: false,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;
```

### 启动开发服务器

运行以下命令启动开发服务器：

```bash
npm run tauri dev
```

此时，您应该能够看到一个基本的 Tauri 应用窗口，加载的是 Next.js 渲染的内容。

---

### 初始化 shadcn/ui

shadcn/ui 是一个基于 Radix UI 和 Tailwind CSS 的组件库，提供了高度可定制的 UI 组件。要初始化 shadcn/ui，请运行以下命令：

```bash
pnpm dlx shadcn@latest init
```

在初始化过程中，您可以选择默认配置，或者根据项目需求进行自定义。

### 安装 shadcn/ui 组件

shadcn/ui 的组件是独立安装的，这意味着您可以按需引入所需的组件。例如，安装一个按钮组件：

```bash
pnpm dlx shadcn@latest add button
```

安装完成后，您可以在 `src/components/ui` 目录下找到该组件的源代码，并根据需要对其进行修改。

### 使用 shadcn 组件

以下是一个使用 shadcn/ui 按钮组件的示例：

```javascript
import { Button } from '@/components/ui/button';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Hello, Tauri + Next.js!</h1>
      <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600 transition">
        Click Me
      </Button>
    </div>
  );
}
```

此外，您还可以安装其他组件（如对话框、表单等），并根据项目需求进行扩展。

---

## 总结

通过结合 Tauri、Next.js 和 shadcn，我们不仅可以构建高性能的桌面应用程序，还能享受现代化的开发体验和美观的用户界面。这种技术栈非常适合那些希望快速迭代但又不想牺牲性能的项目。

如果您对这个主题感兴趣，不妨尝试自己动手实践！如果有任何问题，欢迎在评论区留言讨论。
