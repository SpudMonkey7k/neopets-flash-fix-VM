# skarl fix only
def request(flow: http.HTTPFlow) -> None:
    if "neopets.com" in flow.request.host:
        if flow.request.url.endswith('/medieval/grumpyking.phtml'):
            flow.request.url = flow.request.url + '/'


def response(flow: http.HTTPFlow) -> None:
    url = flow.request.pretty_url
    if "neopets.com" in flow.request.host and flow.response is not None and flow.response.content is not None:
        if "grumpyking.phtml" in url:
            flow.response.content = flow.response.content.replace(b'</script>', b'function randomizeAnswer(){for(var e=1;e<=8;e++){var n=document.getElementById("ap"+e),o=Math.floor(Math.random()*(n.getElementsByTagName("option").length-1))+1;n.selectedIndex=o}}function randomizeQuestion(){for(var e=1;e<=10;e++){var n=document.getElementById("ap"+e),o=Math.floor(Math.random()*(n.getElementsByTagName("option").length-1))+1;n.selectedIndex=o}}document.addEventListener("DOMContentLoaded",function(){randomizeQuestion(),randomizeAnswer()},!1);</script>', 1)