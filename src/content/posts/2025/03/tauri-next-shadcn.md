---
title: "Building High-Performance Desktop Apps with Tauri + Next.js + shadcn"
date: "2025-03-30"
description: "A detailed guide to building high-performance desktop apps with Tauri + Next.js + shadcn, covering project configuration, component integration, and the development workflow"
category: "Frontend"
tags: ["tauri", "next.js", "shadcn", "desktop apps", "frontend development"]
---

## Background

In recent years, as web technology has advanced rapidly, more and more developers have been exploring how to use it to build cross-platform desktop applications. Tauri is an emerging framework that lets developers build lightweight desktop apps with web technologies (HTML, CSS, and JavaScript), while delivering better performance and lower resource usage than Electron.

Meanwhile, Next.js, a powerful React framework, gives developers server-side rendering (SSR), static site generation (SSG), and other features that make building complex web applications much simpler. shadcn is a component library built on Radix UI and Tailwind CSS, focused on ease of use and customizability, that lets you quickly put together a beautiful user interface.

This post covers how to combine these three tools to build a high-performance, modern desktop application.

---

## Why This Tech Stack?

1. **Great performance**: Tauri renders the UI with the system's native WebView. Compared to Electron, it uses less memory and starts faster.
2. **Good developer experience**: Next.js offers an intuitive API and a rich feature set, so developers can focus on business logic instead of low-level implementation details.
3. **Rich UI components**: shadcn provides a set of high-quality UI components that are easy to customize for different design needs.

---

## Project Setup

### Initialize the Project

### Initialize a Tauri Project

First, initialize a new Tauri project with the following commands:

```bash
npm create tauri-app@latest my-tauri-next-app
cd my-tauri-next-app
```

Since our goal is to develop with Next.js, we need to remove the `vite` and `react` related files and configuration. Here's how:

1. Delete the `src` directory and the `vite.config.ts` file.
2. Create a new Next.js project with the following command (create it in a separate directory, then copy it over):

```bash
npx create-next-app@latest .
```

This generates a standard Next.js project structure.

3. Merge the `package.json` files:
   - Merge the original Tauri project's dependencies with those of the newly generated Next.js project, keeping the separate entries from both projects. Keep both dependencies and devDependencies.
   - Make sure the scripts section includes the following:

```json
"scripts": {
  "dev": "next dev -p 1420",
  "build": "next build",
  "start": "next start -p 1420",
  "lint": "next lint",
  "tauri": "tauri"
}
```

### Update the Tauri Configuration

In the `tauri.conf.json` file, update the following configuration to work with Next.js:

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


### Update the Next.js Configuration

Create or update the `next.config.ts` file in the project root and add the following configuration:

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

### Start the Dev Server

Run the following command to start the dev server:

```bash
npm run tauri dev
```

At this point, you should see a basic Tauri app window loading content rendered by Next.js.

---

### Initialize shadcn/ui

shadcn/ui is a component library built on Radix UI and Tailwind CSS that provides highly customizable UI components. To initialize shadcn/ui, run the following command:

```bash
pnpm dlx shadcn@latest init
```

During initialization, you can go with the default configuration or customize it to fit your project.

### Install shadcn/ui Components

shadcn/ui components are installed individually, which means you only pull in the ones you need. For example, to install the button component:

```bash
pnpm dlx shadcn@latest add button
```

Once installed, you'll find the component's source code under `src/components/ui`, and you can modify it as needed.

### Using shadcn Components

Here's an example that uses the shadcn/ui button component:

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

You can also install other components (dialogs, forms, and so on) and extend them to fit your project's needs.

---

## Summary

By combining Tauri, Next.js, and shadcn, we can build high-performance desktop applications while enjoying a modern development experience and a beautiful user interface. This stack is a great fit for projects that want to iterate quickly without giving up performance.

If this topic interests you, go ahead and try it yourself! If you run into any questions, feel free to drop a comment below.
