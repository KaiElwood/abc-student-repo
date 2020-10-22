let button = document.getElementById("increaseButton");

let valueDisplay = document.getElementById("currentValue");

let currentValue = 0;

button.addEventListener("click", function(){
    currentValue++;
    valueDisplay.innerHTML = currentValue;
});

chrome.runtime.sendMessage( {type: "getCurrentValue"}, function(response){
    console.log("res is "+ response);
} );