const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 2000;

// dynamic map contains all current user<socket.id><{location,username}>
let currentPlayers = new Map();

io.on('connection', socket => { 
    console.log(`new client connected! ${socket.id}`);

    // new user event
    socket.on('new-user',(data)=>{
        currentPlayers.set(socket.id,data);
        //emit update event to return all currentPlayers
        socket.broadcast.emit("update-players",currentPlayers)
    });

    // event when a user move
    socket.on("move",(data)=>{
        currentPlayers.set(socket.id,data)
        //emit update event to return all currentPlayers
        socket.broadcast.emit("update-players",currentPlayers)
    })

    socket.on('disconnect',()=>{
       //delete user on disconnect
       currentPlayers.delete(socket.id)
       //emit update event to return all currentPlayers
       socket.broadcast.emit("update-players",currentPlayers)
      })
 });

server.listen(port,()=>{
    console.log(`server listening on port http://localhost:${port}`);
});