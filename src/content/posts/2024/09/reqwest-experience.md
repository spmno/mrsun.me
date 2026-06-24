---
title: "使用Reqwest库的最佳实践与解决方案：提升Rust HTTP请求效率"
date: "2024-09-23"
description: "使用reqwest库的最佳实践与常见问题解决方案，提升Rust HTTP请求处理效率"
category: "Rust"
tags: ["reqwest", "rust", "博客", "https证书"]
---

不用验证SSL本地的证书

```
  use reqwest::{Client, Result};

#[tokio::main]
async fn main() -> Result<()> {
  let clinet = Client::builder().danger_accept_invalid_certs(true)
    .build()
    .unwrap();
  let url = "https://example.com";
  let result = client
    .get(url)
    .send()
    .await?
    .text()
    .await?;
    println!("result is {:?}",result);
    Ok(())
}
```

打出更多的信息用 Debug Trait

Debug output ("{:?}") may show more. Chasing .source() recursively may show more.
