---
title: "Using the WebRTC Library on Android"
date: "2025-01-03"
description: "An in-depth guide to integrating and using the WebRTC library on Android, with API details and practical examples"
category: "WebRTC"
tags: ["webrtc", "android", "aec"]
---

## Background

In the previous post we compiled the WebRTC library, so now we have the build in hand. This post covers how to actually use it.

## The Process

With the commands below from last time, we've already got the compiled WebRTC library. 
```
meson . build -Dprefix=$PWD/install --cross-file=cross_android.txt
ninja -C build
ninja -C build install
```
This creates an install directory under build, and inside it is the compiled .so file, named libwebrtc-audio-processing-2.so.   
First, create an Android project. In the main directory, right-click and choose New -> Folder -> JNI Folder.  
Then copy the libwebrtc-audio-processing-2.so file into the jniLibs directory.  
 <font color='red'>Note: Be sure to strip the -2 suffix from the .so file name before copying it, otherwise you'll get errors. It took me a long time of digging to track this one down.</font>
![alt text](/images/use_webrtc1.png)  
Then we find that using the library requires header files, which we don't have. We need to copy the WebRTC library's folder directly into our project.
Edit the CMakeLists.txt file and add the code below. This brings in the header files and the library.
```
set(my_lib_path ${CMAKE_SOURCE_DIR}/../jniLibs)
add_library(webrtc-audio-processing SHARED IMPORTED)
set_target_properties(webrtc-audio-processing PROPERTIES IMPORTED_LOCATION
        ${my_lib_path}/${ANDROID_ABI}/libwebrtc-audio-processing.so)
include_directories(
        ./
        ./webrtc/
)
```
Build it, and sure enough it fails, complaining that it can't find files related to the absl library.
Go to the WebRTC library folder, find the absl library folder, and copy it into our project, under the subprojects folder in the root directory.   
Build again, and if all goes well it should pass.
  
Extra note: at runtime it turned out that libwebrtc-audio-processing-2.so couldn't be found, because we had renamed the library. Just make another copy of the library and name it libwebrtc-audio-processing-2.so, and it works.
Also, libc++_shared.so may be missing too. Add the following code to the build.gradle file.  
```
        externalNativeBuild {
            cmake {
                cppFlags ''
                arguments "-DANDROID_STL=c++_shared"
            }
        }
```

Finally, here's the link: https://github.com/spmno/WebrtcTest
