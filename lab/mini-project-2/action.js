let button = document.getElementById("button");
let i = 0;
var timer;

function openwindow(site, close, top, left) {
    // console.log("hey")
    var win = window.open(site, "_blank", `toolbar=no,left=${left}, top=${top},
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=yes,
                                    width=100px,
                                    height=100px`);
    if (close ==true){
        setTimeout(() => { win.close(); }, getInt(5000, 10000));
    }
};

button.addEventListener("click", () => {
    i++;
    if (i == 1){
        openwindow("https://www.youtube.com/watch?v=yIQd2Ya0Ziw&ab_channel=Calm", false);
    };
    if (i%2 > 0){
        makeItRain("waterfall.html");
    } else {
        stopItRain();
    };
    setInterval(() => { stopItRain(); i = 0;}, 10000);
    // console.log(timer);
    // console.log(i);
    
});


function makeItRain(site) {
    if (!timer){
        timer = setInterval(function () { 
            leftInt = getInt(100, 1200);
            topInt = getInt(0, 700)
            console.log(leftInt, topInt);
            openwindow(site, true, topInt, leftInt) 
        }, 700);
    }

    button.innerHTML = "Stop the Rain!"
    // return timer;
}

function stopItRain(){
    clearInterval(timer);
    timer = false;
    button.innerHTML = "Make it Rain!"
}

function getInt(minimum, maximum) {
    maximum = Math.floor(maximum);
    minimum = Math.ceil(minimum);
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
}