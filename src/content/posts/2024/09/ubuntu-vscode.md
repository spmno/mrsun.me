---
title: "Installing VS Code on Ubuntu"
date: "2024-09-15"
description: "A detailed guide to fixing Chinese input issues in VS Code on Ubuntu by adding Microsoft's official APT repository to install the full version of VS Code"
category: "Linux"
tags: ["ubuntu", "Vscode", "apt"]
---

Once Ubuntu was set up, I found the Chinese input method in VS Code didn't work well. After digging around online, I learned the snap version of VS Code is a trimmed-down build, so I reinstalled the full version and that fixed it. Here are the steps:

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
