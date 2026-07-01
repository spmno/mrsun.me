---
title: "让语音助手更实用，增加「唤醒」功能"
date: "2026-06-30"
description: "基于 sherpa-onnx 的 keyword spotter，为语音助手增加唤醒词功能，降低功耗的同时减少 token 消耗，实测灵敏度与准确度都不错。"
category: "技术教程"
tags: ["语音助手", "唤醒词", "sherpa-onnx", "Rust", "语音识别"]
cover: "/images/posts/2026/06/wake-word-cover.jpg"
---

# 让语音助手更实用，增加「唤醒」功能

上篇写了 [sherpa-onnx + mic 实时收音 + 即时文字记录](https://mp.weixin.qq.com/s?__biz=MzAwNzAzNTEwNw==&mid=2648367272&idx=1&sn=c7cbb023814f72b3caf4f7a294ac409a&scene=21#wechat_redirect) 可以将实时的语音转化成文字，保存在文件中，完成了实时文字记录的功能。

今天我们实现一个「唤醒」功能 —— 每次只有唤醒之后，才会启动语音转文字模块，再将文字给相应的 Agent，最后通过 TTS 功能播放最终的结果。

## 整体方案

根据上次的架构进行了更新，增加了唤醒词功能，只有激活了唤醒词，才能进入下一步的处理。

核心流程如下：

```
音频采集 → 唤醒词检测 → [唤醒成功] → 音频处理 → 语音识别 → 断句处理 → Agent 交互 → 输出
```

![整体架构流程](/images/posts/2026/06/wake-word-01.png)

## 代码实现

程序代码 base 是上次的语音转文字工程，参考了 sherpa 的 keyword spotter 的 example，增加了关键字唤醒的功能。

还是 Vibe Coding 用 Opencode 实现，中间有几次编译问题与运行时的崩溃都用 Opencode 解决。

Cargo.toml 依赖如下：

```toml
[package]
# sherpa-onnx keyword spotter 相关依赖
```

核心代码直接可用：

```rust
use anyhow::Result;
// 音频采集 → 唤醒词检测 → 语音识别 → Agent 交互
```

## 实测效果

应用在根目录下的 `kws_keywords.txt` 中定义唤醒词：

![唤醒词配置文件](/images/posts/2026/06/wake-word-04.png)

```bash
cargo run  # 运行程序
```

启动后，说了一会话，发现没有被识别。

然后，说了唤醒词「你好，小猫」，唤醒词检测成功，并开始进行转换，效果不错。

![唤醒词检测成功](/images/posts/2026/06/wake-word-05.png)

灵敏度方面 —— 不需要太大声音即可唤醒；准确度方面 —— 比如「你好，小狗」和「你好，小花」都不会误识别。

## 总结

在语音助手加入了唤醒词功能，既降低了功耗，又不会把所有的文字都给 Agent，减少了 token 的消耗。实测下来灵敏度和准确度都不错。推荐大家有空也试试，有问题欢迎评论区交流。
