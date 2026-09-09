---
title: "实测Qwen3.8-27B：看了一晚上的打字机，用了4度电，终于见到消费级显卡的希望了"
author: "程序员老孙"
date: "2026-08-21 00:14"
source: "https://mp.weixin.qq.com/s/5jcRt-3MVo5CebNkofNULg"
---

# 实测Qwen3.8-27B：看了一晚上的打字机，用了4度电，终于见到消费级显卡的希望了

大家好，我是老孙。

之前本地部署过Qwen3.6‑27B [实测｜Qwen3.6-27B 上手体验，本地日常部署最优选择](https://mp.weixin.qq.com/s?__biz=MzAwNzAzNTEwNw==&mid=2648367093&idx=1&sn=3cac08711d490b23b542d0fdc020edc6&scene=21#wechat_redirect)，在同参数本地模型里综合体验不错，可以说是当时消费级显卡的最优选。最近阿里发布Qwen3.8‑27B，网传能力对标Opus4.6，

![](images/01.png)

我就搭建环境做个实测，看看它的真实水平。

本次依旧选用 Unsloth 开源的 GGUF 量化版本。对比常规 Q8_0 量化，`Qwen3.8‑27B‑UD‑Q8_K_XL.gguf`细节损耗更低，输出效果最接近BF16原版。

为解决外网下载限速，全程使用国内hf‑mirror镜像下载模型：

```bash
curl -L -C - "https://hf-mirror.com/unsloth/Qwen3.8-27B-GGUF/resolve/main/Qwen3.8-27B-UD-Q8_K_XL.gguf?download=true" -o "Qwen3.8-27B-UD-Q8_K_XL.gguf"
```

![](images/02.png)

部署前更新最新的llama.cpp运行环境，拉取最新源码并重新编译，保证兼容性与推理效率：

```bash
git pull
cmake -B build -DGGML_VULKAN=ON
cmake --build build
```

![](images/03.png)

![](images/04.png)

我使用AMD显卡，基于HIP环境运行，llama-cli启动命令：

```bash
HIP_VISIBLE_DEVICES=0 ./build/bin/llama-cli -m ~/models/Qwen3.8-27B-UD-Q8_K_XL.gguf
```

![](images/05.png)

先做简单测试，让模型写一首七言绝句。直观感受：思考耗时相比前代缩短不少，输出的诗句整体也比较工整。

![](images/06.png)

这次测试重点还是Agent代码能力，启动 llama-server 提供接口服务：

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

沿用之前的测试方案，打算用OpenCode以及我自己写的Agent，完成经典坦克大战完整代码生成。

![](images/07.png)

![](images/08.png)

实际运行遇到明显问题：推理速度仅约17 tokens/s。查看服务日志，模型一直在输出日志，但OpenCode侧持续卡在`Thinking`，等待一小时也没有产出有效代码。

![](images/09.png)

相比之前版本有一点进步：旧模型经常生成一半直接中断、服务异常退出；本次进程没有崩溃，说明模型一直在正常推理，仅仅是速度太慢。

最后放弃Agent，切换到 llama-cli 完成任务。llama-cli的好处没有多余的流程，并且可以直接看到流式输出过程，虽然慢，但能确认模型还在正常工作。

![](images/10.png)

整个过程中模型不断进入思考阶段，有整体的规划

![](images/11.png)

有图层的规划，分主图层，游戏结束层，暂停层

![](images/12.png)

第一次尝试输出html，发现问题，后面又改了好多次

![](images/13.png)

又一次更新HUD相关函数

![](images/14.png)

模型持续自行发现并修正代码错误，耗时一小时后，终于输出完整代码。

![](images/15.png)

![](images/16.png)

将输出的代码复制出来直接运行，结果超出预期：程序正常跑通，完整实现基地、敌方坦克、音效、道具；暂停、恢复、游戏结束等状态逻辑全部可用。

![](images/17.png)

![](images/18.png)

![](images/19.png)

![](images/20.png)

对比我之前跑过的各类本地模型，**Qwen3.8‑27B 是目前我手上27B档位综合实力最强的本地大模型，就是显卡原因推理速度偏慢。让我对本地模型的使用增加了几分信心。**

**看了一晚上的打字机，实际用了4度电。**

![](images/21.jpg)

后续计划测试 Qwen3.8‑35B MoE，希望MoE架构可以在尽量保证输出质量的前提下，改善推理速度。

大家也有在部署和使用Qwen3.8-27B的经验和问题，欢迎在评论区交流。
