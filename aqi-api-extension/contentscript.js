console.log("Hello!");

function gotMessage(req, sender, res){
    console.log("Listening");
}
chrome.runtime.onMessage.addListener(gotMessage);