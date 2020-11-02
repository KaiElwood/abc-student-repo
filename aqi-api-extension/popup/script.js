const getCity = document.getElementById("getCity");
const getIP = document.getElementById("getIP");
const city = document.getElementById("city");

getCity.addEventListener("click", () => {
    var city = city.value;
    var color = "black";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: `
            setTimeout(function(){
                    alert("Your timer on this page has expired, would you like to close it?")
                }, ${hours * 60000});
            `});
      });
    // reminder(hours);
    input.value = null;
    submit.innerHTML = "Timer has been set!"
    setTimeout(function(){
        submit.innerHTML = "Set Timer";
    }, 2000)
});



function reminder(hours){
    setTimeout(function(){
        alert("Your timer on this page has expired, would you like to close it?")
    }, hours * 60000);
}