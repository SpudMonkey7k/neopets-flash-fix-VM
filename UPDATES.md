## 2023-06-26 - Fix Cookie leak
This fixes an issue where some Neopets responses redirect the browser to insecure (HTTP) pages, which expose your Cookies to anyone listening. This will allow an attacker to bypass your password and 2FA and have full control of your account.

This is obviously very bad, and we avoid it with this patch. (If you use previous version, you are still not vulnerable to this, because we always force HTTPS on neopets when fiddler is running, however, this patch will still prevent the page from loading the HTTP version.)

## 2023-06-01 - Korbat's Lab Infinite Level Loading fixed
This bug is caused by, wait for it... Stackpath (of course). This update caches the Korbat's Lab XML config so that Stackpath can't block it.

You will need to update CustomRules.js (as always), but also be sure you download [neopets/process_cms_klab.xml](neopets/process_cms_klab.xml) into your Fiddler\neopets\ directory.

### 2023-05-22 - You can get Skarl Collectible Charm again!
So basically, the old-interface version of King Skarl can still give the Charm according to neo_truths. However, the old-interface version is broken... try it yourself, https://www.neopets.com/medieval/grumpyking.phtml/old

This update fixes that bug, automatically using the Old Version when you visit King Skarl... It will pre-populate the Avatar question and a random answer so you don't have to choose everytime. (Old version doesn't save previous question)

The odds of getting the Charm are still very very low, so you probably won't get it... but at least it's possible! (Roughly 1 in 2000 chance per Hysterics if my understanding of neo_truths post is correct)

Note: This can be disabled in Rules->Advanced->Use Old Skarl, but why would you want to? :D

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
