---
title: "在Ubuntu下安装VsCode"
date: "2024-09-15"
description: "解决Ubuntu系统中VsCode中文输入问题的详细指南，通过添加Microsoft官方APT源来安装完整版VsCode"
category: "Linux"
tags: ["ubuntu", "Vscode", "apt"]
---

Ubuntu安装完成后发现VsCode中的中文输入法不好用，查找资料发现snap中的VsCode是被裁剪过的，所以安重新安装，就可以了。步骤如下：

```
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
rm -f packages.microsoft.gpg
sudo apt install apt-transport-https
sudo apt update
sudo apt install code
```

https://code.visualstudio.com/docs/setup/linux
