console.log("working on this website!")

function replace(word1, word2){
    // let regEx = new RegExp(word1, "g");
    console.log(word1)
    document.body.innerHTML = document.body.innerHTML.replace(`/${word1}/g`, word2)
}

replace("moon", "potato");