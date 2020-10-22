console.log("Hello!");

function gotMessage(req, sender, res){
    console.log(request);
}
chrome.runtime.onMessage.addListener(gotMessage);