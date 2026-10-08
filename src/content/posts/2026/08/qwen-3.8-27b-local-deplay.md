---
title: "Hands-On with Qwen3.8-27B: A Night of Watching the Typewriter, 4 kWh Burned, and Finally Some Hope for Consumer GPUs"
author: "MrSun"
date: "2026-08-21 00:14"
description: "A hands-on local deployment test of Qwen3.8-27B with llama.cpp and Unsloth's Q8_K_XL GGUF quant on an AMD GPU — speed, thinking time, and output quality on consumer GPUs."
source: "https://mp.weixin.qq.com/s/5jcRt-3MVo5CebNkofNULg"
cover: "/images/posts/2026/08/17.png"
---

# Hands-On with Qwen3.8-27B: A Night of Watching the Typewriter, 4 kWh Burned, and Finally Some Hope for Consumer GPUs

Hi, I'm MrSun.

I previously ran Qwen3.6-27B locally ([Hands-on with Qwen3.6-27B: the best pick for everyday local deployment](https://mp.weixin.qq.com/s?__biz=MzAwNzAzNTEwNw==&mid=2648367093&idx=1&sn=3cac08711d490b23b542d0fdc020edc6&scene=21#wechat_redirect)). Among local models of the same size it offered a solid overall experience, arguably the best option for consumer GPUs at the time. Recently Alibaba released Qwen3.8-27B, and word is its capabilities rival Opus 4.6.

![](/images/posts/2026/08/01.png)

So I set up the environment and ran some real tests to see what it can actually do.

Once again I went with Unsloth's open-source GGUF quantization. Compared with the standard Q8_0 quant, `Qwen3.8-27B-UD-Q8_K_XL.gguf` loses less fine detail and its output is the closest to the original BF16 model.

To get around slow download speeds from Hugging Face, I pulled the model through the hf-mirror mirror the whole way:

```bash
curl -L -C - "https://hf-mirror.com/unsloth/Qwen3.8-27B-GGUF/resolve/main/Qwen3.8-27B-UD-Q8_K_XL.gguf?download=true" -o "Qwen3.8-27B-UD-Q8_K_XL.gguf"
```

![](/images/posts/2026/08/02.png)

Before deployment I updated to the latest llama.cpp, pulling the newest source and rebuilding to ensure compatibility and inference efficiency:

```bash
git pull
cmake -B build -DGGML_VULKAN=ON
cmake --build build
```

![](/images/posts/2026/08/03.png)

![](/images/posts/2026/08/04.png)

I'm on an AMD GPU running through the HIP environment. The llama-cli launch command:

```bash
HIP_VISIBLE_DEVICES=0 ./build/bin/llama-cli -m ~/models/Qwen3.8-27B-UD-Q8_K_XL.gguf
```

![](/images/posts/2026/08/05.png)

First a simple test: asking the model to write a seven-character quatrain. First impressions: thinking time is much shorter than the previous generation, and the verses it produces are fairly well-crafted overall.

![](/images/posts/2026/08/06.png)

The real focus of this test is still Agent coding ability, so I started llama-server to serve the API:

```bash
HIP_VISIBLE_DEVICES=0 ./build/bin/llama-server \
-m ~/models/Qwen3.8-27B-UD-Q8_K_XL.gguf \
--host 0.0.0.0 \
--port 8080 \
-ngl 99 \
-c 16384 \
-np 2 \
-fa on
```

Following my usual test plan, I set out to generate the complete code for the classic Tank Battle game, using OpenCode plus an agent I wrote myself.

![](/images/posts/2026/08/07.png)

![](/images/posts/2026/08/08.png)

In practice there was an obvious problem: inference ran at only about 17 tokens/s. The service logs showed the model producing output continuously, but OpenCode stayed stuck at `Thinking`, and after an hour there was still no usable code.

![](/images/posts/2026/08/09.png)

One improvement over the previous version: the old model would often cut off halfway through generation and the service would exit abnormally. This time the process never crashed, which means the model kept inferencing normally; it was simply too slow.

In the end I gave up on the agent and switched to llama-cli to finish the job. llama-cli's advantage is that there's no extra machinery, and you can watch the output stream directly. Slow, but at least you can confirm the model is still working.

![](/images/posts/2026/08/10.png)

Throughout the process the model kept entering its thinking phase, with an overall plan

![](/images/posts/2026/08/11.png)

It also planned out layers: a main layer, a game-over layer, and a pause layer

![](/images/posts/2026/08/12.png)

Its first attempt at the HTML had problems, and it went through many more revisions afterward

![](/images/posts/2026/08/13.png)

Another pass updating the HUD-related functions

![](/images/posts/2026/08/14.png)

The model kept finding and fixing its own code errors, and after an hour it finally produced the complete code.

![](/images/posts/2026/08/15.png)

![](/images/posts/2026/08/16.png)

I copied the generated code out and ran it as-is, and the result exceeded expectations: the program ran correctly, with a full implementation of the base, enemy tanks, sound effects, and power-ups; the state logic for pause, resume, and game over all worked.

![](/images/posts/2026/08/17.png)

![](/images/posts/2026/08/18.png)

![](/images/posts/2026/08/19.png)

![](/images/posts/2026/08/20.png)

Compared with the various local models I've run before, **Qwen3.8-27B is the strongest all-around local model in the 27B class I have on hand. The only downside is slow inference due to my GPU. It has given me a bit more confidence in using local models.**

**A whole night watching the typewriter, and 4 kWh of electricity actually used.**

![](/images/posts/2026/08/21.jpg)

Next I plan to test Qwen3.8-35B MoE, hoping the MoE architecture can improve inference speed while preserving output quality as much as possible.

If you've also had experience or run into issues deploying and using Qwen3.8-27B, let's talk in the comments.
