// console.log("Hello, the server is working");

// requires express
const express = require('express');
const app = express();

// opens local port on computer
const port = 3000;

// for every request to the url without any addition specifications
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// if there is a request to the port, console that the server is active
app.listen(port, () => {
    console.log(`App is active! at port ${port}`);
})