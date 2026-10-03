---
title: "The Meaning of r# in Rust"
date: "2024-08-20"
description: "Exploring the r# syntax in Rust: a detailed look at what it's for and where it applies in practice"
category: "Rust"
tags: ["string", "rust"]
cover: "/images/rust-language.png"
---

The meaning of r# in Rust

# Two cases where you'd use r#
1. To use a Rust keyword as an identifier such as a variable name, function name, or module name, you can prefix the keyword with r#, and the compiler will then parse it as an identifier rather than a keyword.
```
pub struct Tool {
    /// The schema of the tool. Currently, only functions are supported.
    r#type: ToolType,
    /// The schema of the tool. Currently, only functions are supported.
    function: FunctionInfo,
}
```
2. When a string literal contains special characters, you can also add r# before the string and # at the end.
```
fn main(){

    let website = r#"
        "xiachedan.cn"
    "#;

    println!("{}",website);
}
```
