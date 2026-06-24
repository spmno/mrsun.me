---
title: "解决DrawIO在Ubuntu系统中的运行问题：详细故障排除指南"
date: "2025-01-20"
description: "解决在Ubuntu上安装DrawIO deb包后无法启动的问题"
category: "Linux"
tags: ["drawio", "ubuntu", "sandbox"]
---

## 问题描述

在Ubuntu系统上从GitHub下载DrawIO的deb包并安装后，启动时遇到问题无法正常运行。这是由于DrawIO的沙盒权限配置不正确导致的。

## 解决方案

1. 打开终端，进入DrawIO的安装目录：
   ```bash
   cd /opt/drawio
   ```

2. 执行以下两个命令修复权限问题：
   ```bash
   sudo chown root:root chrome-sandbox
   sudo chmod 4755 chrome-sandbox
   ```

## 命令解释

- `chown root:root chrome-sandbox`：将chrome-sandbox文件的所有者改为root用户
- `chmod 4755 chrome-sandbox`：设置文件权限为4755，其中4表示设置SUID位，755表示所有者可读可写可执行，其他用户可读可执行

## 可能原因

这个问题通常发生在使用AppImage或deb包安装的Electron应用中，因为Linux系统的沙盒机制需要特定的文件权限设置。通过上述命令可以正确配置沙盒权限，使DrawIO能够正常运行。

## 验证

执行完上述命令后，重新启动DrawIO应用程序，应该可以正常使用了。
