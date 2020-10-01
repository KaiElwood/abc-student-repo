let button = document.getElementsById("button");

button.addEventListener("click", () => {
    makeItRain();
});



function makeItRain(){
    setInterval(function(){openwindow()}, 500);
}

function openwindow(){
    window.open()
}