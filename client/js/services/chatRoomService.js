// // custom scripts

// var socket = io();

// $('#chatForm').hide();

// // Grab the value of the initial user name.
// $('#socketform').submit(function() {
//   socket.emit('setName',$('#m').val());
//   $('#m').val('');
//   $('#socketform').hide();
//   return false;
// });

// // Grab the value of the person they want to invite.
// $('#privateForm').submit(function() {
//     socket.emit('createRoom', $('#p').val(), $('#r').val());
//     $('#p').val('');
//     $('#r').val('');
//     $('#chatForm').show();
//     $('#privateForm').hide();
//     return false;
// });

// // Grab the value of the message that is being sent.
// $('#chatForm').submit(function() {
//     socket.emit('chat message', $('#t').val());
//     $('#t').val('');
//     return false;
// });

// // Append the join me message link to the screen.
// socket.on('privateChat', function(msg) {
//     $('#message').append($('<li>').html(msg));
// });

// // Console log the messsage
// socket.on('private', function(msg) {
//     console.log(msg);
// });

// // Apped the message to the screen.
// socket.on('chat message', function(msg) {
//   $('#message').append($('<li>').text(msg));
// });


'use strict';
app.factory('chatSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  return socket;
});

app.value('messageFormatter', function(date, nick, message) {
  return date.toLocaleTimeString() + ' - ' + nick + ' - ' + message + '\n';
});