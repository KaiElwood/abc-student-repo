let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

var users = 0;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
// res.send("<h1>Hello<h1>")
});

io.on('connection', (socket) => {
    users++;
    console.log("a user connected", socket.id);
    console.log("number of users online: ", users);

    socket.on("disconnect", () => {
        users--;
        console.log("user ", socket.id, " disconnected");
        console.log("number of users online: ", users);
    });

    socket.on("message", (data) => {
        console.log(data);
        io.emit("incoming", data);
    })
});

// var port = process.env.PORT || 3000;
// app.listen(port, function(){
//     console.log(`Server started! at port ${port}`);
    
// });

http.listen(3000, () => {
  console.log(`listening on 3000`);
});