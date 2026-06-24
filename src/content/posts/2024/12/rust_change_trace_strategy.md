---
title: "Rust日志优化：实现每日滚动记录与文件大小限制"
date: "2024-12-20"
description: "rust修改默认的trace策略，限制文件输出的大小，并且规定每天输出"
category: "Rust"
tags: ["rust", "trace", "log", "file", "日志"]
---

## 背景
在rust中，默认的trace策略是将日志输出到标准输出并且没有大小的限制。  
但是在实际的生产环境中，我们需要将日志输出到文件中，并且限制文件的大小，每天输出一个新的文件。

## 实现
查询了trace的文档，发现只能对输出的周期进行控制，不能对输出的大小进行控制。  
[tracing_appender rolling](https://docs.rs/tracing-appender/latest/tracing_appender/rolling/struct.Rotation.html "tracing_appender rolling")
</br>
``` rust
use tracing_appender::rolling::Rotation;
let rotation = tracing_appender::rolling::Rotation::DAILY;
```
</br>
查找官方文档发现之前有人做过相关的功能，但是crate并没有相关的接口。  
最后找到另外一个crate，解决问题。
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
问题解决。
