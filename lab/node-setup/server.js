// console.log("Hello, the server is working");

// requires express
const express = require('express');
var path = require("path");
const app = express();

// opens local port on computer
var port = process.env.PORT || 3000;

// set view engine as EJS for easy page building
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// set public folder
app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.render('pages/home')
});

// if there is a request to the port, console that the server is active
app.listen(port, () => {
    console.log(`App is active! at port ${port}`);
})