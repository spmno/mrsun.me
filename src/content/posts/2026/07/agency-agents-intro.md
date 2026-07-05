---
title: "agency-agents，让大批专家成为你的助手"
date: "2026-07-05"
description: "使用 agency-agents 给智能体工具导入 232 个专业 AI Agent，覆盖前后端、设计、营销、安全等 16 个领域。"
category: "AI"
tags: ["AI", "OpenCode", "Agent", "开源"]
cover: "/images/posts/2026/07/agency-agents-cover.jpg"
---

日常用智能体的时候都是给 Prompt 给提示词，获取答案。如果感觉提示词不够好，可以先用大模型生成 Prompt，再给智能体。

今天介绍的 **agency-agents** 这个开源项目（GitHub 127k+ Star），地址：

```
https://github.com/msitarzewski/agency-agents
```

它定义了 232 个专业 AI Agent，每个都有独立人格、工作流程和交付标准，覆盖前后端、设计、营销、安全等 16 个领域。

## 先看效果：同一个问题，两种回答

假设你问 AI："设计一个用户认证 API"。

**通用 Prompt 的回答**（大致是这样）：

> 建议使用 JWT 实现用户认证。创建一个 POST /login 接口，接收用户名和密码，验证通过后返回 Token。客户端在后续请求中携带 Token...

**agency-agents 的 `@backend-architect` 回答**（风格是这样的）：

> 我来设计一个完整的认证方案。架构上采用 Access Token + Refresh Token 双 Token 模式：Access Token 有效期短（15分钟），用于接口鉴权；Refresh Token 有效期长（7天），用于无感刷新。数据库设计上，需要一张 refresh_tokens 表来支持 Token 撤销。具体来说...

他不仅可以接入 Claude Code，它还自带转换脚本，可以直接接入 OpenCode、Kimi Code 等工具，今天我就用 OpenCode 带大家体验下它的能力。

![OpenCode 集成示意图](/images/posts/2026/07/agency-agents-01.png)

## 三步接入 OpenCode

### 第一步：克隆仓库

```bash
git clone https://github.com/msitarzewski/agency-agents.git && cd agency-agents
```

### 第二步：生成 OpenCode 格式的 Agent 文件

```bash
./scripts/convert.sh --tool opencode
```

这一步把 232 个 Markdown 提示词转换成 OpenCode 能识别的格式。导入的时候 OpenCode 有限制，下面踩坑指南会有具体的说明。

### 第三步：选择性安装到你的项目

OpenCode 目前有 Agent 数量上限（约 119 个），全量装会被静默丢弃。用 `--division` 按需选择：

```bash
./scripts/install.sh --tool opencode \
  --division engineering,design,security,testing
```

这 4 个 Division 共 61 个 Agent，覆盖前后端开发、UI 设计、安全审计、质量保障，完全够用。

![Division 选择界面](/images/posts/2026/07/agency-agents-02.png)

不确定有哪些 Division？每个 Division 都有具体的说明：

![Division 说明](/images/posts/2026/07/agency-agents-03.png)

也可以用命令预览：

```bash
./scripts/install.sh --list teams
```

## 装好之后怎么用

安装完成后，你的项目下会多出 `.opencode/agents/` 目录，里面是所有 Agent 文件。

![安装后的 Agent 文件](/images/posts/2026/07/agency-agents-04.png)

在 OpenCode 里用 `@` 加 Agent 名称调用，比如：

```
@frontend-developer 用 React 写一个带无限滚动的列表组件
```

```
@security-architect 审查这个 API 的安全设计
```

```
@database-optimizer 优化这个慢查询
```

每个 Agent 会根据自己的专业领域和人格来响应，给出更具体、更可执行的回答。

![Agent 调用效果](/images/posts/2026/07/agency-agents-05.png)

我们让它看看这个公众号文章写的怎么样：

![AI 审阅文章](/images/posts/2026/07/agency-agents-06.png)

给的反馈如下：

![AI 反馈意见](/images/posts/2026/07/agency-agents-07.png)

给的建议基本靠谱，直接就让它给重写了一版。

![AI 重写版本](/images/posts/2026/07/agency-agents-08.png)

## 踩坑指南

**Q：安装时报 "registers only ~119 agents" 的警告？**

这是 OpenCode 的已知 Bug（上游 Issue #27988），它最多注册约 119 个 Agent。用 `--division` 控制总数即可，比如只装 `engineering` + `design` = 43 个。

**Q：装完之后 OpenCode 没有识别到？**

确认 Agent 文件在项目根目录的 `.opencode/agents/` 下，且文件格式正确（每个文件顶部有 `---` 包裹的 YAML frontmatter）。

**Q：想升级到最新版怎么办？**

重新跑一遍转换和安装即可，旧文件会被覆盖：

```bash
cd agency-agents && git pull
./scripts/convert.sh --tool opencode
./scripts/install.sh --tool opencode --division engineering,design,security,testing
```

## 最后

agency-agents 不是什么颠覆性创新，它做了一件很朴素但很有价值的事：把 AI Agent 从"通用提示词"升级为"专业角色"，并且提供了完整的工具链，让你能快速接入到实际工作流中。

官方最后面给出中文社区维护的链接：

```
https://github.com/jnMetaCode/agency-agents-zh
```

如果有使用中有什么问题，欢迎在评论区讨论。
