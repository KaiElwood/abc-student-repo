console.log("Working");

const button = document.getElementById("answerButton");
const input = document.getElementById("guessAnswer");


button.addEventListener("click", () => {
    var guess = input.value;
    console.log(guess);
    window.location.href = window.location.href + guess;
    console.log(window.location.href);
})