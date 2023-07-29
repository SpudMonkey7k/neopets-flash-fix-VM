import System;
import System.Windows.Forms;
import Fiddler;

// INTRODUCTION
//
// Well, hello there!
//
// Don't be scared! :-)
//
// This is the FiddlerScript Rules file, which creates some of the menu commands and
// other features of Progress Telerik Fiddler Classic. You can edit this file to modify or add new commands.
//
// The original version of this file is named SampleRules.js and it is in the
// \Program Files\Fiddler\ folder. When Fiddler Classic first runs, it creates a copy named
// CustomRules.js inside your \Documents\Fiddler2\Scripts folder. If you make a 
// mistake in editing this file, simply delete the CustomRules.js file and restart
// Fiddler Classic. A fresh copy of the default rules will be created from the original
// sample rules file.

// The best way to edit this file is to install the FiddlerScript Editor, part of
// the free SyntaxEditing addons. Get it here: http://fiddler2.com/r/?SYNTAXVIEWINSTALL

// GLOBALIZATION NOTE: Save this file using UTF-8 Encoding.

// JScript.NET Reference
// http://fiddler2.com/r/?msdnjsnet
//
// FiddlerScript Reference
// http://fiddler2.com/r/?fiddlerscriptcookbook

class Handlers
{
	// *****************
	//
	// This is the Handlers class. Pretty much everything you ever add to FiddlerScript
	// belongs right inside here, or inside one of the already-existing functions below.
	//
	// *****************

	// The following snippet demonstrates a custom-bound column for the Web Sessions list.
	// See http://fiddler2.com/r/?fiddlercolumns for more info
	/*
	  public static BindUIColumn("Method", 60)
	  function FillMethodColumn(oS: Session): String {
		 return oS.RequestMethod;
	  }
	*/

	// The following snippet demonstrates how to create a custom tab that shows simple text
	/*
	   public BindUITab("Flags")
	   static function FlagsReport(arrSess: Session[]):String {
		var oSB: System.Text.StringBuilder = new System.Text.StringBuilder();
		for (var i:int = 0; i<arrSess.Length; i++)
		{
			oSB.AppendLine("SESSION FLAGS");
			oSB.AppendFormat("{0}: {1}\n", arrSess[i].id, arrSess[i].fullUrl);
			for(var sFlag in arrSess[i].oFlags)
			{
				oSB.AppendFormat("\t{0}:\t\t{1}\n", sFlag.Key, sFlag.Value);
			}
		}
		return oSB.ToString();
	}
	*/

	// You can create a custom menu like so:
	/*
	QuickLinkMenu("&Links")
	QuickLinkItem("IE GeoLoc TestDrive", "http://ie.microsoft.com/testdrive/HTML5/Geolocation/Default.html")
	QuickLinkItem("FiddlerCore", "http://fiddler2.com/fiddlercore")
	public static function DoLinksMenu(sText: String, sAction: String)
	{
		Utilities.LaunchHyperlink(sAction);
	}
	*/

	// Cause Fiddler Classic to override the User-Agent header with one of the defined values
	// The page http://browserscope2.org/browse?category=selectors&ua=Mobile%20Safari is a good place to find updated versions of these
	RulesString("&User-Agents", true)
	BindPref("fiddlerscript.ephemeral.UserAgentString")
	RulesStringValue(0,"Netscape &3", "Mozilla/3.0 (Win95; I)")
	RulesStringValue(1,"WinPhone8.1", "Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 520) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537")
	RulesStringValue(2,"&Safari5 (Win7)", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1")
	RulesStringValue(3,"Safari9 (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56")
	RulesStringValue(4,"iPad", "Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F5027d Safari/600.1.4")
	RulesStringValue(5,"iPhone6", "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4")
	RulesStringValue(6,"IE &6 (XPSP2)", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)")
	RulesStringValue(7,"IE &7 (Vista)", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1)")
	RulesStringValue(8,"IE 8 (Win2k3 x64)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; WOW64; Trident/4.0)")
	RulesStringValue(9,"IE &8 (Win7)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)")
	RulesStringValue(10,"IE 9 (Win7)", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)")
	RulesStringValue(11,"IE 10 (Win8)", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)")
	RulesStringValue(12,"IE 11 (Surface2)", "Mozilla/5.0 (Windows NT 6.3; ARM; Trident/7.0; Touch; rv:11.0) like Gecko")
	RulesStringValue(13,"IE 11 (Win8.1)", "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko")
	RulesStringValue(14,"Edge (Win10)", "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.11082")
	RulesStringValue(15,"&Opera", "Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17")
	RulesStringValue(16,"&Firefox 3.6", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.7) Gecko/20100625 Firefox/3.6.7")
	RulesStringValue(17,"&Firefox 43", "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0")
	RulesStringValue(18,"&Firefox Phone", "Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0")
	RulesStringValue(19,"&Firefox (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0")
	RulesStringValue(20,"Chrome (Win)", "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.48 Safari/537.36")
	RulesStringValue(21,"Chrome (Android)", "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36")
	RulesStringValue(22,"ChromeBook", "Mozilla/5.0 (X11; CrOS x86_64 6680.52.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.74 Safari/537.36")
	RulesStringValue(23,"GoogleBot Crawler", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")
	RulesStringValue(24,"Kindle Fire (Silk)", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.22.79_10013310) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true")
	RulesStringValue(25,"&Custom...", "%CUSTOM%")
	public static var sUA: String = null;

	// Cause Fiddler Classic to delay HTTP traffic to simulate typical 56k modem conditions
	public static RulesOption("Simulate &Modem Speeds", "Per&formance")
	var m_SimulateModem: boolean = false;

	// Removes HTTP-caching related headers and specifies "no-cache" on requests and responses
	public static RulesOption("&Disable Caching", "Per&formance")
	var m_DisableCaching: boolean = false;

	public static RulesOption("Cache Always &Fresh", "Per&formance")
	var m_AlwaysFresh: boolean = false;

	public static RulesOption("-", "Per&formance")
	var m_Dummy2: boolean = false;

	public static RulesOption("Skip MSVS Tracking (Faster)", "Per&formance")
	var m_skipVSTracking: boolean = false;

	public static RulesOption("Enabled", "Shock&wave Tweaks", true)
	BindPref('fiddlerscript.rules.neo.sw_default')
	var m_swDefault: boolean = true;

	public static RulesOption("Disabled", "Shock&wave Tweaks", true)
	BindPref('fiddlerscript.rules.neo.sw_disabled')
	var m_swDisabled: boolean = false;

	public static RulesOption("-", "Shock&wave Tweaks", true)
	var m_Dummy: boolean = false;

	public static RulesOption("Don't Fake Reply", "Shock&wave Tweaks")
	BindPref('fiddlerscript.rules.neo.sw_noreply')
	var m_swNoReply: boolean = false;

	public static RulesOption("Has Neopets &Premium", "Ad&vanced")
	BindPref("fiddlerscript.rules.adv.has_premium")
	var m_HasNeopetsPremium: boolean = false;

	public static RulesOption("Use Translation Mirror", "Ad&vanced")
	BindPref("fiddlerscript.rules.adv.trans_mirror")
	var m_UseTranslationMirror: boolean = true;

	public static RulesOption("&Upload Translations", "Ad&vanced")
	BindPref("fiddlerscript.rules.adv.upload_trans")
	var m_UploadTranslations: boolean = false;

	public static RulesOption("Shop Transactions Never Expire", "Ad&vanced")
	BindPref("fiddlerscript.rules.adv.tx_no_expire")
	var m_ShopTransactionsNeverExpire: boolean = false;

	public static RulesOption("Use Old Skarl (Enables Charm!)", "Ad&vanced")
	BindPref("fiddlerscript.rules.adv.old_skarl")
	var m_UseOldSkarl: boolean = true;

	public static RulesOption("Flash NC Mall (Goggles Av)", "Ad&vanced")
	BindPref("fiddlerscript.rules.adv.flash_mall")
	var m_flashMall: boolean = false;

    public static RulesOption("Enable Better Inventory", "Ad&vanced")
    BindPref("fiddlerscript.rules.adv.better_inventory")
    var m_BetterInventory: boolean = false;

	// Force a manual reload of the script file.  Resets all
	// RulesOption variables to their defaults.
	public static ToolsAction("Reset Script")
	function DoManualReload() {
		FiddlerObject.ReloadScript();
	}

	public static ContextAction("Decode Selected Sessions")
	function DoRemoveEncoding(oSessions: Session[]) {
		for (var x:int = 0; x < oSessions.Length; x++){
			oSessions[x].utilDecodeRequest();
			oSessions[x].utilDecodeResponse();
		}
		UI.actUpdateInspector(true,true);
	}

	static var swGame = '';

	// Vars to enable score re-submissions
	static var saved_score;
	static var saved_score_result;

	static function OnBeforeRequest(oSession: Session) {
		// Sample Rule: Color ASPX requests in RED
		// if (oSession.uriContains(".aspx")) {	oSession["ui-color"] = "red";	}

		// Sample Rule: Flag POSTs to fiddler2.com in italics
		// if (oSession.HostnameIs("www.fiddler2.com") && oSession.HTTPMethodIs("POST")) {	oSession["ui-italic"] = "yup";	}

		// Sample Rule: Break requests for URLs containing "/sandbox/"
		// if (oSession.uriContains("/sandbox/")) {
		//     oSession.oFlags["x-breakrequest"] = "yup";	// Existence of the x-breakrequest flag creates a breakpoint; the "yup" value is unimportant.
		// }
		/*
		if (oSession.host == "umwatson.events.data.microsoft.com"
			// && (oSession.oRequest.headers.HTTPMethod == "GET")
		) {
			oSession["ui-backcolor"] = "green";   // Simplify debugging
			oSession.oRequest.headers.HTTPMethod = "POST";
			//oSession.oRequest["Content-Type"] = "application/x-www-form/urlencoded";
			oSession.utilSetRequestBody("");
		}
		*/

		if ((null != gs_ReplaceToken) && (oSession.url.indexOf(gs_ReplaceToken)>-1)) {   // Case sensitive
			oSession.url = oSession.url.Replace(gs_ReplaceToken, gs_ReplaceTokenWith);
		}
		if ((null != gs_OverridenHost) && (oSession.host.toLowerCase() == gs_OverridenHost)) {
			oSession["x-overridehost"] = gs_OverrideHostWith;
		}

		if ((null!=bpRequestURI) && oSession.uriContains(bpRequestURI)) {
			oSession["x-breakrequest"]="uri";
		}
		// Fixes stackpath interfering with game translation file loading by using a mirror:
		if (m_UseTranslationMirror && oSession.uriContains('/gettranslationxml.phtml')) {
			if (oSession.HTTPMethodIs("CONNECT") == false) {
				oSession.oRequest.headers['X-NeoFixes'] = 'get-translation';
				oSession.oRequest.headers.Remove('Cookie');
				oSession.host = "www.neofixes.com";
			}
		}
		// Fix long delay/lag/errors from the ShockWave/Flash phone-home
		if (!m_swNoReply && oSession.uriContains("pinger.macromedia.com")) {
			oSession.utilCreateResponseAndBypassServer();
			oSession.responseCode = '204';
			oSession["ui-backcolor"] = "Lavender";
		}
		// Don't be tracked by Visual Studio. Also speeds the site up a lot.
		if (m_skipVSTracking && oSession.uriContains('dc.services.visualstudio.com/v2/track')) {
			oSession.utilCreateResponseAndBypassServer();
			oSession.responseCode = '200';
			oSession.utilSetResponseBody('{"itemsReceived":1,"itemsAccepted":1,"errors":[],"appId":"048e78a5-9e6f-49c1-b0c3-a4e8c7e7e4be"}');
			oSession["ui-backcolor"] = "Pink";
		}
		if (!m_swDisabled) {
			// More shockwave fixes
			if (oSession.uriContains('games/preloaders/ml')) {
				oSession["ui-backcolor"] = "Pink";
				oSession["request-trickle-delay"] = '1';
				oSession["response-trickle-delay"] = '1';
			}
			if (oSession.uriContains('.dcr') && !oSession.uriContains('g313_v10_23393.dcr')) {
				if (oSession.oRequest.headers.Exists('If-Modified-Since')) oSession.oRequest.headers.Remove('If-Modified-Since');
				if (oSession.oRequest.headers.Exists('If-None-Match')) oSession.oRequest.headers.Remove('If-None-Match');
				if (oSession.uriContains('g356_v18_30330.dcr' || swGame == 'dice_escape')) {
					// Dice escape
					swGame = 'dice_escape';
					oSession["request-trickle-delay"] = '2';
					oSession["response-trickle-delay"] = '2';
				} else if (oSession.uriContains('g430_v26_34232.dcr')) {
					swGame = 'castle_battle';
					// Castle battles shows it's loaded before it's ready, so speed it up.
					oSession["request-trickle-delay"] = '1';
					oSession["response-trickle-delay"] = '1';
				} else if (oSession.uriContains('g386_v8')) {
					swGame = 'slorgs';
					// Attack of the slorgs is particularly finnicky
					oSession["request-trickle-delay"] = '2';
					oSession["response-trickle-delay"] = '2';
				} else if (oSession.uriContains('g349_')) {
					swGame = 'pirate_caves';
					oSession["request-trickle-delay"] = '10';
					oSession["response-trickle-delay"] = '20';
				} else if (oSession.uriContains('g473_')) {
					swGame = 'ice_caves';
					oSession["request-trickle-delay"] = '10';
					oSession["response-trickle-delay"] = '20';
				} else if (oSession.uriContains('g480_')) {
					swGame = 'trotrods';
					oSession["request-trickle-delay"] = '10';
					oSession["response-trickle-delay"] = '20';
				} else {
					swGame = '';
					oSession["request-trickle-delay"] = '10';
					oSession["response-trickle-delay"] = '20';
				}
				oSession["ui-backcolor"] = "Lavender";

			}
			if (oSession.uriContains('games/DGS_BIOS.cct')) {
				if (swGame != '') {
					oSession["request-trickle-delay"] = '1';
					oSession["response-trickle-delay"] = '1';
				}
			}
			if (oSession.uriContains('gaming_system/dgs_include_v2.swf')) {
				if (swGame == 'dice_escape') {
					oSession["request-trickle-delay"] = '1';
					oSession["response-trickle-delay"] = '2';
				} else {
					// This is also for attack of the slorgs.
					oSession["request-trickle-delay"] = '40';
					oSession["response-trickle-delay"] = '100';
				}
				oSession["ui-backcolor"] = "Lavender";
			}
		}
		// End batch of shockwave fixes

		if (oSession.host.Contains("neopets.com") && oSession.HTTPMethodIs("CONNECT") == false) {
			oSession["x-OverrideSslProtocols"] = " ssl3;tls1.0;tls1.1;tls1.2";

			if (m_BetterInventory) {
				if (oSession.uriContains("ajax/inventory.php")) {
					oSession.PathAndQuery = oSession.PathAndQuery.replace('Stack=1', 'Stack=0');
				}
			}
			if ((oSession.PathAndQuery.Contains('/userlookup.phtml?user=') || oSession.PathAndQuery.Contains('/userlookup.phtml?randomfriend=')) && !oSession.PathAndQuery.Contains('place=')) {
				oSession.PathAndQuery = oSession.PathAndQuery + '&place=99999';
			}
			if (oSession.PathAndQuery.Contains('/randomfriend.phtml?randomfriend=') || oSession.PathAndQuery.Contains('/randomfriend.phtml?user=')) {
				const randomfriendRegex = /randomfriend\.phtml\?(randomfriend|user)=([^&]*)$/;
				oSession.PathAndQuery = oSession.PathAndQuery.replace(randomfriendRegex, 'userlookup.phtml?place=99999&user=$2');
			}
			if (m_flashMall && oSession.PathAndQuery.Contains("/mall/pet_preview_h5.phtml")) {
				oSession.PathAndQuery = oSession.PathAndQuery.Replace('pet_preview_h5.phtml', 'pet_preview.phtml');
			}
			if (m_UseOldSkarl && oSession.PathAndQuery == "/medieval/grumpyking.phtml") {
				oSession.PathAndQuery = "/medieval/grumpyking.phtml/";
			}
			// Fix stackpath blocking Korbat's Lab XML/CMS Data
			if (oSession.uriContains('/process_cms.phtml')) {
				// Mark for easy find for future games
				oSession["ui-backcolor"] = "#FFAAAA";
				const klabXML = 'neopets/process_cms_klab.xml';
				if (System.IO.File.Exists(klabXML)) {
					const reqBody = oSession.GetRequestBodyAsString();
					if (decodeURI(oSession.fullUrl).Contains('item_id=64') || decodeURI(reqBody).Contains('item_id=64')) {
						oSession.utilCreateResponseAndBypassServer();
						oSession.oResponse.headers['Content-type'] = 'text/html';
						oSession.ResponseBody = System.IO.File.ReadAllBytes(klabXML);
						oSession["ui-backcolor"] = "#7777ff";
					}
				}
			}
			if (oSession.uriContains('/buy_item.phtml')) {
				// The code below will ensure you never get expired shop items, however the ref_ck could still change causing 'directed here from the wrong place'
				// var expiredTs = Math.round((new Date()).getTime() / 1000) - 180;
				var expiredTs = 0;
				// Get the current timestamp from the buy_item URL (to avoid fake links)
				var getTsRegex = /\/buy_item.phtml.*&xhs=([0-9n-s]+).*/;
				if (!m_ShopTransactionsNeverExpire) {
					expiredTs = oSession.PathAndQuery.replace(getTsRegex, '$1');
					expiredTs = expiredTs.replace(/n/g, 'a').replace(/o/g, 'b').replace(/p/g, 'c').replace(/q/g, 'd').replace(/r/g, 'e').replace(/s/g, 'f');

					// Subtract 2 minutes to avoid servers being off by 90 seconds.
					expiredTs = parseInt(expiredTs, 16) - 120;
				} else {
					expiredTs = Math.round((new Date()).getTime() / 1000) - 120;
				}
				// Turn it back into the right format
				expiredTs = expiredTs.toString(16);
				expiredTs = expiredTs.replace(/a/g, 'n').replace(/b/g, 'o').replace(/c/g, 'p').replace(/d/g, 'q').replace(/e/g, 'r').replace(/f/g, 's');

				// Rewrite the query:
				oSession.PathAndQuery = oSession.PathAndQuery.replace(/xhs=[0-9n-s]+/, 'xhs=' + expiredTs);
			}
			// Shortcut to resubmit score
			if (oSession.fullUrl.ToLower().Contains('neopets.com/fixscore')) {
				if (saved_score) {
					var resendScoreHdrs = "HTTP/1.0 302 FOUND\r\nContent-type: text/html; charset=iso-8859-1\r\nLocation: " + saved_score + "\r\n\r\n";
					oSession.utilCreateResponseAndBypassServer();
					oSession.ResponseHeaders.AssignFromString(resendScoreHdrs);
				} else {
					var resendScoreMsg = "Your last score wasn't blocked by Stackpath, so we cannot re-submit it. It is gone, sorry. Reload the game before you try again!";
					if (saved_score_result) {
						resendScoreMsg += "<br /><br />(Technical details) Your last score submission's result was:<br /><pre>" + saved_score_result + "</pre>";
					}
					oSession.utilCreateResponseAndBypassServer();
					oSession.utilSetResponseBody(resendScoreMsg);
				}
			}
			// Fix 3dvia games not sending score
			if (oSession.uriContains('process_flash_score') && oSession.oRequest.headers.ExistsAndContains('User-Agent', 'Virtools Webserver Manager')) {
				//Fix cookies not sent to server because of VirtualBrowser to appease stackpath
				if (saved_cookies != null) {
					oSession.oRequest.headers["Cookie"] = saved_cookies;
				}
			} else if (oSession.HostnameIs("dev.neopets.com")) {
				oSession.host = "www.neopets.com";
				//try to fix cookies not sent to dev to bypass stackpath
				if (saved_cookies != null) {
					oSession.oRequest.headers["Cookie"] = saved_cookies;
				}
			} else if (oSession.HostnameIs("www.neopets.com")) {
				saved_cookies = oSession.oRequest.headers["Cookie"];
			}
			// Fix potato counter because it doesn't use images. for some reason
			if (oSession.uriContains("games/g226/config.xml")) {
				oSession.host = "images.neopets.com";
			}
			//fixes games pointing to dev server that have chinese lang when offline
			if (oSession.uriContains("gettranslationxml.phtml") && oSession.HTTPMethodIs("POST")) {
				oSession.utilSetRequestBody(oSession.GetRequestBodyAsString().Replace("lang=ch", "lang=en"));
			}
			// Load any custom overrides:
			if (
				!oSession.uriContains(".png") && !oSession.uriContains(".jpg") || !oSession.uriContains(".gif")
			) {
				var path = "neopets" + oSession.PathAndQuery
				//if (oSession.oRequest.headers.Exists("x-flash-version")) {
				if (path.Contains('?')) {
					path = path.Split("?")[0];
				}
				// Note: 3dvia installer/player javascript is mirrored in case it ever goes down
				if (System.IO.File.Exists(path)) {
					oSession['ui-backcolor'] = '#bbbbee';
					oSession.utilCreateResponseAndBypassServer();
					oSession.ResponseBody = System.IO.File.ReadAllBytes(path);
					if (path.Contains(".xml")) {
						oSession.oResponse.headers["Content-Type"] = "text/xml";
					}
					if (path.Contains(".html")) {
						oSession.oResponse.headers["Content-Type"] = "text/html";
					}
				}

			}
		}

		if ((null!=bpMethod) && (oSession.HTTPMethodIs(bpMethod))) {
			oSession["x-breakrequest"]="method";
		}

		if ((null!=uiBoldURI) && oSession.uriContains(uiBoldURI)) {
			oSession["ui-bold"]="QuickExec";
		}

		if (m_SimulateModem) {
			// Delay sends by 300ms per KB uploaded.
			oSession["request-trickle-delay"] = "150";
			// Delay receives by 150ms per KB downloaded.
			oSession["response-trickle-delay"] = "50";
		}

		if (m_DisableCaching) {
			oSession.oRequest.headers.Remove("If-None-Match");
			oSession.oRequest.headers.Remove("If-Modified-Since");
			oSession.oRequest["Pragma"] = "no-cache";
		}

		// User-Agent Overrides
		if (null != sUA) {
			oSession.oRequest["User-Agent"] = sUA;
		}

		if (m_AlwaysFresh && (oSession.oRequest.headers.Exists("If-Modified-Since") || oSession.oRequest.headers.Exists("If-None-Match")))
		{
			oSession.utilCreateResponseAndBypassServer();
			oSession.responseCode = 304;
			oSession["ui-backcolor"] = "Lavender";
		}
	}

	// This function is called immediately after a set of request headers has
	// been read from the client. This is typically too early to do much useful
	// work, since the body hasn't yet been read, but sometimes it may be useful.
	//
	// For instance, see
	// http://blogs.msdn.com/b/fiddler/archive/2011/11/05/http-expect-continue-delays-transmitting-post-bodies-by-up-to-350-milliseconds.aspx
	// for one useful thing you can do with this handler.
	//
	// Note: oSession.requestBodyBytes is not available within this function!

	static var saved_cookies;

	static function OnPeekAtRequestHeaders(oSession: Session) {
		if (oSession.host.Contains("neopets.com") && oSession.HTTPMethodIs("CONNECT") == false && oSession.HostnameIs("swf.neopets.com") == false) {
			oSession.oRequest.headers.UriScheme = "https";

			//fixes Clara on Ice, Let it Slide, Extreme Potato Counter
			if (oSession.uriContains(".swf") || oSession.uriContains("/config.xml") || oSession.uriContains("/shellconfig.xml")) {
				oSession.host = "images.neopets.com";
				oSession.url = oSession.url.Replace("/games/https://images.neopets.com/games/", "/games/").Replace("games/games", "games").Replace('/games///images.neopets.com/games/', '/games/');
			}
			//fixes kacheek seek
			if (oSession.uriContains("process_hideandseek.phtml")) {
				oSession.oRequest.headers["Referer"] = "http://www.neopets.com/games/hidenseek";
			}
		}
	}


	//
	// If a given session has response streaming enabled, then the OnBeforeResponse function
	// is actually called AFTER the response was returned to the client.
	//
	// In contrast, this OnPeekAtResponseHeaders function is called before the response headers are
	// sent to the client (and before the body is read from the server).  Hence this is an opportune time
	// to disable streaming (oSession.bBufferResponse = true) if there is something in the response headers
	// which suggests that tampering with the response body is necessary.
	//
	// Note: oSession.responseBodyBytes is not available within this function!
	//
	static function OnPeekAtResponseHeaders(oSession: Session) {
		//FiddlerApplication.Log.LogFormat("Session {0}: Response header peek shows status is {1}", oSession.id, oSession.responseCode);
		if (m_DisableCaching) {
			oSession.oResponse.headers.Remove("Expires");
			oSession.oResponse["Cache-Control"] = "no-cache";
		}

		if ((bpStatus>0) && (oSession.responseCode == bpStatus)) {
			oSession["x-breakresponse"]="status";
			oSession.bBufferResponse = true;
		}

		if ((null!=bpResponseURI) && oSession.uriContains(bpResponseURI)) {
			oSession["x-breakresponse"]="uri";
			oSession.bBufferResponse = true;
		}
		// Fix access control origin
		if (oSession.oResponse.headers['Access-Control-Allow-Origin'].Contains("neopets.com")) {
			oSession.oResponse.headers['Access-Control-Allow-Origin'] = "*";
		}
	}

	static function OnBeforeResponse(oSession: Session) {
		if (oSession.uriContains('dgs_get_game_data.phtml')) {
			oSession.oResponse.headers.Remove('x-sp-metadata');
			oSession.oResponse.headers.Remove('X-HW');
		}
		if (oSession.host.Contains('neofixes.com')) {
			if (oSession.responseCode == 404 &&	oSession.oRequest.headers.ExistsAndContains('X-NeoFixes', 'get-translation')) {
				FiddlerObject.alert("This translation doesn't exist in our database!\n\Disable:\n\tRules->Advanced->Use Translation Mirror\nand reload the game.\n\nAnd please consider enabling:\n\tRules->Advanced->Upload Translations\nto help others in your situation!");
			}
			if (oSession.oResponse.headers.Exists('X-NF-Message')) {
				FiddlerObject.alert(oSession.oResponse.headers['X-NF-Message']);
			}
		}
		if (oSession.host.Contains("neopets.com")) {
			if (oSession.responseCode >= 301 && oSession.responseCode <= 302) {
				oSession.ResponseHeaders['Location'] = oSession.ResponseHeaders['Location'].Replace('http:', 'https:');
			}
			// Fix Ability To Reset Petpage:
			if (oSession.uriContains("editpage.phtml?pet_name")) {
				const epParams = oSession.PathAndQuery.split('?')[1].split('&');
				var petName = '';
				for (var i = 0; i < epParams.length; i++) {
					const pair = epParams[i].split('=');
					if (pair[0] === 'pet_name') petName = pair[1];
				}
				if (petName !== '') {
					oSession.utilDecodeResponse();
					const fixCode = "</form><form action=\"/process_editpage.phtml\" method=\"post\"><input type='hidden' name='pet_name' value='" + petName + "' />";
					oSession.utilReplaceInResponse("<input type='submit' name='subbyreset'", fixCode + "<input type='submit' name='subbyreset'");
				}
			}
			// Better Inventory Mods
			if (m_BetterInventory) {
				// Remove GBC / openables after opening: (ones that don't require confirmation on open)
				if (oSession.uriContains('process_cash_object.phtml')) {
					if (oSession.PathAndQuery.Contains('?cash_obj_id')) {
						var objId = 0;
						const params = oSession.PathAndQuery.Split('?')[1].Split('&');
						for (var i = 0; i< params.length; i++) {
							const p = params[i].Split('=');
							if (p[0] === 'cash_obj_id') objId = p[1];
						}
						if (objId) {
							oSession.utilDecodeResponse();
							oSession.utilReplaceInResponse("<div class='gashapon_display' align='center'>", '<script type="text/javascript">removeItem(' + objId + ');</script><div class="gashapon_display" align="center">');
						}
					} else {
						// Check for item gifts:
						var formData = oSession.GetRequestBodyAsString();
						if (formData.length) {
							const params2 = formData.Split('&');
							var removeItems = false;
							var giftBoxId = 0;
							var giftId = 0;
							for (var i = 0; i < params2.length; i++) {
								const p2 = params2[i].Split('=');
								if (p2[0] === 'sentPass') {
									removeItems = true;
								} else if (p2[0] === 'cash_obj_id') {
									giftBoxId = p2[1];
								} else if (p2[0].Contains('giftItem')) {
									giftId = p2[1];
								}
							}
							if (removeItems) {
								oSession.utilDecodeResponse();
								const newContent = '<script type="text/javascript">removeItem(' + giftBoxId + '); removeItem(' + giftId + ');</script>';
								const match = 'Congratulations!';
								oSession.utilReplaceOnceInResponse(match, newContent + match, true);
							}
						}
					}
				}
				// Remove most NC + NP items on open:
				if (oSession.uriContains('js/inventory.js')) {
					oSession.utilDecodeResponse();
                	oSession.utilReplaceInResponse('// Display Results', '// Display Results\n\t\t\tif ((typeof cashData === "object" && cashData.action !== "gashapon") || (typeof postData === "object" && postData.action !== "auction") || typeof auctionData === "object" || (typeof gashaponData === "object" && gashaponData.confirm) || (typeof fortuneData === "object" && fortuneData.action === "confirm")) removeItem(currentItemId);');
					oSession.utilReplaceInResponse('function invView2(itemId) {', 'let currentItemId = null;\n\nfunction removeItem(itemId) {\n\t$(`div.grid-item > div[id="${itemId}"]`).parent().remove();\n}\nfunction invView2(itemId) {\ncurrentItemId = itemId;');
					var body = oSession.GetResponseBodyAsString();

					var cursor = body.indexOf('function useInvItem');
					var partial = [body.substr(cursor)];
					partial.push(partial[0].substr(partial[0].indexOf('useobject.phtml')));
					const replace = partial[1].replace('success: function(response) {', 'success: function(response) {\n\t\t\t\tif ((typeof postData === "object" && postData.action !== "auction") || typeof auctionData === "object") removeItem(currentItemId);');
					oSession.utilReplaceInResponse(partial[1], replace);
				}
				// Prevent the forced-reload after using an item:
				if (oSession.uriContains('/inventory.phtml')) {
					oSession.utilReplaceInResponse(
						'<a href="/inventory.phtml"><div class="inv-popup-exit',
						'<a><div onclick="$(\'#navpopupshade__2020\').hide(); $(\'#invResult\').hide(); $(\'#refresh-shade__2020\').detach(); $(\'#refreshshade__2020\').detach();" class="inv-popup-exit'
					);
					oSession.utilReplaceInResponse("<a href='/inventory.phtml' id='refreshshade__2020'", "<a href='#' id='refreshshade__2020'");
				}
			}
			// Automatically upload translation:
			if (!m_UseTranslationMirror && m_UploadTranslations && oSession.uriContains('transcontent/gettranslationxml.phtml')) {
				var uri = "POST https://www.neofixes.com/api/upload_translation.phtml HTTP/1.0";
				var headers = ["Host: www.neofixes.com"];
				var txData = oSession.GetRequestBodyAsString();
				var txFile = oSession.GetResponseBodyAsString();

				if (txFile.Contains('<!doctype html> <html lang="en">') || txFile.Contains('<title>Neopets - Loading site...</title>')) {
					// Check if this is stack path
					oSession["ui-backcolor"] = "red";
					// FiddlerObject.alert('Stackpath blocked the translation!');
				} else {
					// Otherwise continue with the file uplaod
					var boundary = "NeoFixes.com-------------aEaEaE";
					var content = '--' + boundary + '\r\nContent-Disposition: form-data; name="txData"\r\n\r\n' + txData;
					content += '\r\n--' + boundary + '\r\nContent-Disposition: form-data; name="txURI"\r\n\r\n' + oSession.fullUrl;
					content += '\r\n--' + boundary + '\r\nContent-Disposition: form-data; name="txFile"; filename="translation.xml"\r\nContent-Type: text/xml\r\n\r\n' + txFile;
					content += '\r\n--' + boundary + '--';
					// Build headers now that we have the size:
					headers.push('User-Agent: NeoFixer.com Autouploader');
					headers.push("Content-type: multipart/form-data; boundary=" + boundary);
					headers.push("Content-length: " + content.length);
					var sRequest = uri + "\r\n" + headers.join("\r\n") + '\r\n\r\n';
					try {
						var newReq = FiddlerObject.utilIssueRequest(sRequest + content);

					} catch (e) {
						FiddlerObject.alert(e);
					}
				}

			}
			// Store score to re-send
			if (oSession.uriContains('process_shockwave_score') || oSession.uriContains('process_flash_score')) {
				var scoreResult = oSession.GetResponseBodyAsString();
				if (!scoreResult.Contains('success=')) {
					// Stackpath is the only reason you shouldn't see this
					saved_score = oSession.fullUrl;
					saved_score_result = null;
				} else {
					saved_score = null;
					saved_score_result = scoreResult;
				}
			}
			// Populate old King Skarl Results randomly since they aren't saved
			if (oSession.uriContains('/medieval/grumpyking.phtml/')) {
				var skarlChoices = oSession.GetResponseBodyAsString();
				// Choose the avatar question:
				skarlChoices = skarlChoices.Replace('value="What"', 'value="What" SELECTED');
				skarlChoices = skarlChoices.Replace('value="do"', 'value="do" SELECTED');
				skarlChoices = skarlChoices.Replace('value="you do if"', 'value="you do if" SELECTED');
				skarlChoices = skarlChoices.replace(/part 4<\/option>(\s+)<option/, 'part 4</option>$1<option SELECTED');
				skarlChoices = skarlChoices.Replace('value="fierce"', 'value="fierce" SELECTED');
				skarlChoices = skarlChoices.Replace('value="Peophins"', 'value="Peophins" SELECTED');
				skarlChoices = skarlChoices.replace(/part 7<\/option>(\s+)<option/, 'part 7</option>$1<option SELECTED');
				skarlChoices = skarlChoices.Replace('value="has eaten too much"', 'value="has eaten too much" SELECTED');
				skarlChoices = skarlChoices.replace(/part 9<\/option>(\s+)<option/, 'part 9</option>$1<option SELECTED');
				skarlChoices = skarlChoices.Replace('value="tin of olives"', 'value="tin of olives" SELECTED');

				// Choose random answers:
				skarlChoices = skarlChoices.Replace("</script>",'\nfunction randomizeAnswers(){for(var e=1;e<=8;e++){var n=document.getElementById("ap"+e),t=Math.floor(Math.random()*(n.getElementsByTagName("option").length-1));n.selectedIndex=t+1}}document.addEventListener("DOMContentLoaded",function(){randomizeAnswers()},!1);\n</script>');
				// Update the response:
				oSession.utilSetResponseBody(skarlChoices);
			}
			// Fix Resubmit ShopWizard on Palemoon / older mozilla:
			if (oSession.uriContains('np-templates/ajax/wizard.php')) {
				oSession.utilDecodeResponse();
				oSession.utilReplaceInResponse("'Resubmit' data-ajaxgenerated='yes'", "'Resubmit' data-ajaxgenerated='yes' onClick='return false;'");
			}
			// Fix what neo broke on March 1st 2023 that broke games for non-premium members:
			if (!m_HasNeopetsPremium && oSession.uriContains('play_flash.phtml')) {
				const hiddenMatch = '</body>';
				const hiddenStr = '<script type="text/javascript">$(document).ready(function () { $("#game_container").show(); });</script></body>';
				const lagRegex = /\s+\<script type=\"text\/javascript\"\>\s*\n\s*function pwR[^`]*playwire\.com[^`]*data-id=\"pwPlayer\"\s*\n?\s*\>\s*\n?\s*\<\/script\>/;
				const lagReplace = '';

				var adFixerBody = oSession.GetResponseBodyAsString();
				adFixerBody = adFixerBody.replace(lagRegex, lagReplace).replace(hiddenMatch, hiddenStr);
				oSession.utilSetResponseBody(adFixerBody);
				if (adFixerBody != oSession.GetResponseBodyAsString()) oSession["ui-backcolor"] = "lime";

			}
			if (oSession.uriContains('game.phtml?game_id=877') || oSession.uriContains('game.phtml?game_id=925') || oSession.uriContains('game.phtml?game_id=926')) {
				oSession["ui-backcolor"] = "lime";
				var shenkuuBody = oSession.GetResponseBodyAsString();
				shenkuuBody = shenkuuBody.Replace('playGame(); return', '$("#gr-ctp-main .play-btn, .ctp-ctp").off("click"); playGame(); return');
				oSession.utilSetResponseBody(shenkuuBody);
			}
			if (!m_swDisabled) {
				// Shockwave fixes
				if (oSession.uriContains('play_shockwave.phtml')) {
					oSession.utilSetResponseBody(oSession.GetResponseBodyAsString().Replace('.dcr?r=', '.dcr?r=' + Math.floor(Math.random() * 10000)));
				}
				if (oSession.uriContains('gaming_system/dgs_include_v2.swf') || oSession.uriContains('games/DGS_BIOS.cct') || oSession.uriContains('preloaders')) {
					oSession.oResponse.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
					oSession.oResponse.headers['Pragma'] = 'no-cache';
					oSession.oResponse.headers['Expires'] = '0';
				}
				// Lost desert might be less buggy? Faerieland seems to work ok, too
				if (oSession.uriContains('dgs_get_game_data.phtml')) {
					var preloaderRegex = /p=[^&]*&/;
					oSession.utilSetResponseBody(oSession.GetResponseBodyAsString().replace(preloaderRegex, 'p=ml_lost_desert&'));
				}
			}
			// Fix some of the stackpath issues, like when interrupting SDB, gallery, etc.
			if (oSession.uriContains('.phtml') || oSession.fullUrl.Substring(oSession.fullUrl.Length - 1) == '/') {
				// Try and minimize the amount of string compares we have to do by limiting it to stackpath eligible pages + lengths
				if (null != oSession.responseBodyBytes && oSession.responseBodyBytes.Length < 30000 && oSession.responseBodyBytes.Length > 1000) {
					const refererRegex = /^(https?:\/\/)?([^.]+\.)?neopets.com($|\/)/;
					if (oSession.oRequest.headers.Exists('Referer') && oSession.oRequest.headers['Referer'].match(refererRegex)) {
						var respBody = oSession.GetResponseBodyAsString();
						// Check if this is a stackpath response:
						if (oSession.HTTPMethodIs('POST') && respBody.Length < 30000 && respBody.Contains("Neopets - Loading site...")) {
							var replStr = "const postData = 'FORM_DATA';const previousPage = 'PREV_PAGE';const fields = postData.split('&');for (const field of fields) {const parts = field.split('=');const newMem = document.createElement('input');newMem.type = 'hidden';newMem.name = unescape(parts[0]);newMem.value = unescape(parts[1]);submitFrm.appendChild(newMem);}window.history.replaceState(null, '', previousPage);";
							var data = oSession.GetRequestBodyAsString();
							var prev = oSession.oRequest.headers['Referer'];
							replStr = replStr.replace('FORM_DATA', data.replace(/\+/g, ' '));
							replStr = replStr.replace('PREV_PAGE', prev.replace(/http:/, 'https:'));
							oSession.utilSetResponseBody(respBody.Replace('submitFrm.sbbSbmt();', replStr + 'submitFrm.sbbSbmt();'));
							oSession['ui-backcolor'] = "magenta";

						} else if (respBody.Length < 30000 && respBody.Contains('<!doctype html> <html lang="en">')) {
							if (oSession.HTTPMethodIs('GET')) {
								// Just reload GET's so they don't lose the request URI
								respBody = respBody.Replace('redirect("reload")','redirect("post")');
								oSession.utilSetResponseBody(respBody);
							} else {
								// Fix the 'addFields' function in stackpath to actually add the form data (and update the Referer):
								var replacementStr = "function addFields(formObj){const fTarget = 'FORM_ACTION'; const postData = 'FORM_DATA';const previousPage = 'PREV_PAGE';const fields = postData.split('&');for (const field of fields) {const parts = field.split('=');const newMem = document.createElement('input');newMem.type = 'hidden';newMem.name = unescape(parts[0]);newMem.value = unescape(parts[1]);formObj.appendChild(newMem);}window.history.replaceState(null, '', previousPage);formObj.action=fTarget;}";
								var data = oSession.GetRequestBodyAsString();
								var prev = oSession.oRequest.headers['Referer'];
								replacementStr = replacementStr.replace('FORM_ACTION', oSession.fullUrl);
								replacementStr = replacementStr.replace('FORM_DATA', data.replace(/\+/g, ' '));
								replacementStr = replacementStr.replace('PREV_PAGE', prev.replace(/http:/, 'https:'));
								oSession.utilSetResponseBody(respBody.replace('function addFields(formObj){}', replacementStr));
							}
							oSession["ui-backcolor"] = "lime";
						} else if (respBody.Length < 30000 && respBody.Contains('<!DOCTYPE html> <html lang="en">')) {
							// New stackpath
							// Add the 'addFields' function in stackpath to actually add the form data (and update the Referer):
							if (!oSession.HTTPMethodIs('GET')) {
								var addFieldsFnStr = "function addFields(formObj){const fTarget = 'FORM_ACTION'; const postData = 'FORM_DATA';const previousPage = 'PREV_PAGE';const fields = postData.split('&');for (const field of fields) {const parts = field.split('=');const newMem = document.createElement('input');newMem.type = 'hidden';newMem.name = unescape(parts[0]);newMem.value = unescape(parts[1]);formObj.appendChild(newMem);}window.history.replaceState(null, '', previousPage);formObj.action=fTarget;}";
								var data = oSession.GetRequestBodyAsString();
								var prev = oSession.oRequest.headers['Referer'];
								addFieldsFnStr = addFieldsFnStr.replace('FORM_ACTION', oSession.fullUrl);
								addFieldsFnStr = addFieldsFnStr.replace('FORM_DATA', data.replace(/\+/g, ' '));
								addFieldsFnStr = addFieldsFnStr.replace('PREV_PAGE', prev.replace(/http:/, 'https:'));
								respBody = respBody.Replace('oEnvlp.appendChild(oFrm);', 'addFields(oFrm);oEnvlp.appendChild(oFrm);');
								oSession.utilSetResponseBody(respBody.replace('function redirect', addFieldsFnStr + ' function redirect'));

								oSession["ui-backcolor"] = "#ddddff";
							}
						}
					}
				}
			}
			// Re-enable multiple Gallery Upgrades by spam-clicking
			if (oSession.uriContains('/gallery_desc_edit.phtml')) {
				oSession.utilSetResponseBody(oSession.GetResponseBodyAsString().Replace('onSubmit="return one_submit();"', ''));
			}
			//fixes coconut shy
			if (oSession.uriContains("halloween/coconutshy.phtml")) {
				const cocoRegex = /coconutshy_v6.swf\?lang=([a-zA-Z]{2})&baseurl=[^']*/;
				const cocoShyBody = oSession.GetResponseBodyAsString().replace(cocoRegex, 'coconutshy_v6.swf?lang=$1');
				oSession.utilSetResponseBody(cocoShyBody);
			}
			// Fix other Halloween games
			if (oSession.uriContains("/halloween/") && oSession.uriContains('.phtml')) {
				oSession.utilSetResponseBody(oSession.GetResponseBodyAsString().replace(/http:\/\//g, "https://"));
			}
			//fixes shockwave games
			if (oSession.uriContains("play_shockwave.phtml") && oSession.GetResponseBodyAsString().Contains("game_container")) {
				oSession.utilSetResponseBody(oSession.GetResponseBodyAsString().Replace('document.write', 'console.log').Replace("swRestart='false'", "swRestart='true'").Replace("swContextMenu='false'", "swContextMenu='true'"));
			}
			//fixes neohome v2
			if (oSession.uriContains("neohome/property/")) {
				oSession.utilSetResponseBody(oSession.GetResponseBodyAsString().Replace('services.neopets', 'www.neopets').Replace("http%3A", "https%3A"));
			}
			//fixes 3dvia games like Terror Mountain Tilt
			if (oSession.uriContains("play_flash.phtml") && oSession.GetResponseBodyAsString().Contains("virtools.download.akamai.com")) {
				oSession.utilSetResponseBody(oSession.GetResponseBodyAsString().Replace("http://a532.g.akamai.net/f/532/6712/5m/virtools.download.akamai.com/6712", "https://3dlifeplayer.dl.3dvia.com"));
			}
			if (oSession.uriContains("process_flash_score.phtml")) {
				FiddlerObject.log(oSession.fullUrl);
			}
		}
	}

	/*
		// This function executes just before Fiddler Classic returns an error that it has
		// itself generated (e.g. "DNS Lookup failure") to the client application.
		// These responses will not run through the OnBeforeResponse function above.
		static function OnReturningError(oSession: Session) {
		}
	*/
	/*
		// This function executes after Fiddler Classic finishes processing a Session, regardless
		// of whether it succeeded or failed. Note that this typically runs AFTER the last
		// update of the Web Sessions UI listitem, so you must manually refresh the Session's
		// UI if you intend to change it.
		static function OnDone(oSession: Session) {
		}
	*/

	/*
	static function OnBoot() {
		MessageBox.Show("Fiddler Classic has finished booting");
		System.Diagnostics.Process.Start("iexplore.exe");

		UI.ActivateRequestInspector("HEADERS");
		UI.ActivateResponseInspector("HEADERS");
	}
	*/

	/*
	static function OnBeforeShutdown(): Boolean {
		// Return false to cancel shutdown.
		return ((0 == FiddlerApplication.UI.lvSessions.TotalItemCount()) ||
				(DialogResult.Yes == MessageBox.Show("Allow Fiddler Classic to exit?", "Go Bye-bye?",
				 MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2)));
	}
	*/

	/*
	static function OnShutdown() {
			MessageBox.Show("Fiddler Classic has shutdown");
	}
	*/

	/*
	static function OnAttach() {
		MessageBox.Show("Fiddler Classic is now the system proxy");
	}
	*/

	/*
	static function OnDetach() {
		MessageBox.Show("Fiddler Classic is no longer the system proxy");
	}
	*/

	// The Main() function runs everytime your FiddlerScript compiles
	static function Main() {
		var today: Date = new Date();
		FiddlerObject.StatusText = " CustomRules.js was loaded at: " + today;

		// Uncomment to add a "Server" column containing the response "Server" header, if present
		// UI.lvSessions.AddBoundColumn("Server", 50, "@response.server");

		// Uncomment to add a global hotkey (Win+G) that invokes the ExecAction method below...
		// UI.RegisterCustomHotkey(HotkeyModifiers.Windows, Keys.G, "screenshot");
	}

	// These static variables are used for simple breakpointing & other QuickExec rules
	BindPref("fiddlerscript.ephemeral.bpRequestURI")
	public static var bpRequestURI:String = null;

	BindPref("fiddlerscript.ephemeral.bpResponseURI")
	public static var bpResponseURI:String = null;

	BindPref("fiddlerscript.ephemeral.bpMethod")
	public static var bpMethod: String = null;

	static var bpStatus:int = -1;
	static var uiBoldURI: String = null;
	static var gs_ReplaceToken: String = null;
	static var gs_ReplaceTokenWith: String = null;
	static var gs_OverridenHost: String = null;
	static var gs_OverrideHostWith: String = null;

	// The OnExecAction function is called by either the QuickExec box in the Fiddler Classic window,
	// or by the ExecAction.exe command line utility.
	static function OnExecAction(sParams: String[]): Boolean {

		FiddlerObject.StatusText = "ExecAction: " + sParams[0];

		var sAction = sParams[0].toLowerCase();
		switch (sAction) {
			case "bold":
				if (sParams.Length<2) {uiBoldURI=null; FiddlerObject.StatusText="Bolding cleared"; return false;}
				uiBoldURI = sParams[1]; FiddlerObject.StatusText="Bolding requests for " + uiBoldURI;
				return true;
			case "bp":
				FiddlerObject.alert("bpu = breakpoint request for uri\nbpm = breakpoint request method\nbps=breakpoint response status\nbpafter = breakpoint response for URI");
				return true;
			case "bps":
				if (sParams.Length<2) {bpStatus=-1; FiddlerObject.StatusText="Response Status breakpoint cleared"; return false;}
				bpStatus = parseInt(sParams[1]); FiddlerObject.StatusText="Response status breakpoint for " + sParams[1];
				return true;
			case "bpv":
			case "bpm":
				if (sParams.Length<2) {bpMethod=null; FiddlerObject.StatusText="Request Method breakpoint cleared"; return false;}
				bpMethod = sParams[1].toUpperCase(); FiddlerObject.StatusText="Request Method breakpoint for " + bpMethod;
				return true;
			case "bpu":
				if (sParams.Length<2) {bpRequestURI=null; FiddlerObject.StatusText="RequestURI breakpoint cleared"; return false;}
				bpRequestURI = sParams[1];
				FiddlerObject.StatusText="RequestURI breakpoint for "+sParams[1];
				return true;
			case "bpa":
			case "bpafter":
				if (sParams.Length<2) {bpResponseURI=null; FiddlerObject.StatusText="ResponseURI breakpoint cleared"; return false;}
				bpResponseURI = sParams[1];
				FiddlerObject.StatusText="ResponseURI breakpoint for "+sParams[1];
				return true;
			case "overridehost":
				if (sParams.Length<3) {gs_OverridenHost=null; FiddlerObject.StatusText="Host Override cleared"; return false;}
				gs_OverridenHost = sParams[1].toLowerCase();
				gs_OverrideHostWith = sParams[2];
				FiddlerObject.StatusText="Connecting to [" + gs_OverrideHostWith + "] for requests to [" + gs_OverridenHost + "]";
				return true;
			case "urlreplace":
				if (sParams.Length<3) {gs_ReplaceToken=null; FiddlerObject.StatusText="URL Replacement cleared"; return false;}
				gs_ReplaceToken = sParams[1];
				gs_ReplaceTokenWith = sParams[2].Replace(" ", "%20");  // Simple helper
				FiddlerObject.StatusText="Replacing [" + gs_ReplaceToken + "] in URIs with [" + gs_ReplaceTokenWith + "]";
				return true;
			case "allbut":
			case "keeponly":
				if (sParams.Length<2) { FiddlerObject.StatusText="Please specify Content-Type to retain during wipe."; return false;}
				UI.actSelectSessionsWithResponseHeaderValue("Content-Type", sParams[1]);
				UI.actRemoveUnselectedSessions();
				UI.lvSessions.SelectedItems.Clear();
				FiddlerObject.StatusText="Removed all but Content-Type: " + sParams[1];
				return true;
			case "stop":
				UI.actDetachProxy();
				return true;
			case "start":
				UI.actAttachProxy();
				return true;
			case "cls":
			case "clear":
				UI.actRemoveAllSessions();
				return true;
			case "g":
			case "go":
				UI.actResumeAllSessions();
				return true;
			case "goto":
				if (sParams.Length != 2) return false;
				Utilities.LaunchHyperlink("http://www.google.com/search?hl=en&btnI=I%27m+Feeling+Lucky&q=" + Utilities.UrlEncode(sParams[1]));
				return true;
			case "help":
				Utilities.LaunchHyperlink("http://fiddler2.com/r/?quickexec");
				return true;
			case "hide":
				UI.actMinimizeToTray();
				return true;
			case "log":
				FiddlerApplication.Log.LogString((sParams.Length<2) ? "User couldn't think of anything to say..." : sParams[1]);
				return true;
			case "nuke":
				UI.actClearWinINETCache();
				UI.actClearWinINETCookies();
				return true;
			case "screenshot":
				UI.actCaptureScreenshot(false);
				return true;
			case "show":
				UI.actRestoreWindow();
				return true;
			case "tail":
				if (sParams.Length<2) { FiddlerObject.StatusText="Please specify # of sessions to trim the session list to."; return false;}
				UI.TrimSessionList(int.Parse(sParams[1]));
				return true;
			case "quit":
				UI.actExit();
				return true;
			case "dump":
				UI.actSelectAll();
				UI.actSaveSessionsToZip(CONFIG.GetPath("Captures") + "dump.saz");
				UI.actRemoveAllSessions();
				FiddlerObject.StatusText = "Dumped all sessions to " + CONFIG.GetPath("Captures") + "dump.saz";
				return true;

			default:
				if (sAction.StartsWith("http") || sAction.StartsWith("www.")) {
					System.Diagnostics.Process.Start(sParams[0]);
					return true;
				}
				else
				{
					FiddlerObject.StatusText = "Requested ExecAction: '" + sAction + "' not found. Type HELP to learn more.";
					return false;
				}
		}
	}
}
