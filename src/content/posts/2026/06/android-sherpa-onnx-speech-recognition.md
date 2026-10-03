---
title: "Free Speech Recognition on Android: Built with sherpa-onnx"
date: "2026-06-30"
description: "Implementing offline speech recognition on Android with sherpa-onnx, from generating the project to debugging and running it. Field-tested on a Snapdragon 888, where it runs smoothly with high accuracy."
category: "Tutorials"
tags: ["Android", "speech recognition", "sherpa-onnx", "NDK", "Kotlin"]
cover: "/images/posts/2026/06/sherpa-android-cover.jpg"
---

# Free Speech Recognition on Android: Built with sherpa-onnx

I previously implemented speech recognition on the PC ([sherpa-onnx + Rust API: giving your agent a mouth and ears](https://mp.weixin.qq.com/s?__biz=MzAwNzAzNTEwNw==&mid=2648367259&idx=1&sn=f499313cc32668ff2c6253106e74c7c0&scene=21#wechat_redirect)), and some friends in the comments wanted to know how to do it on Android. Today I'll walk you through implementing speech recognition on Android with sherpa-onnx.

## Generating the Project

sherpa-onnx already supports Android out of the box, and GitHub has documentation for the relevant examples:

```
https://github.com/k2-fsa/sherpa-onnx/tree/master/android
```

On the code side, the lower layer uses the NDK (C++) and the upper layer is implemented in Kotlin. First, download the latest code:

```bash
git clone https://github.com/k2-fsa/sherpa-onnx.git
```

Most phones in use today are `arm64-v8a` architecture, so run this from the root directory:

```bash
./build-android-arm64-v8a.sh
```

The prerequisite is having the Android SDK and NDK configured. I won't go into that here; feel free to message me if you run into issues. Once it finishes, you'll have a sherpa-onnx library ready to use on Android.

## Debugging Process

Open Android Studio, then open the example we'll be using from the `android` subdirectory in the repo root and select `SherpaOnnx`.

### Problem 1: Build Can't Find the Libraries

When I connected my phone to debug, the build couldn't find the libraries it needed. I handed the problem to Opencode, which found that the download link for one of the project's dependencies had gone dead. Opencode tracked down the library through a backup link, and after downloading it, the problem was solved.

### Problem 2: Missing Speech Recognition Model

On the next debug run, it turned out the speech recognition model hadn't been downloaded. Again I handed it to Opencode, which downloaded the model, and the program was up and running.

## Real-World Results

Click Start to begin testing. During testing I found:

- Text appears on screen quickly, with no stuttering
- Accuracy is quite good too

Test device: Qualcomm Snapdragon 888 (a phone from a few years back). It runs smoothly and is genuinely practical.

## Summary

Working through the sherpa-onnx Android example shows that sherpa-onnx is very practical on Android phones. We can build all sorts of features on top of this example. The other Android examples follow much the same process. If you run into problems, feel free to discuss in the comments.

> Project repo: https://github.com/k2-fsa/sherpa-onnx
