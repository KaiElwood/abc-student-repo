console.log("Hello!");
let socket = io();
let width = window.outerWidth;
let height = window.outerHeight;

let emojis = document.getElementsByClassName("emoji-button");

for (var i = 0; i < emojis.length; i++) {
    // console.log(i);
    emojis[i].addEventListener('click', (e) => {
        let value = e.target.innerHTML;
        console.log(value);
        console.log(width, " ", height);
        let emojiHeight = Math.random() * height;
        let emojiWidth = Math.random() * width;
        let emoji = {e: value, h: emojiHeight, w: emojiWidth};
        socket.emit('message', emoji);
    });
}

// var myFunction = function () {
    
// }

socket.on("incoming", (emoji)=>{
    console.log(emoji);
    let emojiHeight = emoji.h;
    let emojiWidth = emoji.w;
    let value = emoji.e;
    let p = document.createElement("p");
    p.innerHTML = value;
    p.setAttribute("style", `top: ${emojiHeight}px; left: ${emojiWidth}px`);
    p.classList.add("emoji");
    document.body.appendChild(p);
})