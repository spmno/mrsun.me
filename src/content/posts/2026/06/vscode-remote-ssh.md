---
title: "VSCode Remote-SSH: Edit Remote Files Locally, a Remote Development Powerhouse"
date: "2026-06-30"
description: "Use VSCode's Remote-SSH extension to edit code on an Ubuntu server right from a MacBook. No more sync headaches, and you compile and run directly with the server's resources."
category: "Tools"
tags: ["VSCode", "SSH", "remote development", "productivity tools"]
cover: "/images/posts/2026/06/vscode-remote-ssh-cover.jpg"
---

# VSCode Remote-SSH: Edit Remote Files Locally, a Remote Development Powerhouse

At home I've always written code on a MacBook Air and synced it to my home server through a Git service on the LAN. Recently it hit me that back when I used WSL on Windows, VSCode on Windows could work directly with code in the WSL directory. So could I remote into Ubuntu from my MacBook too? I looked it up, and yes, it works. Here's the whole process.

## Installation and Configuration

In VSCode's extension panel, search for `remote`, then hit the Install button on **Remote - SSH**.

![Installing the Remote-SSH extension](/images/posts/2026/06/vscode-01.png)

After installation, a small computer icon shows up in the left activity bar. Click it to open the remote settings.

![Remote connection settings panel](/images/posts/2026/06/vscode-02.png)

On the settings page, click the **+** button at the right of the SSH row. An input box appears in the top right corner, prompting for the username and IP address of the remote connection:

![Entering SSH connection info](/images/posts/2026/06/vscode-03.png)

```
sunqp@192.168.2.17
```

Enter the server's username and IP address, then press Enter.

Next it prompts you to choose an SSH configuration file. Pick the first one. After pressing Enter, the remote machine's config shows up under SSH.

![SSH configuration selection](/images/posts/2026/06/vscode-04.png)

## Connecting and Using

Click the remote machine and you'll be prompted for the password. Once you're in, pick a directory and everything else works just like local development.

![Connected to the remote server](/images/posts/2026/06/vscode-05.png)

You can also open a new terminal and work in it directly. Super convenient.

![Working in the remote terminal](/images/posts/2026/06/vscode-08.png)

## Summary

With the Remote-SSH extension, you can edit server code directly in VSCode. You get a visual editor plus the server's resources for fast compiles. If this fits your workflow, give it a try. Any questions, welcome in the comments.
