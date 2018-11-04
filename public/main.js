let userName = '';

$(function() {
  const socket = io();
  userName = prompt('Enter your username');

  $('form').submit(function() {
    socket.emit('sendMessage',`${userName}: ${$('#m').val()}`);
    $('#messages').append(`<li class="myMessage">Me: ${$('#m').val()}</li>`);
    $('#m').val('');
    return false;
  });

  $('#m').keyup(function(e) {
    if(e.keyCode === 13){
      return;
    }
    else{
      _.debounce(socket.emit('userIsTyping', userName), 500)
    }
  });

  socket.on('receiveMessage', function(msg) {
    $('#messages').append(`<li>${msg}</li>`);
  });

  socket.on('alerts', function(message) {
    const el = document.getElementById('alerts');
    el.innerText = message;
    setTimeout(function() {
      el.innerText = '';
    }, 3000);
  })

});
