---
title: "VSCode Remote-SSH 插件：本地编辑远程文件，远程开发神器"
date: "2026-06-30"
description: "使用 VSCode 的 Remote-SSH 插件在 MacBook 上远程编辑 Ubuntu 服务器代码，免去同步烦恼，直接利用服务器资源编译运行。"
category: "工具推荐"
tags: ["VSCode", "SSH", "远程开发", "效率工具"]
cover: "/images/posts/2026/06/vscode-remote-ssh-cover.jpg"
---

# VSCode Remote-SSH 插件：本地编辑远程文件，远程开发神器

在家里一直用 MacBook Air 写代码，通过内网 Git 服务同步到家里的服务器上。最近突然想起之前在 Windows 下使用 WSL 的时候，可以在 Windows 下的 VSCode 操作 WSL 目录下的代码。这样的话，是不是在 MacBook 上也可以远程 Ubuntu？查了下资料，还真可以。下面就介绍一下整体过程。

## 安装与配置

在 VSCode 的插件面板中，搜索 `remote`，选中 **Remote - SSH** 的 Install 按钮进行安装。

![安装 Remote-SSH 插件](/images/posts/2026/06/vscode-01.png)

安装成功后会在左边的菜单栏中出现小电脑图标，点击后进入远程相关设置。

![远程连接设置面板](/images/posts/2026/06/vscode-02.png)

进入设置页，点击 SSH 行右边的 **+** 号，右上角会出现输入框，提示输入远程连接的用户名和 IP 地址：

![输入 SSH 连接信息](/images/posts/2026/06/vscode-03.png)

```
sunqp@192.168.2.17
```

输入服务器的用户名和 IP 地址，然后回车。

下一步会提示选择 SSH 配置文件，选第一个配置文件。回车后会在 SSH 下面出现远程电脑的配置。

![SSH 配置选择](/images/posts/2026/06/vscode-04.png)

## 连接与使用

点击远程电脑，会提示输入密码。输入成功后，选择相关的目录，剩下的操作与本地就没有什么区别了。

![连接到远程服务器](/images/posts/2026/06/vscode-05.png)

也可以新建终端，并在终端中操作，非常方便。

![远程终端操作](/images/posts/2026/06/vscode-08.png)

## 总结

通过 Remote-SSH 远程插件，可以直接用 VSCode 编辑服务器的代码。既能直观编辑代码，又能利用服务器的资源对代码进行快速编译。推荐有这个场景的小伙伴也试试。有什么问题，欢迎在评论区交流。
