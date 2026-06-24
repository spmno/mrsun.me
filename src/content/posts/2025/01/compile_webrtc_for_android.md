---
title: "在Android平台上编译WebRTC源码：详细步骤与注意事项"
date: "2025-01-01"
description: "Android平台编译webrtc源码，记录下过程。"
category: "WebRTC"
tags: ["webrtc", "android", "aec"]
---

## 背景

公司有个项目需要使用webrtc，但是webrtc的源码是c++的，所以需要编译成so文件，然后在android平台上使用。
主要是用webrtc的aec模块，做回声消除的功能。

## 过程

看了声网和其它的文档，试了一下，都是在depot_tools的过程中失败的，主要是声网的版本低，和本地的pyhton版本不匹配。具体可以看下面的链接。
https://zhuanlan.zhihu.com/p/82559314， https://webrtc.org.cn/mirror/   

最后试了下，直接在google的网站下吧，
```
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```   
成功了，然后把depot_tools加入到环境变量中。
```
export WORKSPACE=$(pwd)
export PATH=$WORKSPACE/depot_tools:$PATH
export DEPOT_TOOLS_UPDATE=0  // 关闭自动更新
date; gclient sync; date
```   
出了一个warning， 在网上查了下，说是不用管它。那就继续下webrtc的源码吧。
```
gclient config --name src https://chromium.googlesource.com/external/webrtc.git
date; gclient sync; date
```
这个时间比较长， 不过命令行一直有时间的提示。
如果有问题，就重复上面的命令。  
尝试编译，提示不支持24.04.
```
The only supported distros are
 	Ubuntu 16.04 LTS (xenial with EoL April 2024)
 	Ubuntu 18.04 LTS (bionic with EoL April 2028)
 	Ubuntu 20.04 LTS (focal with EoL April 2030)
 	Ubuntu 22.04 LTS (jammy with EoL April 2032)
```
又发现一个git  
https://gitlab.freedesktop.org/pulseaudio/webrtc-audio-processing   
这个库把webrtc中audio processing的代码都放到了这个库中。   
需要将安装meson， ninja。
```
pip3 install meson ninja
```
配置跨平台编译。在根目录建立cross_android.txt文件。  
```
[binaries]
c = '/home/sunqp/Android/Sdk/ndk/26.1.10909125//toolchains/llvm/prebuilt/linux-x86_64/bin/aarch64-linux-android29-clang'
cpp = '/home/sunqp/Android/Sdk/ndk/26.1.10909125//toolchains/llvm/prebuilt/linux-x86_64/bin/aarch64-linux-android29-clang++'
ar = '/home/sunqp/Android/Sdk/ndk/26.1.10909125/toolchains/llvm/prebuilt/linux-x86_64/bin/llvm-ar'
strip = '/home/sunqp/Android/Sdk/ndk/26.1.10909125//toolchains/llvm/prebuilt/linux-x86_64/bin/llvm-strip'

[properties]
sys_root = '/home/sunqp/Android/Sdk/ndk/26.1.10909125/toolchains/llvm/prebuilt/linux-x86_64/sysroot'

[host_machine]
system = 'android'
cpu_family = 'aarch64'
cpu = 'armv8-a'
endian = 'little'
```
分别执行以下命令。  
```
meson . build -Dprefix=$PWD/install --cross-file=cross_android.txt
ninja -C build
ninja -C build install
```
会在build目录下生成install目录，里面就是编译好的so文件。  
Done。
