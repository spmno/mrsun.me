---
title: "Compiling WebRTC Source Code for Android: Detailed Steps and Notes"
date: "2025-01-01"
description: "Compiling the WebRTC source code for Android, with a record of the process."
category: "WebRTC"
tags: ["webrtc", "android", "aec"]
---

## Background

A project at work needed to use WebRTC, but the WebRTC source is C++, so it has to be compiled into .so files before it can be used on Android.
We mainly wanted WebRTC's AEC module for echo cancellation.

## The Process

I read the Agora docs and various others and gave them a try, but they all failed at the depot_tools step, mostly because Agora's version was old and didn't match my local Python version. See the links below for details.
https://zhuanlan.zhihu.com/p/82559314, https://webrtc.org.cn/mirror/   

In the end I just tried downloading straight from Google's site,
```
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```   
That worked, so I added depot_tools to my PATH.
```
export WORKSPACE=$(pwd)
export PATH=$WORKSPACE/depot_tools:$PATH
export DEPOT_TOOLS_UPDATE=0  // disable auto-update
date; gclient sync; date
```   
There was one warning; I looked it up online and people said it's fine to ignore. So on to fetching the WebRTC source.
```
gclient config --name src https://chromium.googlesource.com/external/webrtc.git
date; gclient sync; date
```
This takes quite a while, though the command line keeps printing timestamps so you can track progress.
If anything goes wrong, just rerun the commands above.  
I tried to build, and it said 24.04 isn't supported.
```
The only supported distros are
 	Ubuntu 16.04 LTS (xenial with EoL April 2024)
 	Ubuntu 18.04 LTS (bionic with EoL April 2028)
 	Ubuntu 20.04 LTS (focal with EoL April 2030)
 	Ubuntu 22.04 LTS (jammy with EoL April 2032)
```
Then I came across another git repo  
https://gitlab.freedesktop.org/pulseaudio/webrtc-audio-processing   
This library collects all of WebRTC's audio processing code in one place.   
You'll need to install meson and ninja.
```
pip3 install meson ninja
```
Configure the cross-compilation setup. Create a cross_android.txt file in the root directory.  
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
Run the following commands in order.  
```
meson . build -Dprefix=$PWD/install --cross-file=cross_android.txt
ninja -C build
ninja -C build install
```
This generates an install directory under build, containing the compiled .so files.  
Done.
