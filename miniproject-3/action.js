let main = document.getElementById("main");

for (i = 0; i<10; i++){
    for (j= 0; j<10; j++){
        let element = document.createElement("div");
        element.classList.add("block");
        main.appendChild(element);
    };
};

let height = window.innerHeight - 100;
let width = window.innerWidth - 100;
let gutters = 50;
let block = document.getElementsByClassName("block");
let blockSize = (width/20);

for(i=0; i< block.length; i++){
    block[i].style.width = blockSize + "px";
    block[i].style.height = blockSize +"px";
    block[i].style.margin = gutters + "px";
};

Array.from(block).forEach(function (element) {
    element.addEventListener('click', function(){
        console.log("clicked");
        this.style.visibility = "hidden";
    });
});

window.addEventListener("resize", () => {
    height = window.innerHeight;
    width = window.innerWidth;
    for (i = 0; i < block.length; i++) {
        block[i].style.width = blockSize + "px";
        block[i].style.height = blockSize + "px";
        block[i].style.margin = gutters + "px";
    };
});

function displayBlock(){
    block.style.width = "width/10 - gutters * 12";
    block.style.height = "height/10 - gutters * 12";
    for (i = 0; i<10; i++){
        for (j= 0; j<10; j++){
            let element = document.createElement("div");
            element.classList.add("block");
            main.appendChild(element);
        };
    };
};