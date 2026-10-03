---
title: "Building a Minimalist Dark Tech-Style Blog Design System"
date: "2026-06-22"
description: "From color schemes to component design, sharing how I built a dark tech-style blog interface that's both beautiful and practical."
category: "Design"
tags: ["CSS", "Tailwind", "UI"]
---

# A Dark Tech-Style Design System

Good design isn't just about looks; it's about user experience. This post shares some of the thinking and practices behind this blog's design.

## Color Scheme

Using the OKLCH color space for more natural color transitions:

### Dark Mode

```css
.dark {
  --background: oklch(0.14 0.015 260);
  --foreground: oklch(0.92 0.01 250);
  --primary: oklch(0.65 0.22 264);
  --accent: oklch(0.28 0.04 200);
}
```

### Light Mode

```css
:root {
  --background: oklch(0.98 0.005 250);
  --foreground: oklch(0.18 0.02 260);
  --primary: oklch(0.48 0.18 264);
  --accent: oklch(0.93 0.02 230);
}
```

## Design Principles

- [x] **Minimalism**: strip away unnecessary decoration and let the content take center stage
- [x] **Clear hierarchy**: build a distinct visual hierarchy through color, font size, and spacing
- [x] **Strong consistency**: every component follows the same border-radius, spacing, and motion specs
- [x] **Responsive-first**: design for mobile first, then progressively enhance

## Glassmorphism

Using semi-transparent backgrounds and blur filters for a modern feel:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Gradient Text

Headings use gradient effects for extra visual impact:

```css
.gradient-text {
  background: linear-gradient(to right, var(--primary), #22d3ee, var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Hover Effects

Subtle animations when hovering over cards improve the interactive feel:

| Property | Value | Effect |
|------|-----|------|
| translateY | -2px | slight lift |
| box-shadow | glow | glowing border |
| border-color | primary/30 | border highlight |
| transition | 300ms | smooth transition |

## Font Choices

- **Body font**: Geist Sans - a modern, crisp sans-serif
- **Code font**: Geist Mono - an excellent monospace font for programming

## Summary

The core of a design system is **consistency** and **maintainability**. Managing design tokens centrally through CSS Variables
makes theme switching simple and keeps future design iterations under control.
