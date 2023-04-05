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
