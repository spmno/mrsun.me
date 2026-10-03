---
title: "Running Ornith-1.0-35B Locally: Can 35B Parameters Take Down the 397B Qwen3.5?"
date: "2026-07-12"
description: "A hands-on local deployment test of DeepReinforce's Ornith-1.0 series: how 35B parameters actually perform at coding."
category: "AI"
tags: ["AI", "LLM", "Ornith", "local deployment", "coding model"]
cover: "/images/posts/2026/07/ornith-cover.jpg"
---

Hi, I'm MrSun.

In late June, the open-source world got a new model: DeepReinforce's Ornith-1.0 series. It's positioned for agentic coding, built on a self-improving reinforcement-learning framework that pushes coding ability up a notch at the same parameter count.

I've read plenty of articles about it lately, and I also pulled the Q8_0 GGUF build to run locally myself. Today let's talk about how it actually went.

---

## 1. The Basics

For access from within China:

```
"https://hf-mirror.com/deepreinforce-ai/Ornith-1.0-35B-GGUF/resolve/main/ornith-1.0-35b-Q8_0.gguf"
```

Ornith-1.0 isn't a base model trained from scratch; it's a post-training optimization built on top of Qwen3.5 MoE. Key specs:

-   35B total parameters, MoE architecture with 8 of 256 experts active, roughly 30B actually activated
-   256K context window
-   Native tool-calling support, OpenAI-compatible format
-   MIT license, no commercial restrictions
-   Full range of GGUF quantizations, from Q2_K to Q8_0

The core is its training method: **Self-Scaffolding RL**.

In plain terms: coding models used to be trained inside a fixed, human-designed problem-solving pipeline (say, analyze the requirements first, then write the tests, then write the code), with the model left to try and fail within that frame. But a flow designed by humans doesn't necessarily fit every problem.

Ornith's idea is to hand "designing the problem-solving process" over to the model to learn itself. While working through a problem, it generates code and, at the same time, a scaffold tailored to that problem; both get optimized together by the reward signal. In effect, the model learns to solve problems while also learning how to solve them.

---

## 2. Reading the Benchmarks

First, the official benchmark scores, listed objectively for your reference.

| Benchmark | Ornith-1.0-35B | Qwen3.5-35B | Qwen3.6-35B |
|---------|---------------|-------------|-------------|
| SWE-bench Verified | 75.6 | - | - |
| Terminal-Bench 2.1 | 64.2 | 41.4 | - |
| SWE-bench Pro | 50.4 | 44.6 | 49.5 |

Sources: official model card and third-party technical write-ups

A few objective takeaways:

1.  **A clear edge at the same size**. Against Qwen3.5/3.6-35B, every coding benchmark improves, with a small lead over Qwen3.6 on SWE-bench Pro.
2.  **Beats the 397B on some tests**. That claim comes mainly from the Terminal-Bench 2.1 item (64.2 vs 53.5). Different benchmarks tell different stories, so don't overgeneralize.
3.  **Inflated SWE-bench scores are an industry norm**. Independent research shows that roughly one in five "passing" patches on the leaderboard actually have semantic issues, a problem every model faces, not just this one.

My take: this model is the real deal. It's first-tier in the 35B class, and a strong pick if coding is your focus.

---

## 3. Local Deployment, Tested

Back to what everyone cares about most: can an ordinary GPU run it? And how fast?

I tested `ornith-1.0-35b-Q8_0.gguf`, about 37GB on disk. Q8_0 is a high-fidelity quantization with minimal precision loss, the right choice when you're after quality.

### How to download

```
curl -L -C - \
  -A "Mozilla/5.0 Chrome/120.0.0.0" \
  -o ornith-1.0-35b-Q8_0.gguf \
  "https://hf-mirror.com/deepreinforce-ai/Ornith-1.0-35B-GGUF/resolve/main/ornith-1.0-35b-Q8_0.gguf"
```

![Download command example](/images/posts/2026/07/ornith-01.png)

### VRAM and speed

Fully loaded, the Q8_0 build needs about 38-40GB of VRAM. If your VRAM falls short, the Q4_K_M quantization runs in about 20GB.

On inference speed: on a single consumer GPU, the Q8_0 build runs at roughly 60-70 tokens/s on my machine.

The community also has an optimized build grafted with MTP (multi-token prediction), about 35% faster. Worth a look if speed is your priority.

![Speed test results](/images/posts/2026/07/ornith-02.png)

---

## 4. Real-World Impressions

I loaded the model with llama.cpp and started testing:

**Everyday writing test**

I asked it to write a poem to see how it does:

![Poem generation test](/images/posts/2026/07/ornith-03.png)

Not bad. The main surprise was the generation speed: up to 72 tokens/s, the fastest model I've ever run locally.

**Coding tasks**. The model's main improvement is coding ability, so let's pair it with opencode and see how it does.

Start the service with llama.cpp server:

![llama.cpp server starting up](/images/posts/2026/07/ornith-04.png)

Configure the local model in opencode and ask it to build a Tank Battle game:

![opencode configuration](/images/posts/2026/07/ornith-05.png)

![Tank Battle generation process](/images/posts/2026/07/ornith-06.png)

Per the logs, the speed was around 70 tokens/s

![Logs showing the speed](/images/posts/2026/07/ornith-07.png)

But GPU utilization was pushing 100%, right at the limit.

Midway through generation, the code output got truncated, so it decided to write in smaller chunks.

In the end, the agent settled for generating the simplest possible program, and after 10 minutes said it was done.

![Simplified program result](/images/posts/2026/07/ornith-08.png)

The final result:

![Final game result](/images/posts/2026/07/ornith-09.png)

I gave it a try: pretty buggy, and it freezes up before long.

---

## 5. Conclusions and Advice

Let me end with a clear verdict so nobody has to agonize over it.

Overall, Ornith-1.0-35B is a locally runnable coding model, but in my view it can only produce snippet-level code. Project-scale programs are basically out of the question. For everyday use, the online GLM5.2, Kimi2.6, and DeepSeek V4 Pro are still the dependable choices. This one is more of a hobbyist's toy.

*I'm MrSun, focused on AI and related technology. If you have questions, let's discuss in the comments.*
