let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

var users = 0;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // users++;
    // console.log("a user connected", socket.id);
    // console.log("number of users online: ", users);

    // socket.on("disconnect", () => {
    //     users--;
    //     console.log("user ", socket.id, " disconnected");
    //     console.log("number of users online: ", users);
    // });

    // socket.on("message", (data) => {
    //     console.log(data);
    //     io.emit("incoming", data);
    // })

    let userCount = socket.client.conn.server.clientsCount;
    console.log( "user connected, " + userCount + " users connected" );
    io.emit("newConnect", userCount);
    socket.on("clientHour", (clientHour)=>{
        console.log("client hour: " + clientHour);
        io.emit('allTimes', clientHour);
    })

    socket.on('screenshot', (screenshot) => {
        console.log("a new screenshot message has been sent");
        // screenshot[0].imageData.replace("data:image/octet-stream", 'image/png');
        // EDIT THIS BECAUSE DIFFERENT INFO IS COMING IN
        console.log(screenshot);
        io.emit('newMsg', screenshot);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected, ' + userCount + " users connected");
        io.emit("newConnect", userCount);
    });
});

http.listen(3000, () => {
  console.log(`listening on 3000`);
});


// check if submit button pressed

// if pressed, take picture of sketch

// if picture is there, allow drag and drop

// upon drop in dropzone, send picture to sockets

// 