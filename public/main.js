$(function() {
  const socket = io();
  $('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('m').val('');
    return false;
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('userHasJoined', function(message) {
    alert(message);
  })

});

$('#m').keyup(function(e){
  if(e.keyCode === 13){
    socket.emit('send', {msg: $('#messages').val()});
  }
  else{
    socket.emit('user is typing', {msg: $('#messages').val()});
  }
});
