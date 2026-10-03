---
title: "Rust Logging Optimization: Implementing Daily Rotation and File Size Limits"
date: "2024-12-20"
description: "Modifying Rust's default tracing strategy to limit output file size and rotate to a new file every day"
category: "Rust"
tags: ["rust", "trace", "log", "file", "logging"]
---

## Background
In Rust, the default tracing strategy writes logs to standard output with no size limit.  
But in a real production environment, we need logs written to a file, with the size capped and a new file rolled out every day.

## Implementation
I checked the tracing docs and found it can only control the rotation period, not the output size.  
[tracing_appender rolling](https://docs.rs/tracing-appender/latest/tracing_appender/rolling/struct.Rotation.html "tracing_appender rolling")
</br>
``` rust
use tracing_appender::rolling::Rotation;
let rotation = tracing_appender::rolling::Rotation::DAILY;
```
</br>
Digging through the official docs, it turns out someone had built this before, but the crate doesn't expose an interface for it.  
In the end I found another crate that solved the problem.
</br>  

[Crate rolling_file](https://docs.rs/rolling-file/latest/rolling_file/#)  
``` rust
let file_appender = BasicRollingFileAppender::new(
    "/var/log/myprogram",
    RollingConditionBasic::new().daily(),
    9
).unwrap();
let (non_blocking_appender, _guard) = non_blocking(file_appender);
```  
</br>
Problem solved.
