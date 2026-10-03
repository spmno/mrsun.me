---
title: "A Local-Deployment Tinkering Log for Code Agents: Can a Consumer GPU Handle Everyday Coding? Let's Start with Tank Battle"
date: "2026-07-12"
description: "Tuning local parameters to see whether it changes how well a local model can support a code agent."
category: "AI"
tags: ["AI", "LLM", "local deployment", "coding model", "Ornith", "Qwen"]
cover: "/images/posts/2026/07/agent-local-cover.jpg"
---

Hi, I'm MrSun.

Last time I wrote about [running Ornith-1.0-35B locally: can 35B parameters take down the 397B Qwen3.5?](/posts/2026/07/ornith-1-0-local-deploy/). Reading other bloggers' posts had lit a fire under my hope that a local model could handle day-to-day coding, but the result was disappointing. The cache kept running out, so these past couple of days I've been wondering: if I get the cache sorted out, could it actually work?

TL;DR: I tried multiple tuning strategies. Still no success.

Let's walk through what I did.

## 1. Bump the context cache to 32k and the cache type to q8_0

VRAM usage dropped noticeably:

![VRAM usage with the 32k cache](/images/posts/2026/07/agent-local-01.png)

Halfway through generating code, it got cut off.

![Code generation truncated](/images/posts/2026/07/agent-local-02.png)

opencode decided to split code generation into multiple steps

![Step-by-step generation](/images/posts/2026/07/agent-local-03.png)

It generated for a good 20-plus minutes, then declared the task complete, but all it had produced was a home screen, with no way to enter the game

## 2. Scale up the context to 64k and 128k

Since the q8_0-precision context didn't use much VRAM, I kept scaling the context up. I tried 64k and 128k contexts next.

The responses were about the same: the file was too large to create in one go, so it split the work into several steps.

![64k context attempt](/images/posts/2026/07/agent-local-04.png)

![128k context attempt](/images/posts/2026/07/agent-local-05.png)

Writing in chunks: the screenshot below shows the third chunk being written:

![Chunked writing](/images/posts/2026/07/agent-local-06.png)

With a larger cache, the generated program came out a bit better than before: I could get from the home screen into the game. But once inside, the game window was completely empty.

![Game entered but blank](/images/posts/2026/07/agent-local-07.png)

![Blank game screen](/images/posts/2026/07/agent-local-08.png)

## 3. Swap the model

At this point I started to suspect the model itself. I'd used Qwen3.5 and Qwen3.6 before, and they were decent at generating standalone programs (Python scripts), see [hands-on with Qwen3.6-27B: the best pick for everyday local deployment](/posts/2026/07/qwen36-27b-local-deploy/), so I switched to a local Qwen3.6 model to see how it would do. I didn't control the other parameters; the active context was around 18k.

![Switching to Qwen3.6](/images/posts/2026/07/agent-local-09.png)

VRAM was again nearly maxed out

![VRAM maxed out](/images/posts/2026/07/agent-local-10.png)

Output speed was much worse than Ornith 1.0 35B: only around 15 tokens/s

In actual testing, the generated code was incomplete again. And on the next generation attempt, the tool just kept spinning forever.

![The tool spinning endlessly](/images/posts/2026/07/agent-local-11.png)

But checking the llama.cpp server backend, there was actually no task running at all

![No tasks in the backend](/images/posts/2026/07/agent-local-12.png)

Switching models failed too. Looks like running coding tasks in a loop on a local 48GB GPU just isn't in the cards.

## 4. Back to online models

Right now, in opencode, both DeepSeek V4 Flash and Tencent's HY3 are free. I was curious (free anyway), so let's see how these two models do.

First up, DeepSeek V4 Flash. Generation interrupted once midway; after resuming the task, the final game was playable. Home screen and game screen below:

![DeepSeek V4 Flash home screen](/images/posts/2026/07/agent-local-13.png)

![DeepSeek V4 Flash game](/images/posts/2026/07/agent-local-14.png)

Then Tencent's HY3. Since Shunyu Yao joined, Tencent's LLM capabilities have visibly improved. Home screen and game page below. Overall completeness and playability beat DeepSeek V4 Flash:

![Tencent HY3 home screen](/images/posts/2026/07/agent-local-15.png)

![Tencent HY3 game](/images/posts/2026/07/agent-local-16.png)

![Tencent HY3 full result](/images/posts/2026/07/agent-local-17.png)

![Final comparison](/images/posts/2026/07/agent-local-18.png)

## Wrap-up

After an afternoon of tinkering, I burned one kilowatt-hour of electricity, which cost more than the DeepSeek V4 tokens would have

![The cost of tinkering](/images/posts/2026/07/agent-local-19.jpg)

For now, pairing an agent with a large online model remains the reliable path. A consumer GPU is fine for generating code snippets, but it's simply out of its depth for project-scale engineering. If you've run similar experiments, I'd love to hear about them in the comments.
