const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const people = {};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.broadcast.emit('alerts', 'A new user has joined!')

  socket.on('sendMessage', function(msg) {
    //people[client.id] = name;
    socket.broadcast.emit('receiveMessage', msg);
    //socket.sockets.emit('update,' + name + 'has joined!');
  });

  socket.on('disconnect', () => {
    //socket.sockets.emit('update,' + name + 'has left the chat');
    console.log('User disconnect');
  });

  //broadcast to users that someone is typing
  socket.on('userIsTyping', function(userName){
    socket.broadcast.emit('alerts', `${userName} is typing...`);
  });
});



http.listen(3000, function() {
  console.log('listening on *:3000');
});
