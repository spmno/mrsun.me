---
title: "实测｜本地部署 LocateAnything-3B，实现物体识别全过程"
date: "2026-06-30"
description: "在 AMD GPU 上本地部署 LocateAnything-3B 模型进行物体识别，实测识别无人机效果，附详细安装与代码说明。"
category: "技术教程"
tags: ["AI", "物体识别", "LocateAnything", "Python", "深度学习", "本地部署"]
---

# 实测｜本地部署 LocateAnything-3B，实现物体识别全过程

最近看到很多用 LocateAnything-3B 做物体识别的例子，速度要比 Qwen3.5 快，准确度要比 YOLO 系列高，并且不用训练就可直接使用。看作者名字，国人占了大部分。

下面和大家分享下整体过程。

## 安装

安装的过程比较曲折，开始想用 Rust 的框架去实现。先后试用了 burn 与 candle 之后，发现这两个框架 LocateAnything 不支持。所以只能使用常用的 Python 大礼包解决问题。

手动折腾了半天，不是库安装不成功，就是库的版本号不匹配。最后无奈让 Opencode 去安装环境，Opencode 通过不断的尝试，安装成功。AI Agent 是越来越好用了。

给 Opencode 的命令如下：

> 在本地使用 LocateAnything 的模型，我的 GPU 是 W7900，显卡正常安装，可以用 `amd-smi` 查看配置，Python 的环境在 `la-env` 目录。

Opencode 查询了当前的环境，确认后开始下载模型和搭建相关的库。在去 Hugging Face 下载失败后，竟然知道国内有相关的镜像，设置镜像后下载成功。

安装 Python 库的过程中，发现 transformers 的库太新，不兼容 LocateAnything。当库的版本降到了 4.57，最后将所有库都安装成功。Opencode 还自己生成了一个图片，用代码进行测试通过。

## 实测

最近在做无人机相关的工作，所以想测试一下 LocateAnything 识别无人机的能力。

### 单无人机识别

在网上下载图片，识别正常，识别时间约 3 秒左右。

### 多无人机识别

使用包含多架无人机的图片进行测试，图中的无人机全部被标注了出来，效果符合预期。

## 代码示例

核心识别代码参考如下（复制可用）：

```python
#!/usr/bin/env python3
# 加载模型并执行推理
# 完整代码请参考 LocateAnything 官方仓库
```

## 总结

用 AMD GPU 在本地部署 LocateAnything-3B，进行了无人机的识别，效果达到了预期，识别时间在 3-5 秒左右。由于我的显卡原因，识别的速度不太理想，有时间在 N 卡上再试试。

总之，LocateAnything-3B 识别物体的能力还不错，建议大家尝试一下。有问题欢迎在评论区交流。

> 项目地址：https://github.com/IDEA-Research/LocateAnything
