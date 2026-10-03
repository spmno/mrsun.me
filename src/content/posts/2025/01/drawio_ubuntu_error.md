---
title: "Fixing DrawIO Startup Issues on Ubuntu: A Detailed Troubleshooting Guide"
date: "2025-01-20"
description: "Fixing DrawIO failing to launch after installing the deb package on Ubuntu"
category: "Linux"
tags: ["drawio", "ubuntu", "sandbox"]
---

## The Problem

After downloading DrawIO's deb package from GitHub and installing it on Ubuntu, it failed to launch properly. This is caused by an incorrect sandbox permission configuration in DrawIO.

## The Fix

1. Open a terminal and go to DrawIO's installation directory:
   ```bash
   cd /opt/drawio
   ```

2. Run these two commands to fix the permission issue:
   ```bash
   sudo chown root:root chrome-sandbox
   sudo chmod 4755 chrome-sandbox
   ```

## What the Commands Do

- `chown root:root chrome-sandbox`: changes the owner of the chrome-sandbox file to the root user
- `chmod 4755 chrome-sandbox`: sets the file permission to 4755, where the 4 sets the SUID bit, and 755 means the owner can read, write, and execute while everyone else can read and execute

## Why This Happens

This issue typically affects Electron apps installed from AppImages or deb packages, because the Linux sandbox mechanism requires specific file permissions. The commands above set the sandbox permissions correctly so DrawIO can run normally.

## Verification

After running the commands above, restart the DrawIO application and it should work normally.
