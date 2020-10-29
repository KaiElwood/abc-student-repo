console.log("Hello!");

removedCows = [];

function deleteCows(details){
    if (details.url.indexOf('http') !== 0){
        return;
    }
    // console.log(details.url);
    // var pathname = getLocation(details.url).pathname;

    // var images = document.querySelectorAll("img");
    // console.log(images);

    if(details.url.toLowerCase().indexOf('cow') !== -1){
        console.log("Cow intercepted: " + details.url);
        console.log(`Added cow to database at this url ${details.url}`);
        if (removedCows.includes(`${details.url}`) == false){
            removedCows.push(details.url);
        }
        console.log(removedCows);

        console.log("Adding filter");
        var selectedE = document.querySelectorAll(`img[src='${details.url}'`);
        console.log(selectedE);
        // console.log(selectedE.style.display);
        return {cancel: true};
    }
}
chrome.webRequest.onBeforeRequest.addListener(deleteCows,
  // filters
{
urls: ['<all_urls>'],
types: ["image"]
},
  // extraInfoSpec
["blocking"]);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request);
        if(request.type == 'getCows'){
            sendResponse({type: "removedCows", cows: removedCows})
        }
    }
)

// get existing photos
// check to see if they include cow
// if include cow, add filter


// add class with blur filter to existing cow photos
// get cow photo link
// display blocked cows in browser