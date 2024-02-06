# Windows VM Guide

### BIOS Settings
This guide uses Virtual Machines, make sure your bios has virtualization settings enabled. 
(Intel VT-x or AMD-V)

### Preface:
This guide is confirmed to work on Windows 8.1, 10, and 11. It should also work on windows 7, but untested.

This guide is overly detailed to make it approachable, so  don't be put off by all the steps. It should be as easy to follow as possible. Some computer knowledge will definitely help.

***Please read this entire guide before starting.*** You don't need to memorize it, but some information later on will definitely prove useful during installation, and there is no way to order everything perfectly for all use cases.

**Initial Downloads**
1. Download [vmware Workstation](https://www.vmware.com/products/workstation-player.html).
2. Download Windows 10 Media Creation Tool from [Microsoft](https://www.microsoft.com/en-us/software-download/windows10).

**Windows 10 ISO** 
1. Run Media Creation Tool.
2. Accept license.
3. Select `Create install media` option and click next.
4. Click next on Language/Edition screen.
5. On next screen, select `ISO file` then click next.
6. Choose where to save the ISO, default is Downloads folder.
7. Tool will now download the Win10 ISO. you can close out of creation tool once completed. 

**VM Setup**
1. Install and run VMware Workstation.
2. Click on `Create a New Virtual Machine`.
3. Select `Installer Disc Image File (ISO)` then browse for the ISO that you just downloaded from steps above.
4. VMWare should automatically detect that it's a Win10 ISO and select the proper settings needed.
5. Click Next.
> You can change the name of the VM, but defualt name is just fine.
6. Click next on Name screen.
7. Set Max Disc Space to 40GB if not already set.
8. Click Next then click Finish.
9. VM should boot up.
10. Follow on screen directions to installing Win10.
> You do not need a product key to activate Win10 as Microsoft allows you to use it without a key!
