# Play Flash, Shockwave, and 3dvia Neopets games on Windows 10 and Windows 11! Works in 2022 / 2023

## 2023-03-29: README FIRST! Important Update - Translation Mirror!

*tl;dr: If you have Neopets premium, and especially are using a non-english language for the games, please enable all 3 "Advanced" options in the Rules toolbar.*

We are pleased to give you an amazing new feature! This will prevent Stackpath from interfering with your game loading. No more "undefined" instead of the game text!

The way this works is, it redirects the request for the translations to a mirror, which will never respond with a stack path interruption!

If you encounter a language/game combo that doesn't work, you should hear a 'Ding' accompanied by an Alert popup. (Sometimes this popup is hidden, and you have to hover over the Fiddler task bar menu and select the pop up)

The options to control this are in Rules->Advanced.
- "Use Neopets Translations" will make it load translations from Neopets (the old way)
- "Auto Upload Translations" this will upload the translations automatically as you play the games. (So you can help complete the Database!)
- "Has Neopets Premium." - This option disables the "Cannot load player config" fix, because Premium members aren't affected by it. Only enable this if you have Premium!

**We need people from different languages to use the *Auto Upload Translations* option!**

We believe we have all the English language translations mirrored, so if you're on English, you don't have to do anything!

Note: There is also an option in Rules->Advanced->


### Preface:
This guide is confirmed to work on Windows 10 and 11. The steps SHOULD work on Windows 7/8, also, but some things might be different, like installation paths.

This guide is overly detailed to make it approachable, so  don't be put off by all the steps. It should be as easy to follow as possible. Some computer knowledge will definitely help.

***Please read this entire guide before starting.*** You don't need to memorize it, but some information later on will definitely prove useful during installation, and there is no way to order everything perfectly for all use cases.

### Disclaimer:

Flash and Shockwave are dead content. Do not use flash/shockwave enabled browsers for anything other than Neopets (or other trusted flash game sites). Even then not I, nor anyone else can guarantee your safety using these extensions, so do so at your own risk!

### Fiddler - Required for all games

You must install Fiddler Classic. This is because Neopets forces SSL (HTTPS) now, and the games were never updated to support SSL/HTTPS. There are also some other game-specific issues that Fiddler allows us to fix.

Fiddler, as configured, will act as a Man-in-the-middle (which is a good thing in this case, because YOU are the man-in-the-middle), which allows your browser to connect to Fiddler over HTTP, and then Fiddler bridges the connection to Neopets over HTTPS.

This is absolutely required in order to play nearly all Flash/Shockwave/3dvia games, and is the most complicated part of the installation, but if you follow the steps as described, you will be okay! I will try to respond to Issues submitted to this repository for the short term, and update the guide accordingly.

**Installation Instructions:**
1. Install [Fiddler Classic](https://www.telerik.com/download/fiddler) (**NOT** "Fiddler Everywhere") There is no email confirmation, so just put in a fake email.
2. Find fiddler script folder (usually Documents\Fiddler2\Scripts) and save [CustomRules.js](/fiddler/CustomRules.js) to that directory. Alternatively, you can copy/paste the file contents into Fiddler->Rules->Customize rules (erase everything in there first), and hit Ctrl+S to save. You should hear a slight ding.
3. In Fiddler go to Tools -> Options -> HTTPS.
> **Enable:**
> - Capture HTTPS CONNECTs
> - Decrypt HTTPS Traffic
> - Ignore Server Certificate Errors.
> 4. Click Actions->Export Root Certificate to Desktop (This is to make Pale Moon trust the localhost and not give you constant certificate errors)
> 5. Click Actions->Trust Root Certificate. This will make other browsers (like Chrome), and Windows apps such as Discord, also trust the proxy (Fiddler). *This isn't strictly necessary, but if it's not done, you won't be able to use Chrome/Discord/Etc while Fiddler is running and intercepting traffic.*
> 6. To install this certificate into Pale Moon, simply click "Pale Moon" at the top left (menu bar), and click Preferences. Then go to the "Advanced" tab, and then choose the "Certificates" sub-tab. Click "View Certificates" then click "Import" and locate the exported certificate on your desktop. It is named "FiddlerRoot.cer"
7. **Important:** Add exclusions to your proxy: In Fiddler, go to Tools->Options->Connections, and add the following into the "Bypass URLs that begin with..." field:
> <-loopback>;discord.com; discordapp.com; netflix.com; *.discord.com; *.discordapp.com; *.netflix.com; *.discordapp.net; discordapp.net; *.google.com; google.com; *.gmail.com; gmail.com; *.youtube.com; *.gstatic.com; *.cloudflare.com; *.googleapis.com; *.jquery.com; *.googlevideo.com; support.neopets.com
8. Download the [neopets folder in this project](https://download-directory.github.io/?url=https://github.com/themrrobert/neopets-flash-fix-windows-10/tree/main/neopets)
9. Find fiddler installation path (usually C:\Users\YOUR_USERNAME\AppData\Local\Programs\Fiddler or C:\Program Files\Fiddler), create a folder named "neopets" and extract the downloaded neopets.zip files into it. Extract files should end up looking like C:\Users\YOUR_USERNAME\AppData\Local\Programs\Fiddler\neopets\games\...
10. Close Fiddler.
11. Start Fiddler whenever you want to play Neopets games :)

> **Notes:**  
> #5. You can remove this certificate later via Windows Certificate Manager (certmgr.msc->Trusted Root Certification Authorities->Certificates). The name of the certificate is DO_NOT_TRUST so that you're well aware it's a local certificate, and not from a trusted Certificate Authority (CA). It is safe to trust this certificate, BUT the implications are that you will not see any genuine certificate errors from websites, so you should keep Fiddler closed when you're not using it, and you should remove the certificate if you stop playing Neopets games.
>
> Fiddler seems to need "Capture Traffic" enabled in order to work consistently (feel free to experiment). This means it logs every packet that is proxied throuogh it. So while you can watch Youtube on Chrome while running Fiddler, you should clear out the history/restart Fiddler once in a while, otherwise it will start using up all your memory holding a copy of every video packet!


### Flash Games: (64-bit Pale Moon)
0. Remove any existing installed Adobe Flash installations. *If running less than Windows 10, restart after each removal/installation.*
1. Browser: Install [Pale Moon 64-bit latest](https://www.palemoon.org/download.php?mirror=us&bits=64&type=installer) (31.4.2 at time of writing, so use that version if you have issues)
2. Install Flash version 32.0.0.371 [Download Flash Installer](https://web.archive.org/web/2020*/http://fpdownload.adobe.com/get/flashplayer/pdc/32.0.0.371/install_flash_player.exe) from Archive.org's Adobe Mirror | [Alternate Link](https://web.archive.org/web/20200523210841/http://fpdownload.adobe.com/get/flashplayer/pdc/32.0.0.371/install_flash_player.exe)
3. Disable Auto Update for Pale Moon
4. That's it! As long as Fiddler is installed and running as directed, you should be able to play nearly all of the [Flash games](https://www.neopets.com/games/category.phtml?sortby=pop)!

*Make sure you have installed the FiddlerRoot.cer certificate as explained in Fiddler->Notes #4*

### 3dvia games (32-bit Pale Moon)
1. Browser: Install Pale Moon 32-bit, version 28, if not already installed. [Download](https://archive.palemoon.org/palemoon/28.x/28.17.0/palemoon-28.17.0.win32.installer.exe)
2. Disable Auto Update for Pale Moon
3. Ensure Fiddler is configured and running, and then try to play a 3dvia game, like Shenku River Rush (just River Rush in the game list)
4. This should automatically launch the installer the first time
5. Enjoy!

> **Notes:**  
> *Make sure you have installed the FiddlerRoot.cer certificate as explained in Fiddler->Notes #4*
>
> You can install both 64-bit and 32-bit versions at the same time, but the one you install second will overwrite the shortcut, so you should create a new shortcut to the first installation.
>
> When you want to switch game-platforms, just close Pale Moon, and start the other version.

### Shockwave Games: (32-bit Pale Moon)
0. Important! You need to follow the 'Bad Driver Bug' direction
1. Browser: Install Pale Moon 32-bit, version 28, if not already installed. [Download](https://archive.palemoon.org/palemoon/28.x/28.17.0/palemoon-28.17.0.win32.installer.exe)
2. Disable Auto Update for Pale Moon
3. Ensure all previous Shockwave installations are removed, and Pale Moon is closed.
4. Ensure Pale Moon is closed, and then run the Shockwave installer. [Download Shockwave 10.1.3.018 from Archive.org](https://archive.org/download/ShockwaveInstallers/Shockwave_Installers/Shockwave_Installer_Full_10.1.3.018.exe)
5. **Important!** Before starting Pale Moon again, you must copy "C:\Program Files (x86)\Pale Moon\plugins\"
   From "C:\Program Files (x86)\Pale Moon\plugins\", copy both "ShockwavePlugin.class" and "np32dsw.dll" and paste them into your "%appdata%\Moonchild Productions\Pale Moon\Profiles\RANDOM_NAME.default\" directory. RANDOM_NAME will be different for you, but you can put "%appdata%\Moonchild Productions\Pale Moon\Profiles\" into the Run box (without quotes) and it should open up the directory containing your profile folder. Just copy the plugins directory into your profile folder, and then you're good to go!
6. Start Pale Moon (32-bit version) and try to play a Shockwave wave like Hannah and the Pirate caves!
7. See notes below, and Troubleshooting farther  below for resolutions to common issues.
8. **Recommended:** Before you click the "Play" button to load the game, go to Fiddler->Rules->Performance->Simulate Modem Speeds, and then load the game. This helps avoid a lot of headache. You can disable the option after the game loads.

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

You might get this error, just ignore it:
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
2. However, if your score fails to submit, you can look in the recent packets of Fiddler for process_(flash or shockwave)_score.phtml. Double click it, and click 'Decode response' If you see a bunch of HTML instead of a simple bit of encoded text, then you can likely still submit your score by right-clicking the packet on the left-side of Fiddler, and click Copy->Just URL, then pasting this into your browser. You should hopefully see "success=1" as part of the result message.
3. If you see errcode=17, I have no idea what causes this, but there is no way to save your score as far as I know. I know it can happen if the game is started before 12AM NST and you try to submit the score after 12AM, but it can also happen in the middle of the day, so who knows.
4. If you don't even SEE a process_xxx_score.phtml packet, and you see a couple oddly-placed zeros instead of the score-submission screen, this seems to be caused by the Flash game being in a bad state. Try next two steps.
5. In Fiddler, if you go to Rules->Performance->Simulate Modem Speeds, and then reload the game with cache disabled (open Pale Moon's Inspect Element tool inside the game window (try the outside edges outside the game area), click the Settings/Gear icon in the top-right of the Inspect window, and then enable "Disable HTTP Cache (when toolbox is open)", then reload the game with the Inspect window open and Simulate Modem Speeds enabled. This will make the game take a while to load, but it's worth it, because you don't have to reload it constantly and pray that your score will submit when you finally get a good one.
6. If the game fails to load and gets stuck at the loading screen, try step #5, or reloading the game a couple times. Restart the browser if all else fails, especially with Shockwave, we're using old versions which can crash and freeze occasionally.
7. If 3dvia games are the ones not working, go [here](https://3dlifeplayer.dl.3dvia.com/player/install/3DLifePlayer.js) and accept risk if prompted. (It probably means you didn't install/trust the certificate in the Fiddler instructions)
8. If Hannah and the Ice Caves says, 'Sorry. It appears that this game is not running at its intended location', hold Shift + O + K (in that order) and it should start right up. Make sure you click inside the game window first. (letter O, like OK)
9. If you start running out of memory, it's probably because you let Fiddler run too long while watching Youtube / streaming. Restart Fiddler and you should be fine.
10. If you have issues where the keyboard input isn't working, like in Faerie Bubbles, or Kiko Racing, you are probably running the Flash games in the 32-bit browser. Close Pale Moon, and restart it from the 64-bit installation.
11. If you get the sad Usul saying Shockwave is not installed, either 1. You used your own "slim" installer for shockwave, or 2. You didn't copy the plugins directory to your user profile.
12. If the game doesn't fit / runs outside the window, this is usually because you're zoomed out. Reset zoom to 100% and reload the game.
13. Terror Mountain Tilt: If you can't distinguish the colors of the rings, try switching to OpenGL or another renderer by right-clicking the game and going to Properties, iirc.

### Pale Moon default installation locations:

1. Pale Moon 64-bit default location: c:\Program Files\Pale Moon\palemoon.exe
2. Pale Moon 32-bit default location: c:\Program Files (x86)\Pale Moon\palemoon.exe

# References / Thank you's

1. Thank you to [juvian](https://github.com/juvian/neopets-flash-fix) for the original version of this guide, got me a good deal of the way there, and I was only able to make this based off their amazing work with Fiddler.
2. Thank you to andkon.com: their amazing [FAQ](http://andkon.com/arcade/faq.php) is the first resource I found, which got me going early.
3. [andkon.com](http://andkon.com/arcade/faq.php) also has a "SECURITY CONSCIOUS WALKTHROUGH" on the linked page, which proves the authenticity and source of all provided binaries. (The linked binaries herein come from archive.org's adobe mirror)
