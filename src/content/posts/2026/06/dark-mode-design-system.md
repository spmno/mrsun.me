---
title: "打造极简深色科技风博客设计系统"
date: "2026-06-22"
description: "从配色方案到组件设计，分享如何打造一个兼具美观与实用的深色科技风博客界面。"
category: "设计"
tags: ["CSS", "Tailwind", "UI"]
---

# 深色科技风设计系统

好的设计不仅关乎美观，更关乎用户体验。本文分享我在设计这个博客时的一些思考和实践。

## 配色方案

使用 OKLCH 色彩空间实现更自然的色彩过渡：

### 深色模式

```css
.dark {
  --background: oklch(0.14 0.015 260);
  --foreground: oklch(0.92 0.01 250);
  --primary: oklch(0.65 0.22 264);
  --accent: oklch(0.28 0.04 200);
}
```

### 浅色模式

```css
:root {
  --background: oklch(0.98 0.005 250);
  --foreground: oklch(0.18 0.02 260);
  --primary: oklch(0.48 0.18 264);
  --accent: oklch(0.93 0.02 230);
}
```

## 设计原则

- [x] **极简主义**：去除不必要的装饰，让内容成为焦点
- [x] **层次分明**：通过颜色、字号、间距建立清晰的视觉层次
- [x] **一致性强**：所有组件遵循统一的圆角、间距和动效规范
- [x] **响应式优先**：从移动端开始设计，逐步增强

## 玻璃态效果

使用半透明背景和模糊滤镜打造现代感：

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## 渐变文字

标题使用渐变效果增强视觉冲击力：

```css
.gradient-text {
  background: linear-gradient(to right, var(--primary), #22d3ee, var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Hover 动效

卡片悬浮时的微妙动效，提升交互体验：

| 属性 | 值 | 效果 |
|------|-----|------|
| translateY | -2px | 轻微上浮 |
| box-shadow | glow | 发光边框 |
| border-color | primary/30 | 边框高亮 |
| transition | 300ms | 平滑过渡 |

## 字体选择

- **正文字体**：Geist Sans - 现代清晰的无衬线字体
- **代码字体**：Geist Mono - 优秀的编程等宽字体

## 总结

设计系统的核心在于**一致性**和**可维护性**。通过 CSS Variables 统一管理设计 token，
让主题切换变得简单，也让未来的设计迭代更加可控。
