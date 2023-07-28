import os
import re
from pathlib import Path
from typing import Optional

from mitmproxy import ctx, http
from mitmproxy.http import Headers
from mitmproxy.addonmanager import Loader

saved_cookies: Optional[Headers] = None
saved_score_url: Optional[str] = None
saved_score_result: Optional[str] = None

# User settings: Only change these values:
enable_flash_mall: bool = true # Change to false to go back to the html5 mall preview.
#End User settings, leave everything else alone!

FILES_DIR = str(Path(__file__).parent)


def load(loader: Loader) -> None:
    ctx.options.http2 = False


def request(flow: http.HTTPFlow) -> None:
    url = flow.request.pretty_url
    if "neopets.com" in flow.request.host:

        # use the translation mirror to minimize stackpath errors:
        if "transcontent/gettranslationxml.phtml" in url:
            flow.request.host = "www.neofixes.com"
            flow.request.headers["host"] = "www.neofixes.com"
            if "cookie" in flow.request.headers:
                del flow.request.headers["cookie"]
            if flow.request.urlencoded_form and flow.request.method == "POST":
                flow.request.urlencoded_form["lang"] = "en"
            else:
                flow.request.query["lang"] = "en"

        # fixes games pointing to dev server that have chinese lang when offline
        if "gettranslationxml.phtml" in url and flow.request.method == "POST" and "lang" in flow.request.urlencoded_form:
            flow.request.urlencoded_form["lang"] = "en"

        # Inject file overrides:
        if not url.endswith(".png") and not url.endswith(".gif") and not url.endswith(".jpg"):
            p = flow.request.path.split('?')[0].replace('/', os.sep)
            if "process_cms.phtml" in url:
                if ("item_id" in flow.request.urlencoded_form and flow.request.urlencoded_form["item_id"] == "64") or "item_id=64" in url:
                    p = os.sep + "process_cms_klab.xml"
            for path in [Path(FILES_DIR + os.sep + "neopets" + p), Path(str(Path(__file__).resolve()).split("mitmproxy")[0] + os.sep + "neopets" + p)]:
                if path.is_file():
                    if p.endswith(".xml"):
                        flow.response = http.Response.make(200, open(path, "rb").read(), Headers([(b"type", b"text/xml")]))
                    else:
                        flow.response = http.Response.make(200, open(path, "rb").read())


def requestheaders(flow: http.HTTPFlow) -> None:
    global saved_cookies
    global saved_score_url, saved_score_result
    url = flow.request.pretty_url
    if "neopets.com" in flow.request.host:
        flow.request.scheme = "https"
        flow.request.port = 443

        # Implement /fixscore
        if url.endswith("/fixscore"):
            if saved_score_url:
                flow.response = http.Response.make(302, b"", Headers([(b"location", bytes('utf-8', saved_score_url))]))
            else:
                sad_response = b"If you submitted a score, it wasn't blocked by Stackpath, so we cannot" \
                               + b"re-submit it. It is gone, sorry. Reload the game before you try again!"
                if saved_score_result:
                    sad_response += \
                        b"<br /><br />(Technical details) Your last score submission's result was:<br /><pre>" \
                        + bytes('utf-8', saved_score_result) + b"</pre>"
                flow.response = http.Response.make(200, sad_response)

        # prevent big (and useless) stackpath garbage from crashing shockwave:
        if "dgs_get_game_data.phtml" in url:
            if "x-sp-metadata" in flow.request.headers:
                del flow.request.headers['x-sp-metadata']
            if "x-hw" in flow.request.headers:
                del flow.request.headers['x-hw']

        # old king skarl
        if flow.request.url.endswith('medieval/grumpyking.phtml'):
            flow.request.url = flow.request.url + '/'

        # Fix potato counter because it doesn't use images. for some reason
        if "games/g226/config.xml" in url:
            flow.request.host = "images.neopets.com"
            flow.request.headers["host"] = "images.neopets.com"

        if flow.request.host == "dev.neopets.com":
            flow.request.host = "www.neopets.com"
            # try to fix cookies not sent to dev to bypass stackpath
            if saved_cookies:
                flow.request.headers["cookie"] = saved_cookies
        elif flow.request.host == "www.neopets.com":
            saved_cookies = flow.request.headers["cookie"]

        # fixes Clara on Ice, Let it Slide, Extreme Potato Counter
        if ".swf" in url or "/config.xml" in url or "/shellconfig.xml" in url:
            flow.request.host = "images.neopets.com"
            flow.request.url = re.sub(r"/games/.*/games/", "/games/", flow.request.url).replace("games/games", "games")

        # not sure if 3dvia uses the same virtual web server, but if it does, we need this:
        if flow.request.headers["user-agent"] == 'Virtools Webserver Manager':
            if saved_cookies:
                flow.request.headers["cookie"] = saved_cookies

        # fixes 3dvia games like Terror Mountain Tilt
        if "virtools.download.akamai.com/6712/player/install/" in url:
            flow.request.url = "https://3dlifeplayer.dl.3dvia.com/" + url[url.rindex("player/install"):]

        # fixes kacheek seek
        if "process_hideandseek.phtml" in url:
            flow.request.headers["referer"] = "http://www.neopets.com/games/hidenseek"


def response(flow: http.HTTPFlow) -> None:
    global saved_score_url, saved_score_result
    url = flow.request.pretty_url
    if "neopets.com" in flow.request.host and flow.response is not None and flow.response.content is not None:
        # fixes shockwave games
        if "play_shockwave.phtml" in url and b"game_container" in flow.response.content:
            flow.response.content = flow.response.content.replace(b"document.write", b"console.log").replace(
                b"swRestart='false'", b"swRestart='true'").replace(b"swContextMenu='false'", b"swContextMenu='true'")

        # fixes neohome v2
        if "neohome/property/" in url:
            flow.response.content = flow.response.content.replace(b"services.neopets", b"www.neopets").replace(
                b"http%3A", b"https%3A")

        if "grumpyking.phtml" in url:
            flow.response.content = flow.response.content.replace(b'</script>', b'function randomizeAnswer(){for(var e=1;e<=8;e++){var n=document.getElementById("ap"+e),o=Math.floor(Math.random()*(n.getElementsByTagName("option").length-1))+1;n.selectedIndex=o}}function randomizeQuestion(){for(var e=1;e<=10;e++){var n=document.getElementById("ap"+e),o=Math.floor(Math.random()*(n.getElementsByTagName("option").length-1))+1;n.selectedIndex=o}}document.addEventListener("DOMContentLoaded",function(){randomizeQuestion(),randomizeAnswer()},!1);</script>', 1)

        if "process_flash_score" in url or "process_shockwave_score" in url:
            if "success=" not in flow.response.content:
                # This means the score was blocked by stackpath
                saved_score_url = url
                saved_score_result = None
            else:
                # This means the score reached neopets, but may have been rejected for another reason
                saved_score_url = None
                saved_score_result = flow.response.content

        # Enable flash preview for Goggles avatar. Relies on the neopets overrides folder also.
        if enable_flash_mall and "/mall/pet_preview_h5.phtml" in url:
            flow.response.content = flow.response.content.replace('pet_preview_h5.phtml', 'pet_preview.phtml')
