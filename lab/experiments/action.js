let range = document.getElementById("myRange");
let valueField = document.getElementById("myValue");
let numberValue = document.getElementById("num");

console.log("range", range);

let changeHappened = () => {
    console.log("what changed?")
    numberValue.innerHTML = range.value;
}

range.addEventListener("change", changeHappened);