// console.log("Hello, the server is working");

// requires express
const express = require('express');
var path = require("path");
const app = express();

// opens local port on computer
const port = 3000;

// set view engine as EJS for easy page building
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// set public folder
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    console.log(req.params);
    // if (req.params)
    res.render('pages/home');
    // console.log(req);
    // console.log(res);
    // app.get()
});

// if there is a request to the port, console that the server is active
app.listen(port, () => {
    console.log(`App is active! at port ${port}`);
})