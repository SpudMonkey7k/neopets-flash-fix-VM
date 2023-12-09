Thanks to themrrobert and juvian for initial process.

# Play Flash, Shockwave Neopets games! Works in 2023
> 3Dvia currently does not work as there is no standalone installer.

### BIOS Settings
This guide uses Virtual Machines, make sure your bios has virtualization settings enabled. 
(Intel VT-x or AMD-V)

NOTE: if you are running a Windows 8.1 machine or a Windows 10 machine update 21H2 or older, you can do this directly from your machine, no need for a VM. 

## Important: Do not give your Fiddler session data to ANYONE.
This contains your login cookies! If you do seek help from anyone, including myself, always logout which will invalidate your session cookie, and then log back in, to ensure that noone can use your cookies to login.

### Preface:
This guide is confirmed to work on Windows 8.1 and 10 1607. It should work on any build of Windows 10 build 21H2 and older. Should also work on windows 7, but untested.

This guide is overly detailed to make it approachable, so  don't be put off by all the steps. It should be as easy to follow as possible. Some computer knowledge will definitely help.

***Please read this entire guide before starting.*** You don't need to memorize it, but some information later on will definitely prove useful during installation, and there is no way to order everything perfectly for all use cases.

### Disclaimer:

Flash and Shockwave are dead content. Do not use flash/shockwave enabled browsers for anything other than Neopets (or other trusted flash game sites). Even then not I, nor anyone else can guarantee your safety using these extensions, so do so at your own risk!

### Fiddler - Required for all games

You must install Fiddler Classic. This is because Neopets forces SSL (HTTPS) now, and the games were never updated to support SSL/HTTPS. There are also some other game-specific issues that Fiddler allows us to fix.

Fiddler, as configured, will act as a Man-in-the-middle (which is a good thing in this case, because YOU are the man-in-the-middle), which allows your browser to connect to Fiddler over HTTP, and then Fiddler bridges the connection to Neopets over HTTPS.

This is absolutely required in order to play nearly all Flash/Shockwave/3dvia games, and is the most complicated part of the installation, but if you follow the steps as described, you will be okay! I will try to respond to Issues submitted to this repository for the short term, and update the guide accordingly.

**Initial Setup**
1. Install [vmware workstation](https://www.vmware.com/products/workstation-player.html).
2. Download Windows 8.1 ISO from [Microsoft](https://www.microsoft.com/en-us/software-download/windows8ISO).
> You will have to provide your own Windows 10 ISO 21H2 or older as Microsoft no longer provides ISO of older versions of Win10.
3. Run vmware and create a new vm using the Win 8.1 ISO, vmware should detect it as a Win8.1 ISO and automatically select the proper settings.
4. boot up the vm.

**Fidler Instructions:**
1. Install [Fiddler Classic](https://www.telerik.com/download/fiddler) (**NOT** "Fiddler Everywhere") There is no email confirmation, so just put in a fake email.
2. Find fiddler script folder (usually Documents\Fiddler2\Scripts) and save [CustomRules.js](https://github.com/themrrobert/neopets-flash-fix-windows-10/blob/main/fiddler/CustomRules.js) to that directory. Alternatively, you can copy/paste the file contents into Fiddler->Rules->Customize rules (erase everything in there first), and hit Ctrl+S to save. You should hear a slight ding.
3. In Fiddler go to Tools -> Options -> HTTPS.
> **Enable:**
> - Capture HTTPS CONNECTs
> - Decrypt HTTPS Traffic
> - Ignore Server Certificate Errors.
> 4. Click Actions->Export Root Certificate to Desktop (This is to make Internet Explorer trust the localhost and not give you constant certificate errors)
> 5. Click Actions->Trust Root Certificate. This will make other browsers (like Chrome), and Windows apps such as Discord, also trust the proxy (Fiddler). *This isn't strictly necessary, but if it's not done, you won't be able to use Chrome/Discord/Etc while Fiddler is running and intercepting traffic.*
6. **Important:** Add exclusions to your proxy: In Fiddler, go to Tools->Options->Connections, and add the following into the "Bypass URLs that begin with..." field:
> <-loopback>;discord.com; discordapp.com; netflix.com; *.discord.com; *.discordapp.com; *.netflix.com; *.discordapp.net; discordapp.net; *.google.com; google.com; *.gmail.com; gmail.com; *.youtube.com; *.gstatic.com; *.cloudflare.com; *.googleapis.com; *.jquery.com; *.googlevideo.com; support.neopets.com
7. Download the [neopets folder in this project](https://download-directory.github.io/?url=https://github.com/themrrobert/neopets-flash-fix-windows-10/tree/main/neopets)
8. Find fiddler installation path (usually C:\Users\YOUR_USERNAME\AppData\Local\Programs\Fiddler or C:\Program Files\Fiddler), create a folder named "neopets" and extract the downloaded neopets.zip files into it. The extracted files should end up looking like C:\Users\YOUR_USERNAME\AppData\Local\Programs\Fiddler\neopets\games\...
9. Close Fiddler.
10. Start Fiddler whenever you want to play Neopets games :)

> **Notes:**  
> #5. You can remove this certificate later via Windows Certificate Manager (certmgr.msc->Trusted Root Certification Authorities->Certificates). The name of the certificate is DO_NOT_TRUST so that you're well aware it's a local certificate, and not from a trusted Certificate Authority (CA). It is safe to trust this certificate, BUT the implications are that you will not see any genuine certificate errors from websites, so you should keep Fiddler closed when you're not using it, and you should remove the certificate if you stop playing Neopets games.
>
> Fiddler seems to need "Capture Traffic" enabled in order to work consistently (feel free to experiment). This means it logs every packet that is proxied throuogh it. So while you can watch Youtube on Chrome while running Fiddler, you should clear out the history/restart Fiddler once in a while, otherwise it will start using up all your memory holding a copy of every video packet!

**Setting up Internet Explorer**
1. Open Internet Explorer
2. Open Internet Options
3. Click Security tab and uncheck "Enable Protected Mode"
4. Click on Connections Tab then LAN Settings then Advanced
5. Fill both HTTP and Secure field with
> localhost:8080
6. Under exceptions add
> localhost;127.0.0.1
7. Click Content tab and then chick on Certificates
8. Click Import and select the certificate saved from Fiddler named "FiddlerRoot.cer"
9. Head to https://neopets.com/games/classic.phtml to login
10. Once logged in, open IE menu and click on Compatibility View settings
11. Add "neopets.com" to the list
> NOTE: you will have to remove "neopets.com" from the list every time you login as having compatibility view enabled breaks the new login page. Then add it again once logged in.
12. Close out of Internet Explorer 

**Flash Games:**
0. Remove any existing installed Adobe Flash installations. *If using clean OS install, skip this step. If running less than Windows 10, restart after each removal/installation.*
1. Install [Flash version 32.0.0.363](https://static.centbrowser.com/FlashPlayerStandalone/ppapi_32.0.0.363.exe)
2. That's it! As long as Fiddler is installed and running as directed, you should be able to play nearly all of the [Flash games](https://www.neopets.com/games/category.phtml?sortby=pop)!

**Shockwave Games:**
0. Important! If you are using an nVidia graphics card, you need to follow the 'Bad Driver Bug' direction
1. Ensure all previous Shockwave installations are removed, and Internet Explorer is closed. *If using clean OS install, skip this step. If running less than Windows 10, restart after each removal/installation.*
2. Download and run the [Shockwave installer](http://filehippo.com/en/download_shockwave/1220/) 
3. Start Internet Explorer and try to play a Shockwave wave like [Hannah and the Pirate caves](https://www.neopets.com/games/game.phtml?game_id=473)!
4. See notes below, and Troubleshooting farther  below for resolutions to common issues.
5. **Recommended:** Before you click the "Play" button to load the game, verify: Rules->Shockwave Tweaks->Enabled. themrrobert spent countless hours refining this selection of tweaks to get the best results out of each Shockwave game :)

**Bad Driver Bug**
- See full details here: https://gaming.stackexchange.com/questions/339173/how-can-i-play-dcr-shockwave-games?newreg=534f64e9e2ad4f698d7c1607667a48df

Quick fix:
1. Open run box / start and type regedit and hit enter.
2. Navigate to HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Video
3. Search (Ctrl+F) for InstalledDisplayDrivers
4. Double click InstalledDisplayDrivers and remove all the paths / duplicates.

Example: If your InstalledDisplayDrivers looks like this:
> C:\WINDOWS\System32\DriverStore\FileRepository\nv_dispi.inf_amd64_f840d03a202f8a32\nvldumdx.dll,C:\WINDOWS\System32\DriverStore\FileRepository\nv_dispi.inf_amd64_f840d03a202f8a32\nvldumdx.dll,C:\WINDOWS\System32\DriverStore\FileRepository\nv_dispi.inf_amd64_f840d03a202f8a32\nvldumdx.dll,C:\WINDOWS\System32\DriverStore\FileRepository\nv_dispi.inf_amd64_f840d03a202f8a32\nvldumdx.dll
> C:\WINDOWS\System32\DriverStore\FileRepository\nv_dispi.inf_amd64_f840d03a202f8a32\nvldumd.dll,C:\WINDOWS\System32\DriverStore\FileRepository\nv_dispi.inf_amd64_f840d03a202f8a32\nvldumd.dll,C:\WINDOWS\System32\DriverStore\FileRepository\nv_dispi.inf_amd64_f840d03a202f8a32\nvldumd.dll,C:\WINDOWS\System32\DriverStore\FileRepository\nv_dispi.inf_amd64_f840d03a202f8a32\nvldumd.dll

Change it to:
> nvldumdx.dll  
> nvldumd.dll

You might get this error, just ignore it (it's from not having a blank line after the last entry, I believe):
> Data of type REG_MULTI_SZ cannot contain empty strings.  
> Registry Editor will remove all empty strings found.


**Additional Shockwave Notes:** (See Troubleshooting below if you still have issues)
> When a game does not load/gets stuck at loading, try enabling:
>>Fiddler->Rules->Performance->Simulate Modem Speed
>
> and reload it. (More details in **Troubleshooting** section step #5. You can also try right-clicking in the game area and clicking Restart, and/or reloading the game a few times.
>
> Hannah and the Ice Caves: if you get the "Sorry. It appears that this game is not running at its intended location" error, you need to press and hold **Shift + o + k**. If that doesn't work, try it while it's loading.
>
> If you have gameplay issues/glitches, you can try the [10.1.0.110 installer](https://archive.org/download/ShockwaveInstallers/Shockwave_Installers/Shockwave_Installer_Full_10.1.0.110.exe), but I haven't had any trouble with 10.1.3.018, other than a rare freeze/restart being necessary.
>
> Be patient, sometimes you have to wait for it load a while, or let it continue, or even restart. But it should work 99% of the time once you get it working.
>
> *Make sure you have installed the FiddlerRoot.cer certificate as explained in Fiddler->Notes #4*

# Troubleshooting:

### Troubleshooting Errors / Submitting Scores / Stuck at loading screen:
1. You should try and load a page on Neopets just before you submit your score to try and prevent Stackpath errors.
2. However, if your score fails to submit, you can visit the virtual URL: https://www.neopets.com/fixscore  which will automatically resubmit the score in the browser, solving Stackpath naturally.
3. If you see errcode=17 in the score output result (only visible via the fixscore link, or Fiddler logs), this is caused by the "session ID" being invalid. This can happen if you load up the same game twice, or at approximately Midnight NST, all sessions are cleared. (This prevents scores from being submit much later) 
4. If you don't even SEE a process_xxx_score.phtml packet, and you see a couple oddly-placed zeros instead of the score-submission screen, this seems to be caused by the Flash game being in a bad state. Try next two steps.
5. In Fiddler, if you go to Rules->Performance->Simulate Modem Speeds, and then reload the game with cache disabled then reload the game with Simulate Modem Speeds enabled. This will make the game take a while to load, but it's worth it, because you don't have to reload it constantly and pray that your score will submit when you finally get a good one.
6. If the game fails to load and gets stuck at the loading screen, try step #5, or reloading the game a couple times. Restart the browser if all else fails, especially with Shockwave, we're using old versions which can crash and freeze occasionally.
7. If Hannah and the Ice Caves says, 'Sorry. It appears that this game is not running at its intended location', hold Shift + O + K (in that order) and it should start right up. Make sure you click inside the game window first. (letter O, like OK)
8. If you have issues where the keyboard input isn't working, like in Faerie Bubbles, or Kiko Racing, you are probably running the Flash games in the 32-bit browser. You can fix it on 32-bit mode by adding "ProtectedMode=0" to c:\windows\SysWOW64\Macromed\Flash\mms.cfg and restarting the browser.
9. If you get the sad Usul saying Shockwave is not installed, either 1. You used your own "slim" installer for shockwave.
10. If the game doesn't fit / runs outside the window, this is usually because you're zoomed out. Reset zoom to 100% and reload the game.
11. Terror Mountain Tilt: If you can't distinguish the colors of the rings, try switching to OpenGL or another renderer by right-clicking the game and going to Properties, iirc.
12. If Dice Escape is the only Shockwave game you can't get working, you need to do the "Bad Driver Bug" fix listed above.


# References / Thank you's

1. Thank you to [juvian](https://github.com/juvian/neopets-flash-fix) for the original version of this guide, got themrrobert a good deal of the way there, and themrrobert was only able to make this based off their amazing work with Fiddler.
2. Thank you to andkon.com: their amazing [FAQ](http://andkon.com/arcade/faq.php) is the first resource themrrobert found, which got him going early.
3. [andkon.com](http://andkon.com/arcade/faq.php) also has a "SECURITY CONSCIOUS WALKTHROUGH" on the linked page, which proves the authenticity and source of all provided binaries. (The linked binaries herein come from archive.org's adobe mirror)
