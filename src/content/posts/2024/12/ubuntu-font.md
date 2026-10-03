---
title: "Fixing Ubuntu 24.04 Font Installation Issues and Optimizing Chinese Font Rendering"
date: "2024-12-02"
description: "Fixing font installation issues on Ubuntu 24.04 and optimizing Chinese font rendering"
category: "Linux"
tags: ["ubuntu", "font", "Chinese fonts"]
---

1. Install the Microsoft fonts
```
sudo apt-get install ttf-mscorefonts-installer
```
2. Incorrect Chinese character glyphs
```
sudo vim /usr/share/fontconfig/conf.avail/64-language-selector-cjk-prefer.conf 
```
Move the JP and KR entries down. Since this is a Chinese-language system, you only need to push the JP and KR entries down so they end up last.
Then reboot the machine or restart GNOME.
