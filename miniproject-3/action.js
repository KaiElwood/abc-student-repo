let main = document.getElementById("main");

for (i = 0; i<10; i++){
    for (j= 0; j<10; j++){
        let element = document.createElement("div");
        element.classList.add("block");
        main.appendChild(element);
    }
}

let height = window.innerHeight;
let width = window.innerWidth;
let gutters = 5;
let block = document.getElementsByClassName("block");
let blockSize = (width/10 - gutters *12);
console.log(blockSize)

for(i=0; i< block.length; i++){
    block[i].style.width = blockSize + "px";
    block[i].style.height = "20px";
    block[i].style.margin = gutters + "px";
};
// document.getElementsByClassName("block")[0].style.width("20px");

// console.log(document.getElementsByClassName("block").forEach((e) => {
//     e.style.width("20px")
// }));
// block.style.height = "height/10 - gutters * 12";

window.addEventListener("resize", () => {
    height = window.innerHeight;
    width = window.innerWidth;
    displayBlock();
});

function displayBlock(){
    block.style.width = "width/10 - gutters * 12";
    block.style.height = "height/10 - gutters * 12";
    for (i = 0; i<10; i++){
        for (j= 0; j<10; j++){
            let element = document.createElement("div");
            element.classList.add("block");
            main.appendChild(element);
        }
    }
}