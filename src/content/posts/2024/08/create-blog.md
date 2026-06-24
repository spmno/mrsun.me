---
title: "Astro搭建个人博客"
date: "2024-08-20"
description: "使用Astro框架快速搭建个人博客，包含详细步骤指南和Vercel部署说明"
category: "博客"
tags: ["astro", "blogging", "博客"]
---

# Hi there!

之前用HOPE搭建的BLOG用了几次就没怎么用了。这次又看到了Astro这个工具，几分钟就能建立个BLOG。而且还挺好用，记录下吧。

### 两种方式创建：
1. 官方的命令，之后选择blog项目。

```
# npm
npm create astro@latest

# yarn
yarn create astro

# pnpm
pnpm create astro@latest

```

2. 直接clone相关主题的git库。
```
git clone --depth=1 https://github.com/ixartz/Astro-boilerplate
```
### 运行：
```
npm run dev
```
### BLOG目录：
```
src/pages/posts/***.md
```

# 使用vercel布置

### 注册账号
[vercel.com](https://vercel.com) 按照步骤来就可以
### 导入Github上的Blog工程
![alt text](/images/import_github.png)
### 布置
点击布置Button
### 配置域名
project -> setting -> domains<br />
vercel为你提供了免费的域名，修改即可。<br />
如果想用自己的域名，需要去右上角Accout Settings去添加自己的域名，添加之后回project去选择就可以了。
