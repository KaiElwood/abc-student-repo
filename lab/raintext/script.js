let range = document.getElementById("myRange");
let content = document.getElementById("content");

let text = content.innerHTML;

console.log(text);

let letters = text.split("");
console.log(letters);

let letterSpans = letters.map((letter) => {
    return "<span>" + letter + "</span>"
});

let joinedSpans = letterSpans.join("");
console.log(joinedSpans);

content.innerHTML = joinedSpans;

let spanTags = document.getElementsByTagName("span");

let letterAdd = 

range.addEventListener("input", ()=>{
    let value = range.value;
    for(i=0; i<spanTags.length; i++){
        spanTags[i].style.top = value*(Math.random()*5) + "px";
    }
})