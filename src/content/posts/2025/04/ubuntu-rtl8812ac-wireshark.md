---
title: "Installing the rtl8812ac Driver on Ubuntu and Analyzing Network Traffic with Wireshark"
date: "2025-04-10"
description: "Detailed steps for installing the rtl8812ac wireless driver on Ubuntu and using Wireshark to capture and analyze network packets"
category: "Linux"
tags: ["ubuntu", "rtl8812ac", "wireshark", "network analysis"]
---

## Installing the rtl8812ac Driver

1. Update system packages
```
sudo apt update && sudo apt upgrade -y
```

2. Install the required dependencies
```
// PC
sudo apt install linux-headers-$(uname -r) build-essential git
// Raspberry
sudo apt install -y raspberrypi-kernel-headers build-essential git
```

3. Clone the rtl8812ac driver repository
```
git clone https://github.com/lwfinger/rtw88
```

4. Build and install the driver
I tried the DKMS approach first but couldn't figure it out, so I went with a direct make and install instead.
```
cd rtl8812au
make
sudo make install
sudo make install_fw
```

## Network Analysis with Wireshark

1. Install Wireshark
```
sudo apt install wireshark
```

2. Add your current user to the wireshark group
```
sudo usermod -aG wireshark $USER
```
Then reboot your computer.
3. Launch Wireshark
```
wireshark
```

4. Select the network interface you want to capture on and start capturing packets.

## Common Issues and Fixes

- If you run into permission issues, make sure your current user has been added to the wireshark group, then log in again.
- If the driver installation fails, check whether your kernel version is compatible and try updating the kernel.
