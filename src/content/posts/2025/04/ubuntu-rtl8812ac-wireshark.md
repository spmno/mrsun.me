---
title: "在Ubuntu上安装rtl8812ac驱动并使用Wireshark进行网络分析"
date: "2025-04-10"
description: "详细步骤介绍如何在Ubuntu系统上安装rtl8812ac无线网卡驱动，并使用Wireshark进行网络数据包捕获和分析"
category: "Linux"
tags: ["ubuntu", "rtl8812ac", "wireshark", "网络分析"]
---

## 安装rtl8812ac驱动

1. 更新系统软件包
```
sudo apt update && sudo apt upgrade -y
```

2. 安装必要的依赖
```
// PC
sudo apt install linux-headers-$(uname -r) build-essential git
// Raspberry
sudo apt install -y raspberrypi-kernel-headers build-essential git
```

3. 克隆rtl8812ac驱动仓库
```
git clone https://github.com/lwfinger/rtw88
```

4. 编译并安装驱动
先用了dkms的方式，没弄明白。用直接make并且安装的方式。
```
cd rtl8812au
make
sudo make install
sudo make install_fw
```

## 使用Wireshark进行网络分析

1. 安装Wireshark
```
sudo apt install wireshark
```

2. 添加当前用户到wireshark用户组
```
sudo usermod -aG wireshark $USER
```
重启下电脑
3. 启动Wireshark
```
wireshark
```

4. 选择要捕获的网络接口并开始捕获数据包。

## 常见问题及解决方法

- 如果遇到权限问题，请确保当前用户已添加到wireshark用户组，并重新登录。
- 如果驱动安装失败，请检查内核版本是否兼容，并尝试更新内核。
