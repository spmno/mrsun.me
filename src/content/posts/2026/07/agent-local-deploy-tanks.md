---
title: "Agent使用本地部署折腾小记，消费级显卡是否能撑起日常编程任务？让我们从坦克大战说起"
date: "2026-07-12"
description: "本地调整参数，看是否可以改变本地模型支撑code agent的性能"
category: "AI"
tags: ["AI", "LLM", "本地部署", "编程模型", "Ornith", "Qwen"]
cover: "/images/posts/2026/07/agent-local-cover.jpg"
---

大家好，我是老孙。

上次写了[本地跑Ornith-1.0-35B：350亿参数能干翻3970亿的Qwen3.5?](/posts/2026/07/ornith-1-0-local-deploy/) 当时看了其它博主的文章，燃起了我对本地模型可以日常coding的希望，但结果不太满意。当时是缓存一直不够，所以这两天一直在想，如果把缓存调整好了，是不是能行？

TL;DR：用多个策略调整，还是没成功。

下面还是看具体的操作吧。

## 1. 把上下文缓存调整到32k，cache type调整到q8_0

显存使用明显下降：

![32k缓存显存使用](/images/posts/2026/07/agent-local-01.png)

生成代码到一半，就截断了。

![代码生成截断](/images/posts/2026/07/agent-local-02.png)

opencode决定用分多个步骤来生成代码

![分步骤生成](/images/posts/2026/07/agent-local-03.png)

生成了能有20多分钟，说任务完成了，但只生成出来一个主页，无法进入游戏

## 2. 扩大上下文，到64k和128k

既然用q8_0精度的上下文，显存用的不多，那就继续扩大上下文的大小。我又分别实验了64k与128k大小的上下文

提示都差不多，还是说文件太大，无法创建，然后分成几步去创建

![64k上下文尝试](/images/posts/2026/07/agent-local-04.png)

![128k上下文尝试](/images/posts/2026/07/agent-local-05.png)

分块写入，如下图，是写的第三块

![分块写入](/images/posts/2026/07/agent-local-06.png)

缓存大一些，生成的程序能比之前的好一些，可以从主页进入到游戏中。不过进入游戏后，游戏框中什么也没有。

![游戏进入但空白](/images/posts/2026/07/agent-local-07.png)

![空白游戏界面](/images/posts/2026/07/agent-local-08.png)

## 3. 换模型

这时候，我开始怀疑，是不是这个模型的问题。因为之前用过Qwen3.5和Qwen3.6，生成单个程序（python脚本）能力还可以[实测｜Qwen3.6-27B 上手体验，本地日常部署最优选择](/posts/2026/07/qwen36-27b-local-deploy/)，所以就换了Qwen3.6的本地模型看一看效果。没有控制其它参数，可以看到启用的上下文是18k左右。

![换用Qwen3.6](/images/posts/2026/07/agent-local-09.png)

显存基本也是占满的状态

![显存占满](/images/posts/2026/07/agent-local-10.png)

输出的速度要和 ornith 1.0 35B 差很多，只有15tokens/s左右

实际测试下来生成的代码也不完整。并且再次生成时，工具就一直转个不停。

![工具一直转动](/images/posts/2026/07/agent-local-11.png)

但是，看llama.cpp server的后台，其实已经没有任务

![后台无任务](/images/posts/2026/07/agent-local-12.png)

换模型也失败，看来本地48G显卡，想用loop跑编程任务，不大可能。

## 4. 还是回到在线模型

目前，在opencode模型中, deepseek v4 flash与腾讯的hy3 都在免费。有点好奇，反正也免费，让我们看看他们两个模型的效果。

首先是deepseek v4 flash，中间有一次生成中断，继续任务后，最后生成游戏可玩，主页面与游戏页面如下：

![DeepSeek V4 Flash 主页](/images/posts/2026/07/agent-local-13.png)

![DeepSeek V4 Flash 游戏](/images/posts/2026/07/agent-local-14.png)

然后是腾讯的hy3，姚顺雨来了之后，腾讯的大模型能力肉眼提升，主页与游戏页如下，整体完整度与可玩性要比deepseek v4 flash要好：

![腾讯HY3 主页](/images/posts/2026/07/agent-local-15.png)

![腾讯HY3 游戏](/images/posts/2026/07/agent-local-16.png)

![腾讯HY3 完整效果](/images/posts/2026/07/agent-local-17.png)

![最终对比](/images/posts/2026/07/agent-local-18.png)

## 总结

经过一下午的折腾，费了一度电，价格比用deepseek v4 token还贵

![折腾成本](/images/posts/2026/07/agent-local-19.jpg)

目前看来，还是在线的大参数模型与agent配合比较靠谱，消费级显卡生成代码段还可以，但完成项目级别的工程还是有能力有限。不知道大家有没有做过相关的实践，欢迎在评论区交流。
