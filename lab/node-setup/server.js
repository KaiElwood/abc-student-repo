// console.log("Hello, the server is working");

// requires express
const { randomInt } = require('crypto');
const express = require('express');
var path = require("path");
const app = express();

// opens local port on computer
const port = 3000;

// set view engine as EJS for easy page building
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

let riddles = [{ Q: "The more you take, the more you leave behind. What am I?", A: "footsteps" }, { Q: "What 8 letter word can have a letter taken away and it still makes a word. Take another letter away and it still makes a word. Keep on doing that until you have one letter left. What is the word?", A: "starting" }, { Q: "David's father has three sons: Snap, Crackle, and _____?", A: "david" }, { Q: "What room do ghosts avoid?", A: "the living room" }, { Q:"Mr. and Mrs. Mustard have six daughters and each daughter has one brother. How many people are in the Mustard family?", A:"9"}]
let words = [];
let secretWord = "";
let guesses = 0;
let selectedRiddle;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

// set public folder
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    selectedRiddle = riddles[getRandomInt(5)];
    console.log(selectedRiddle);
    secretWord = selectedRiddle.A;
    words = [];
    guesses = 0;
    // if (req.params)
    res.render('pages/home', { words, guesses, selectedRiddle });
    // console.log(req);
    // console.log(res);
    // app.get()
});

app.get('/:info', (req, res) => {
    console.log(req.params);
    guesses += 1;
    if (req.params.info === secretWord){
        res.render('pages/solved');
    } else {
        words.push(req.params.info);
        console.log(words)
        res.render('pages/home', { words, guesses, selectedRiddle });
    }
});

// if there is a request to the port, console that the server is active
app.listen(port, () => {
    console.log(`App is active! at port ${port}`);
})