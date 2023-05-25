# Mac Instructions

#### May be incomplete / missing features
#### I know it works for Intel Macs, not sure about anything else


## Install mitmproxy
This is required to bridge the gap between HTTP and HTTPS for the Neopets games. This replaces Fiddler in the Windows guide.

1. Option A: `$ sudo brew install mitmproxy` (Run in a Terminal, don't type the `$`, that just repressents the prompt.) This will take a long time as it has to compile everything you need from scratch, especially Rust takes a long time.
2. Option B: Download and install binaries from https://mitmproxy.org/

### Configure mitmproxy:
1. Download the [neopets folder in this project](https://download-directory.github.io/?url=https://github.com/themrrobert/neopets-flash-fix-windows-10/tree/main/neopets)
2. Extract the contents of the .zip file into `/usr/local/bin/neopets/` (You will have to create the neopets directory) You can verify the correct directory by running the command `$ which mitmdump` at the terminal (ignore the trailing `mitmdump` in the response).
3. Download [neopets.py](mitmproxy/neopets.py) and save it somewhere easy to find. (Like the Desktop)
4. Start mitmproxy (you will have to do this anytime you want to play the flash games, or use the other neofixes)
5. `$ sudo mitmdump -s Desktop/neopets.py`  (Change Desktop/neopets.py to wherever you saved it)
6. This will generate the certificates also, which is needed for the Pale Moon setup.

To stop the proxy, with the terminal active, press [Ctrl]+C 

You will need the proxy running whenever you want the play the games / use the neofixes, so maybe make a shortcut for step 5.

## Install Pale Moon (Web Browser)
1. Download the appropriate version here: https://www.palemoon.org/download.shtml
2. Install the software
3. You will use this browser exclusively to play Neopets + the Neopets games. 
4. **It is not safe to do general web-surfing with a Flash-enabled browser.**

### Configure Pale Moon
3. Open Pale Moon, and go to Settings->Advanced->Network->Connection->Settings
4. Choose `Manual proxy configuration`
5. HTTP proxy: `localhost` Port: `8080`
6. SSL proxy: `localhost` Port: `8080`
7. In the `No proxy for` box, put this:
> localhost, *.local, 169.254/16, discord.com, discordapp.com, netflix.com, *.discord.com, *.discordapp.com, *.netflix.com, *.discordapp.net, discordapp.net, *.google.com, google.com, *.gmail.com, gmail.com, *.youtube.com, *.gstatic.com, *.cloudflare.com, *.googleapis.com, *.jquery.com, *.googlevideo.com, support.neopets.com, *.akamaihd.net, *.jquery.com, 127.0.0.1, *.googlevideo.com, *.openai.com, support.neopets.com, *.paypal.com, *.nflxvideo.net, *.icloud.com
8. Click OK to save

### Import the certificate for SSL:
1. Go back into the Pale Moon settings/preferences.
2. Navigate to the 'Advanced' section, and click the 'Certificates' tab.
3. Click 'View Certificates'
4. Click 'Import' and find the certificate located at `~/.mitmproxy/mitmproxy-ca-cert.cer` 
5. (.mitmproxy is a hidden directory located in your /Users/yourusername/ directory, so you may want to try using the full path above to find it)
6. Click OK and exit
 
## Install Flash
1. Download the Flash package here: https://archive.org/compress/flashplayer_old/formats=MAC%20OS%20X%20DISK%20IMAGE&file=/flashplayer_old.zip
2. There's 4 different versions in there, my guess is you should use this one, but you may know better: `flashplayer32_0r0_371_mac.dmg`

#### Congratulations! You can now enjoy the Flash games again and take advantage of the additional Neofixes developed here.

This should also fix the problems with Shockwave + 3dvia games, however I don't know what combination of software/versions you will need. 

### Please send me anything you learn! 

## Shockwave / 3dvia
This requires a 32-bit browser, I'm not sure how to get Shockwave/3dVia working on a 64-bit mac.

You could try 'Classic Waterfox' for mac, or maybe Pale Moon can work, idk. Please give me any feedback you have regarding getting Shockwave/3dVia games working!

### Known issues:

Please report any issues as I don't have a mac.