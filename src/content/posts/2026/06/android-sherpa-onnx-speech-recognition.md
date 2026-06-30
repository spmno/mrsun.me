---
title: "免费Android端的语音识别功能 — 基于 sherpa-onnx 实现"
date: "2026-06-30"
description: "在 Android 端使用 sherpa-onnx 实现离线语音识别，从工程生成到调试运行，实测在骁龙888上表现流畅、准确率高。"
category: "技术教程"
tags: ["Android", "语音识别", "sherpa-onnx", "NDK", "Kotlin"]
---

# 免费Android端的语音识别功能 — 基于 sherpa-onnx 实现

之前在 PC 端实现了语音识别的功能（[sherpa-onnx + Rust API，给你的 agent 加上嘴和耳朵](https://mp.weixin.qq.com/s?__biz=MzAwNzAzNTEwNw==&mid=2648367259&idx=1&sn=f499313cc32668ff2c6253106e74c7c0&scene=21#wechat_redirect)），有朋友在评论区想了解 Android 端的语音识别功能。今天带大家来实现在 Android 下使用 sherpa-onnx 实现语音识别。

## 生成工程

sherpa-onnx 本来就支持 Android 端的实现，GitHub 上有相关例子的说明：

```
https://github.com/k2-fsa/sherpa-onnx/tree/master/android
```

代码方面，底层用 NDK（C++），上层用 Kotlin 实现。首先下载最新代码：

```bash
git clone https://github.com/k2-fsa/sherpa-onnx.git
```

目前使用的手机基本都是 `arm64-v8a` 架构，所以在根目录执行：

```bash
./build-android-arm64-v8a.sh
```

执行前提是配置好 Android 的 SDK 与 NDK，这里就不展开了，有问题的可以私信。执行后会生成在 Android 下可使用的 sherpa-onnx 库。

## 调试过程

打开 Android Studio，打开根目录下 `android` 子目录中我们要使用的例子，选择 `SherpaOnnx`。

### 问题一：编译找不到对应库

连接手机调试时，发现编译工程找不到对应的库。把问题交给 Opencode，发现是工程依赖的一个库的下载链接失效了。Opencode 在一个备用链接中找到了相关库，下载后问题解决。

### 问题二：缺少语音识别模型

再次调试，发现没有下载相应的语音识别模型。问题交给 Opencode，Opencode 下载了相应的模型，程序可以运行起来了。

## 实测效果

点击 Start 开始测试。测试过程中发现：

- 文字上屏速度很快，没有卡顿
- 准确性也不错

测试机器：高通骁龙 888（几年前的老机型），表现流畅，实用性很强。

## 总结

通过 sherpa-onnx 在 Android 下的 example，可以发现 sherpa-onnx 在安卓手机上有很好的实用性。我们可以根据这个 example 衍生出很多功能。Android 的其它例子实现过程都差不多，有问题的小伙伴欢迎在评论区一起讨论。

> 项目地址：https://github.com/k2-fsa/sherpa-onnx
