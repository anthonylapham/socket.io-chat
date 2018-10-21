const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const people = {};


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

//broadcast to users that someone is typing
io.on('is typing', function(data){
  io.emit('typing');
});

io.on('connection', (socket) => {
  socket.on('chat message', function(msg) {
    //people[client.id] = name;
    io.emit('chat message', msg);
    //socket.sockets.emit('update,' + name + 'has joined!');
  });
  console.log('A user connected');
  socket.on('disconnect', () => {
    //socket.sockets.emit('update,' + name + 'has left the chat');
    console.log('User disconnect');
  });
});



http.listen(3000, function() {
  console.log('listening on *:3000');
});
