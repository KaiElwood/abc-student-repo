console.log("Working");

const button = document.getElementById("answerButton");
const input = document.getElementById("guessAnswer");
const giveUp = document.getElementById("giveUp");
const guessAgain = document.getElementById("continue");
const popup = document.getElementById("popup");
const answer = document.getElementById("answer");


button.addEventListener("click", () => {
    var guess = input.value.toLowerCase();
    console.log(guess);
    window.location.href = "/" + guess;
    console.log(window.location.href);
    input.value = "";
});

giveUp.addEventListener("click", () =>{
    giveUp.classList.add("d-none");
    guessAgain.classList.add("d-none");
    input.classList.add("d-none");
    answerButton.classList.add("d-none");
    answer.classList.remove("invisible");
})

guessAgain.addEventListener("click", () => {
    QBlock.classList.remove("d-block");
    QBlock.classList.add("d-none");
})