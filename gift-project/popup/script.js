const yes = document.getElementById("yes");
const no = document.getElementById("no");
const message = document.getElementById("message");
const cows = document.getElementById("cows");
let cowImages;

// get current cows
chrome.runtime.sendMessage({type: "getCows"}, function(res){
    console.log("cows: ", res);
    cowImages = res.cows;
    // console.log(cowImages);
    addCows(res.cows);
});

yes.addEventListener("click", () => {
    if(cows.style.display = "none"){
        cows.style.display = " unset";
    }
    message.innerHTML = "You are so, so brave."
});

no.addEventListener("click", () => {
    if(cows.style.display = "unset"){
        cows.style.display = "none";
    };
    message.innerHTML = "Don't worry, you made the right call. Cows are scary. If you change your mind, feel free to hit the other button at any time – but be warned, COWS ARE NOT TO BE TRIFLED WITH"
});

function addCows(imgs){
    imgs.forEach(function(img){
        var elem = document.createElement("img");
        elem.setAttribute("src", `${img}`);
        cows.appendChild(elem);
    });
}