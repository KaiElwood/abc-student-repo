// alert("working")
var introtxt = 'Good Day Noble Sire. Thou hast arriveth upon the page of web known as the "Elwood-Dieu" page.'
var speed = 30; /* The speed/duration of the effect in milliseconds */
var holyPlace = "This site beith a holy place, whereupon gifts from my creator have been graciously bestowed."
var feast = "Feast your eyes below."
var hand = document.getElementById("hand");
var i = -1300;

function typeWriter(inputtxt) {
  
    [...inputtxt].forEach(function(letter, index){
        console.log(letter + " " + index);
        setTimeout(function() {
            document.getElementById("intro").innerHTML += inputtxt.charAt(index-1);
            console.log(inputtxt.charAt(index-1));
            
        }, speed*index);
    })
    document.getElementById("intro").innerHTML += "<br>" + "<br>";
}

setTimeout(function() {typeWriter(introtxt)}, 2600);
setTimeout(function() {typeWriter(holyPlace);}, 5900);
setTimeout(function() {typeWriter(feast);}, 9500);

setInterval(addHandPadding, 50);

function addHandPadding(){
    debugger;
    i += 1;
    if (i > window.innerHeight){
        clearInterval;
    }
    console.log(hand.style.top);
    hand.style.top = i + "px";
}

hand.addEventListener("click", function(){
    i = -1300;
});