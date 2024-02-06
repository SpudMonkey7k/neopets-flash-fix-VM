# Mac (M Series/Apple Silicon) VM Guide

### Preface:
> [!NOTE]
> This was not tested as I do not have an M series Mac, but others have followed this guide and it has worked for them!

This guide is overly detailed to make it approachable, so  don't be put off by all the steps. It should be as easy to follow as possible. Some computer knowledge will definitely help.

***Please read this entire guide before starting.*** You don't need to memorize it, but some information later on will definitely prove useful during installation, and there is no way to order everything perfectly for all use cases.

**Initial Downloads**
1. Download [UTM](https://mac.getutm.app/).
2. Download Windows 10 64-bit ISO from [Microsoft](https://www.microsoft.com/en-us/software-download/windows10).
> Make sure that you select proper product language that works for you; this guide used English.
![win10iso](https://github.com/SpudMonkey7k/neopets-flash-fix-VM/assets/153334253/cc3dd020-f702-4541-bce0-1d6efd7b35ab)

**Instructions**
1. Install and run UTM.
2. Click on `Create a New Virtual Machine`.
![utm-main](https://github.com/SpudMonkey7k/neopets-flash-fix-VM/assets/153334253/2629e58e-dde7-44c9-86e8-67988d77ce0e)
3. Click `Emulate`. ![utm-start](https://github.com/SpudMonkey7k/neopets-flash-fix-VM/assets/153334253/059d2586-827d-4f83-9788-ecd085084fe1)
4. Select `Install Windows 10 or higher` and `Install drivers and SPICE tools`.
5. Click Browse and select the Windows 10 ISO you downloaded. ![utm-windows](https://github.com/SpudMonkey7k/neopets-flash-fix-VM/assets/153334253/418c86cc-d6a6-48c1-aa1b-71d90340ea08) 
6. Select amount of memory and cpu cores you'd like to allocate to the VM.![utm-memory](https://github.com/SpudMonkey7k/neopets-flash-fix-VM/assets/153334253/8a1ddb26-410b-4bc3-9abc-53e0a70a3ce0)
> At minimum, select 2GB (2048MB) of Base Memory and 1 cores.
> I'd recommend 4GB memory and 2 cores, but depending on your machine's specs you may be unable to allocate that. 
7. Default Drive allocation should be enough.![utm-storage](https://github.com/SpudMonkey7k/neopets-flash-fix-VM/assets/153334253/5d21b55b-a6f5-46f0-82ca-476bb5d67773)
8. Leave Shared Directory alone, there is no need to add a shared directory. ![utm-shared](https://github.com/SpudMonkey7k/neopets-flash-fix-VM/assets/153334253/a2b46c6a-5c6a-4571-a0f0-06dcd288719a)
9. At the summary screen, name your VM then click save.
10. Select the VM you created then click play to start it.![utm-launch](https://github.com/SpudMonkey7k/neopets-flash-fix-VM/assets/153334253/3f8299c9-94cf-45c8-9e1d-c209bb7a8928)
11. Follow on-screen instructions to complete Win10 install.
> [!NOTE]
> You do not need to use a Win10 Product Key as Microsoft allows you to use Windows 10 without a key. 

