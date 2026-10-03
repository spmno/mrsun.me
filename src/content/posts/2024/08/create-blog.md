---
title: "Building a Personal Blog with Astro"
date: "2024-08-20"
description: "Quickly set up a personal blog with the Astro framework, with a detailed step-by-step guide and Vercel deployment instructions"
category: "Blogging"
tags: ["astro", "blogging"]
---

# Hi there!

I built a blog with HOPE a while back, but after a few uses I more or less stopped touching it. This time I came across Astro, a tool that gets a blog up and running in minutes. It's actually quite nice to use, so I figured I'd write it down.

### Two ways to create one:
1. The official command, then pick the blog project.

```
# npm
npm create astro@latest

# yarn
yarn create astro

# pnpm
pnpm create astro@latest

```

2. Directly clone the git repo of a theme.
```
git clone --depth=1 https://github.com/ixartz/Astro-boilerplate
```
### Run:
```
npm run dev
```
### Blog directory:
```
src/pages/posts/***.md
```

# Deploying with Vercel

### Sign up for an account
[vercel.com](https://vercel.com), just follow the steps
### Import the blog project from GitHub
![alt text](/images/import_github.png)
### Deploy
Click the Deploy button
### Configure the domain
project -> setting -> domains<br />
Vercel gives you a free domain, just change it.<br />
If you want to use your own domain, go to Account Settings in the top-right corner to add it, then come back to the project and select it.
