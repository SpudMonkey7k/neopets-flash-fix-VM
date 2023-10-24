## Service Restored
Service has been restored, I have rebuilt the server and migrated all of the translations to the new server.

### 2023-07-30 UPDATE: Server Downtime
The Server where we host the translation mirror is offline because the datacenter has an issue. I'm working to build a new server and migrate everything ASAP.

You can disable the translation mirror in Rules->Advanced->Use Translation Mirror in the meantime.

### 2023-07-28 - Mac Improvements
I have done a lot of work to bring Mac closer to parity with Windows.

There is an option near the top of neopets.py that you can edit, `enable_flash_mall` so you can toggle that to disabled
if you don't wish to use the Flash version of the NC Mall. (Only the Flash version can award the Goggles avatar)

Did you know? The Goggles avatar counts as a +1 on the high scores (but not your userlookup)...  as long as you don't 
also have the 2018 Comic Con avatar for some reason...

Also www.neopets.com/fixscore now works on mac! Needs testing, if you have issues just let me know! .cyr on Discord 

### 2023-07-28 - Inventory Improvements!
Once again TNT fixes something at the same time I do, haha.

Anyway, with Rules->Advanced->Enable Inventory Mods, the follow tweaks are enabled:

1. Using an item / X'ing out of the use-item interface no longer forces a reload.
2. Using an item should remove the item from your inventory. You don't have to guess what's been used!

(Reloading is still necessary to see new items)

### 2023-07-27 - Disable Inventory Stacking/Collapsing! (Obsolete)
Yay! Now you can use the inventory similar to the old days. I'm still working on a better fix, but this should be nice!

~~Rules->Advanced->Disable Inventory Stacking~~

This makes each duplicate item appear in it's own slot, and removes the force-refresh as long as you click the X after you use an item!.

### 2023-07-27 - Downtime
There was a few minutes of downtime which we apologize for. We're working on some new features, and I broke it temporarily.

It should be working again!

### 2023-07-06 - Get the Goggles Avatar!
Today you can now use the Flash version of  the NC Mall and get the Goggles avatar again! 

In Fiddler, Enable: "Rules->Advanced->Flash NC Mall (Goggles Av)"

It's pretty buggy, but you can try on clothes. It's random when you get the Avatar, but in my testing I've got it in 1 - 3 tries.

I _**probably**_ won't be doing any more work to fix the flash version of the mall, since the only useful thing is Goggles, however since the HTML5 version is so bad I **might** keep working on this.  

PS. In addition to CustomRules.js you **_must_** also update/download the [neopets folder in this project](https://download-directory.github.io/?url=https://github.com/themrrobert/neopets-flash-fix-windows-10/tree/main/neopets) and unzip it into your Fiddler installation directory. (C:\Users\USERNAME\AppData\Local\Programs\Fiddler on Windows 10/11, or C:\Program Files\Fiddler\ on previous versions.... possibly "Program Files (x86)" or "Fiddler Classic" just look around until you find it.

It must be unzipped into a 'neopets' folder, so when you're done, the file: INSTALLATION_DIRECTORY\Fiddler\neopets\mall\js\preview.js should exist.

(Replace INSTALLATION_DIRECTORY with your Fiddler installation directory as desribed above, obviously)

### 2023-06-26 - Fix Cookie leak (Neopets bug, not mine)
This fixes an issue where some Neopets responses redirect the browser to insecure (HTTP) pages, which expose your Cookies to anyone listening. This will allow an attacker to bypass your password and 2FA and have full control of your account.

This is obviously very bad, and we avoid it with this patch. (Previous versions were already not affected by this bug because we force all Neopets traffic to use HTTPS in the backend, however this patch will ensure the HTTPS version is loaded which is required by the Flash NC Mall tweak.)

### 2023-06-01 - Korbat's Lab Infinite Level Loading fixed
This bug is caused by, wait for it... Stackpath (of course). This update caches the Korbat's Lab XML config so that Stackpath can't block it.

You will need to update CustomRules.js (as always), but also be sure you download [neopets/process_cms_klab.xml](neopets/process_cms_klab.xml) into your Fiddler\neopets\ directory.


### 2023-05-06 - "Transaction Expired" bug fixed!
Now you will no longer get 'Transaction expired' when you try to buy an item right after you load the shop! This is enabled by default and cannot be disabled, however it only offsets the time by 2 minutes, which means you cannot get tricked into clicking a malicious buy link. 

If living dangerously is your thing... There is ALSO an option in Rules->Advanced->Shop Transactions Never Expire. This does what it says, BUT there is another variable, 'ref_ck' which can change. If that happens you will get, "You've been directed here from the wrong place." You will have to reload the shop in that case, but that variable only changes every several hours or daily.

Also fixed a bug that was preventing "Resubmit (shop wizard searches)" from working on Pale Moon :)

### 2023-05-05 - Easily re-submit failed game scores!
The next best thing to removing the Stackpath problem!

Now, if you send a score, and Stackpath interrupts it, (score fails to send for whatever reason), you can simply go to www.neopets.com/fixscore

This will automatically resubmit the last failed score.

Note: Successfully submiting any new game score will reset the cached score and it will be lost, so be sure to do it right away!

(This cannot be used to send scores multiple times; it only works if Stackpath blocked it, not if it failed for another reason, like after nightly reset, or you had multiple copies of the same game loaded.)

### 2023-04-30 - More Shockwave Tweaks
Enables fine-grained control over which tweaks to use for which game. Speeds up loading of some games that aren't quite as finnicky.
Also prevents caching of the Shockwave game include library, DGS_BIOS.cct

### 2023-04-20 - Gallery Tweak
Re-enables the ability to spam-click 'Upgrade' in the Gallery Edit section.

### 2023-04-19 - Small Updates
Changed the Stackpath handling code to switch to HTTP POST to preserve the Referer header. This prevents those 'You were directed here from the wrong place' or 'You didn't complete the form properly/ enter youor PIN' errors when Stackpath interrupts your request.

### 2023-04-11 Security Update - Important:
I was hoping this would never happen, but unfortunately through an oversight, your neo cookies were sent to my server, 
including your login cookie. I have double-checked, and no cookies were ever saved, and they were always encrypted using SSL, 
so there is nothing to worry about, **but I still recommend that you logout and log back in, which will invalidate your old login cookie**. 

Sorry about this, I will make sure nothing like this happens again.

Note: This only affects users who used a version of the CustomRules from between 2023-03-29 and 2023-04-11, and who had the Translation Mirror Enabled (Formerly "Use Neo Translations" option)

The Translation Mirror is a backend service that I have developed that makes loading Flash+Shockwave games more reliable. Without this, there is a good chance that StackPath (Neopets - "Loading Site" messages that interrupt your activities) will block the Translation, and prevent the game from loading properly. ("Undefined" text and/or the inability to send scores)

If you wish to disable the Translation Mirror, uncheck: Fiddler->Rules->Advanced->Use Translation Mirror.

You can also look at the requests to 'neofixes.com' in the Fiddler log (left-pane) and verify that no private data is being sent to my server.

### 2023-04-05 Update - Block Microsoft Visual Studio Tracking
Have  you ever been waiting for neo to load, only to see in the status bar, 'Waiting for dc.services.visualstudio.com...' ? 

Well now you don't have to wait for Microsoft to respond anymore before the page loads! This has the effect of speeding up the site during times where the Microsoft server would lag.

And it prevents your tracking data from going to Microsoft; win-win!

To enable it, go to Fiddler->Rules->Performance->Skip MSVS Tracking (Faster)

### 2023-04-04 Update - 3dvia needs love, too!
1. 3dvia games should now send full cookies -- This means the 'refresh' trick should work for sending your scores now.
2. 3dvia games should no longer open in a new window AND the original page; this should prevent the hash from being regenerated invalidating one instances' ability to generate a valid score.

### 2023-03-31 Update:
I have added several Shockwave Tweaks to make the Shockwave games much more reliable.
These tweaks rely on the "**Bad Driver Bug**" *(Shown in the Shockwave setup section)* fix to be deployed, so if you haven't done this,
then you will probably want to disable the new tweaks.

They are in "Rules->Shockwave Tweaks," so you can 'Disable', and "Don't Fake Reply," to bring back the previous behavior.

The "Default" works best for me, with 90% chance to succeed on most games, only Attack of the Slorgs gives me the most trouble, sometimes that takes a couple browser restarts and/or reloads, but it's like 35% successfull instead of 1% successful.

### 2023-03-29: README FIRST! Important Update - Translation Mirror!

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
