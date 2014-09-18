'use strict';

module.exports = function(io) {
  var user = {},

      slidesNsp = io.of('/slides');

  slidesNsp.on('connection', function(socket){
    user[socket.id] = {
      id: null,
      room: {}
    };

    socket
      .on('user', function(user) {
        user[socket.id].id = user;
      })
      .on('room', function(room) {
        user[socket.id].room[room] = {};

        socket.join(room);
      })
      .on('to', function(slide) {
        socket.broadcast.to(slide.room).emit('to', slide.to);
      });
  });
};
