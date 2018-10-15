const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnect');
  })
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});