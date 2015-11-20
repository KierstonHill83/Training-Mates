var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '_config'));

var io = require('socket.io')(connectionString);

var rooms = [];

// Set the socket to the name that is entered. This is the username.
io.on('connection', function(socket) {
  socket.on('setName', function(name) {
    socket.name = name;
    console.log(socket.name);
  });

  // Create a room that is named the name of the user. Push that into the rooms array so it can be saved and accessed easily. Join that room. Loop through the sockets that are connected and if the name equals the name of the invitee, invite them to the private room.
  socket.on('createRoom', function(name, invitee) {
    socket.room = name;
    rooms.push(name);
    socket.join(name);

    for (a in io.sockets.connected) {
      if (io.sockets.connected[a].name === invitee) {
        // In the second input, put the name of the person you want the link sent to. It will send as long as they are connected.
        io.socket.connected[a].emit('privateChat', '<a onclick="socket.emit(\'joinRoom\', \''+name+'\')">Join '+ socket.name +'\'s private chat</a>');
        break;
      }
    }
  });

  // Join that private room.
  socket.on('joinRoom', function(name) {
    socket.room = name;
    socket.join(name);
  });

  // Send the messages between the 2 users.
  socket.on('chat message', function(msg) {
    io.sockets.in(socket.room).emit('chat message', msg);
  });
});


module.exports = router;