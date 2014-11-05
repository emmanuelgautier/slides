'use strict';

module.exports = function(io) {
  var chatNsp = io.of('/chat');

  chatNsp.on('connection', function(socket) {
    socket
      .on('room', function(room) {
        socket.join(room);
      })
      .on('message', function(message) {
        socket.to(message.room).emit('message', message.message);
      });
  });
};
