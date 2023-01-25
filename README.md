# This guide is for Windows 10 only. The steps SHOULD work on Windows 7/8, and MIGHT work on Windows 11.

### Fiddler - Required for all games

You must install Fiddler Classic. This is because Neopets forces SSL now, and the games were never updated to support SSL. There are also some other game-specific issues that Fiddler allows us to fix.

Fiddler, as configured, will act as a Man-in-the-middle (which is a good thing in this case, because YOU are the man-in-the-middle), which allows your browser to connect to Fiddler over HTTP, and then Fiddler bridges the connection to Neopets over HTTPS.

This is absolutely required in order to play nearly all Flash/Shockwave/3dvia games, and is the most complicated part of the installation, but if you follow the steps as described, you will be okay! I will try to respond to Issues submitted to this repository for the short term, and update the guide accordingly.

*Installation Instructions:*
1. Install [Fiddler Classic](https://www.telerik.com/download/fiddler)
2. Find fiddler script folder (usually Documents\Fiddler2\Scripts) and replace/add [CustomRules.js](/fiddler/CustomRules.js). Another option is in Fiddler, press Ctrl+R to edit the live rules, overwrite the content with my file, and Ctrl+S to save. You should hear a slight ding.
3. In Fiddler go to Tools -> Options -> HTTPS. Enable Capture HTTPS CONNECTs, Decrypt HTTPS Traffic, and Ignore Server Certificate Errors. 
4. Click Actions->Export Root Certificate to Desktop (This is to make Pale Moon trust the localhost and not give you constant certificate errors)
5. (Optional) Click Actions->Trust Root Certificate. This will make other browsers (like Chrome), and Windows apps such as Discord, also trust the proxy (Fiddler). *This isn't necessary, but if it's not done, you won't be able to use Chrome/Discord/Etc while Fiddler is running and intercepting traffic.*
6. Download the [neopets folder in this project](https://download-directory.github.io/?url=https://github.com/themrrobert/neopets-flash-fix-windows-10/tree/main/neopets)
7. Find fiddler installation path (usually C:\Program Files\Fiddler), create a folder named "neopets" and extrat the downloaded neopets.zip files into it. Extract files should end up looking like C:\Program Files\Fiddler\neopets\games\...
8. Close Fiddler. 
9. Start Fiddler whenever you want to play Neopets games :)

*Notes:*
#4. To install this certificate into Pale Moon, simply click "Pale Moon" at the top left (menu bar), and click Preferences. Then go to the "Advanced" tab, and then choose the "Certificates" sub-tab. Click "View Certificates" then click "Import" and locate the exported certificate on your desktop. It is named "FiddlerRoot.cer"

#5. You can remove this certificate later via Windows Certificate Manager (certmgr.msc->Trusted Root Certification Authorities->Certificates). The name of the certificate is DO_NOT_TRUST so that you're well aware it's a local certificate, and not from a trusted Certificate Authority (CA). It is safe to trust this certificate, BUT the implications are that you will not see any genuine certificate errors from websites, so you should keep Fiddler closed when you're not using it, and you should remove the certificate if you stop playing Neopets games.

Fiddler seems to need "Capture Traffic" enabled in order to work consistently (feel free to experiment). This means it logs every packet that is proxied throuogh it. So while you can watch Youtube on Chrome while running Fiddler, you should clear out the history/restart Fiddler once in a while, otherwise it will start using up all your memory holding a copy of every video packet!


### Flash Games: (64-bit Pale Moon)
0. Remove any existing installed Adobe Flash installations. *If running less than Windows 10, restart after each removal/installation.*
1. Browser: Install [Pale Moon 64-bit latest](https://www.palemoon.org/download.php?mirror=us&bits=64&type=installer) (31.4.2 at time of writing, so use that version if you have issues)
2. Install Flash version 32.0.0.371 [Download Flash Installer from Archive.org's Adobe Mirror](https://web.archive.org/web/2020*/http://fpdownload.adobe.com/get/flashplayer/pdc/32.0.0.371/install_flash_player.exe)
3. That's it! As long as Fiddler is installed and running as directed, you should be able to play nearly all of the [Flash games](https://www.neopets.com/games/category.phtml?sortby=pop)!

### 3dvia games (32-bit Pale Moon)
1. Browser: Install Pale Moon 32-bit, version 28. [Download](https://archive.palemoon.org/palemoon/28.x/28.17.0/palemoon-28.17.0.win32.installer.exe)
2. Ensure Fiddler is configured and running, and then try to play a 3dvia game, like Shenku River Rush (just River Rush in the game list)
3. This should automatically launch the installer the first time
4. Enjoy!

*Notes:*
You can try installing Pale Moon portable 32-bit, but I won't help you with any installation differences. I don't have any issues with both 32-bit and 64-bit different versions of Pale Moon installed, you just can't run both at the same time. You will have to make a custom shortcut for the older install, because the secondly installed Pale Moon will overwrite the shortcut in Start Menu/Desktop.

So just close pale moon, and start the other version when you want to switch game-types.

### Shockwave Games: (32-bit Pale Moon)
1. Browser: Install Pale Moon 32-bit, version 28, if not already installed. [Download](https://archive.palemoon.org/palemoon/28.x/28.17.0/palemoon-28.17.0.win32.installer.exe)
2. Ensure all previous Shockwave installations are removed, and Pale Moon is closed.
3. Ensure Pale Moon is closed, and then run the Shockwave installer. [Download Shockwave 10.1.3.018 from Archive.org](https://archive.org/download/ShockwaveInstallers/Shockwave_Installers/Shockwave_Installer_Full_10.1.3.018.exe)
4. *Important!* Before starting Pale Moon again, you must copy "C:\Program Files (x86)\Pale Moon\plugins\"
From "C:\Program Files (x86)\Pale Moon\plugins\", copy both "ShockwavePlugin.class" and "np32dsw.dll" and paste them into your "%appdata%\Moonchild Productions\Pale Moon\Profiles\RANDOM_NAME.default\" directory. RANDOM_NAME will be different for you, but you can put "%appdata%\Moonchild Productions\Pale Moon\Profiles\" into the Run box (without quotes) and it should open up the directory containing your profile folder. Just copy the plugins directory into your profile folder, and then you're good to go!
5. Start Pale Moon (32-bit version) and try to play a Shockwave wave like Hannah and the Pirate caves!
6. See notes below, and Troubleshooting farther  below for resolutions to common issues.

*Quick notes:* (See Troubleshooting below if you still have issues)
When a game does not load/gets stuck at loading, try Fiddler->Rules->Performance->Simulate Modem Speed, and reload it. (More details in *Troubleshooting* section step #5. You can also try right clicking on it and hitting restart, and/or reloading the game a few times.

Hannah and the Ice Caves: if you get the "Sorry. It appears that this game is not running at its intended location" error, you need to press + hold Shift + o + k. If that doesn't work, try it while it's loading.

If you have issues, you can try the [10.1.0.010 installer](https://archive.org/download/ShockwaveInstallers/Shockwave_Installers/Shockwave_Installer_Full_10.1.0.110.exe), but I haven't had any trouble with 10.1.3.018, other than a rare freeze/restart being necessary.

It must be the FULL installer, otherwise you will get the error saying you don't have Shockwave installed.

Be patient, sometimes you have to wait for it load a while, or let it continue, or even restart. But it should work 99% of the time once you get it working.

# Troubleshooting:

### Notes for All games: Troubleshooting Errors / Submitting Scores / Stuck at loading screen:
1. You should try and load a page on Neopets just before you submit your score to try and prevent Stackpath errors.
2. However, if your score fails to submit, you can look in the recent packets of Fiddler for process_(flash or shockwave)_score.phtml. Double click it, and click 'Decode response' If you see a bunch of HTML instead of a simple bit of encoded text, then you can likely still submit your score by right-clicking the packet on the left-side of Fiddler, and click Copy->Just URL, then pasting this into your browser. You should hopefully see "success=1" as part of the result message.
3. If you see errcode=17, I have no idea what causes this, but there is no way to save your score as far as I know. I know it can happen if the game is started before 12AM NST and you try to submit the score after 12AM, but it can also happen in the middle of the day, so who knows.
4. If you don't even SEE a process_xxx_score.phtml packet, and you see a couple oddly-placed zeros instead of the score-submission screen, this seems to be caused by the Flash game being in a bad state. Try next two steps.
5. In Fiddler, if you go to Rules->Performance->Simulate Modem Speeds, and then reload the game with cache disabled (open Pale Moon's Inspect Element tool inside the game window (try the outside edges outside the game area), click the Settings/Gear icon in the top-right of the Inspect window, and then enable "Disable HTTP Cache (when toolbox is open)", then reload the game with the Inspect window open and Simulate Modem Speeds enabled. This will make the game take a while to load, but it's worth it, because you don't have to reload it constantly and pray that your score will submit when you finally get a good one.
6. If the game fails to load and gets stuck at the loading screen, try step #5, or reloading the game a couple times. Restart the browser if all else fails, especially with Shockwave, we're using old versions which can crash and freeze occasionally.
7. If 3dvia games are the ones not working, go [here](https://3dlifeplayer.dl.3dvia.com/player/install/3DLifePlayer.js) and accept risk if prompted. (It probably means you didn't install/trust the certificate in the Fiddler instructions)
8. If Hannah and the Ice Caves says, 'Cannot be run from this location', hold Shift + O + K (in that order) and it should start right up. Make sure you click inside the game window first. (letter O, like OK)
9. If you start running out of memory, it's probably because you let Fiddler run too long while watching Youtube / streaming. Restart Fiddler and you should be fine.
10. If you have issues where the keyboard input isn't working, like in Faerie Bubbles, or Kiko Racing, you are probably running the Flash games in the 32-bit browser. Close Pale Moon, and restart it from the 64-bit installation.

Pale Moon 64-bit default location: c:\Program Files\Pale Moon\palemoon.exe
Pale Moon 32-bit default location: c:\Program Files (x86)\Pale Moon\palemoon.exe

# References / Thank yous

1. Thank you to juvian for the original version of this guide, got me a good deal of the way there, and I was only able to make this based off their amazing work with Fiddler.
2. Thank you to andkon.com, their amazing [FAQ](http://andkon.com/arcade/faq.php) is the first resource I found, which got me going early.
3. [andkon.com](http://andkon.com/arcade/faq.php) also has a "SECURITY CONSCIOUS WALKTHROUGH" on the linked page, which proves the authenticity and source of all provided binaries. (The linked binaries herein come from archive.org's adobe mirror)





