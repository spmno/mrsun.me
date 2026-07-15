---
title: "开源版本Claude Code -- Claw Code 功能介绍及使用"
date: "2026-07-15"
description: "Claw Code 是一个可扩展、多模型、可自主运行的 AI 编程助手，执行速度快，适配多个模型。是日常好用的助手，推荐朋友们尝试一下。"
category: "AI"
tags: ["AI", "Claude Code", "Claw Code", "Rust", "CLI"]
cover: "/images/posts/2026/07/cover.jpg"
---

Claude Code 是 Anthropic 官方推出的终端 AI 编程 Agent，原本是闭源商业产品。但在一次 NPM 发布时，开发团队不小心把 TypeScript 源码的 source map 一起打了进去 —— 相当于把完整源码直接送到了用户手里。

Claw Code 是一个用 Rust 写的 AI 编程助手 CLI，参考了 Claude Code 源码，支持多模型、可扩展、可自主运行。

---

## 环境安装

先安装 Rust 的环境，然后下载代码编译工程。

```bash
# 安装 rustup（官方推荐方式）
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 重载环境
source ~/.cargo/env

# 验证安装
cargo --version

# 克隆仓库
git clone https://github.com/ultraworkers/claw-code.git
cd claw-code/rust

# 编译整个工作区（debug 版，编译快）
cargo build --workspace
```

## 环境配置

本次实践是用在线的 DeepSeek V4 的模型，API Key 需要自行去官网申请，具体配置如下：

```bash
export OPENAI_API_KEY="sk-你的DeepSeek密钥"
export OPENAI_BASE_URL="https://api.deepseek.com"
```

验证是否生效：

```bash
./target/debug/claw doctor
```

可以编译 Release 版本：

```bash
cargo build --workspace --release
```

进入工具：

```bash
./target/release/claw --model local/deepseek-v4-pro
```

## 核心功能

### 1. 多模型支持

| 模型 | 提供商 |
|---|---|
| Claude Opus/Sonnet/Haiku | Anthropic |
| GPT-4.1/5.4 | OpenAI |
| DeepSeek V4 Pro/Flash | DeepSeek (OpenAI 兼容) |
| Qwen 系列 | 阿里 DashScope |
| Grok | xAI |
| Kimi | DashScope |
| Ollama 本地模型 | 本地运行 |

```bash
claw --model local/deepseek-v4-pro prompt "写排序代码"
claw --model openai/gpt-4.1-mini prompt "解释这段代码"
claw --model local/llama3.2 prompt "summarize this"  # 本地 Ollama
```

### 2. 交互式 REPL

```bash
claw  # 启动交互模式
/doctor    # 健康检查
/help      # 帮助
/status    # 状态
/model     # 切换模型
/cost      # 费用统计
```

![REPL 界面](/images/posts/2026/07/1.png)

### 3. 内置工具

| 工具 | 功能 |
|---|---|
| `Bash` | 执行 shell 命令 |
| `ReadFile` | 读取文件 |
| `WriteFile` | 写入文件 |
| `EditFile` | 编辑文件 |
| `GlobSearch` | 文件名搜索 |
| `GrepSearch` | 内容搜索 |
| `WebSearch` | 网络搜索 |
| `WebFetch` | 获取网页 |
| `TodoWrite` | 任务管理 |
| `NotebookEdit` | Jupyter 编辑 |
| `LSP` | 语言服务器 |

### 4. 会话管理

```bash
claw --resume latest          # 恢复上次会话
claw --resume latest /diff    # 恢复并查看差异
claw prompt "继续上次的工作"    # 一次性提示
```

### 5. 技能系统

```bash
/claw skills list              # 查看已安装技能
/claw skills install <path>    # 安装技能
/claw skills uninstall <name>  # 卸载技能
```

### 6. 代理（Agent）系统

```bash
claw agents list               # 列出代理
claw agents create my-agent    # 创建自定义代理
```

### 7. MCP 服务器

```bash
claw mcp                       # 查看 MCP 配置
```

### 8. 权限控制

```bash
claw --permission-mode read-only prompt "..."       # 只读
claw --permission-mode workspace-write prompt "..."  # 可写（默认）
claw --dangerously-skip-permissions prompt "..."     # 完全访问
```

---

## 独特能力

### 自主运行（Clawable）

这个项目的核心理念是 **人定方向，AI 执行**：

- 人在 Discord 发一句话
- AI 自动分解任务、写代码、跑测试、修复错误、提交推送
- 不需要人盯着终端

![自主运行示意图](/images/posts/2026/07/2.png)

### 并行多 Agent 协调

- Architect（架构师）→ Executor（执行者）→ Reviewer（审查者）
- 自动重试、分歧解决、验证循环

### 事件驱动

- 监听 git commits、tmux sessions、GitHub issues/PRs
- 通知路由在 agent 上下文之外，不占 token

---

## 适用场景

| 场景 | 用法 |
|---|---|
| 日常编码 | `claw prompt "实现登录功能"` |
| 代码审查 | `claw prompt "审查这个 PR"` |
| 重构 | `/ultraplan 重构 auth 模块` |
| 调试 | `/bughunter src/handlers` |
| 文档生成 | `claw prompt "为这个函数写文档"` |
| 自动化工作流 | 通过 Discord/hooks 自主运行 |

---

## 与 Claude Code 的区别

| 特性 | Claw Code | Claude Code |
|---|---|---|
| 多模型 | ✅ DeepSeek/Qwen/Grok/Ollama 等 | ❌ 仅 Claude |
| 自主运行 | ✅ 设计为核心能力 | ⚠️ 有限 |
| 事件驱动 | ✅ Discord/GitHub 集成 | ❌ |
| 技能系统 | ✅ 可扩展 | ⚠️ 有限 |
| 开源 | ✅ MIT | ❌ |

---

## 实操写代码、读代码

### 1. 写一段 Python 排序的代码

```bash
./target/debug/claw --model local/deepseek-v4-pro prompt "写一个Python快速排序"
```

会在本地生成文件，并且测试，将输出打印出来。

![写代码效果](/images/posts/2026/07/3.png)

### 2. 读一下这个工程代码

大约 30 秒左右完成工作，部分输出如下：

![读代码效果](/images/posts/2026/07/4.png)

完成以上的任务，费用如下：

![费用统计](/images/posts/2026/07/5.png)

---

## 总结

Claw Code 是一个可扩展、多模型、可自主运行的 AI 编程助手，执行速度快，适配多个模型。是日常好用的助手，推荐朋友们尝试一下，有问题欢迎在评论区交流。
