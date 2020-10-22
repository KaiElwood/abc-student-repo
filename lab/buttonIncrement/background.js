console.log("This is the background");

let currentValue = 10;

chrome.runtime.onMessage.addListener(function(messageContent, sender, res){
    console.log(messageContent);
    if (messageContent.type == "getCurrentValue"){
        sendResponse({type:"currentValue", value: currentValue});
    };
})