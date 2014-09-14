'use strict';

module.exports = function(io) {
  var slidesNsp = io.of('/slides');

  slidesNsp.on('connection', function(socket){
    socket
      .on('room', function(room) {
        socket.join(room);
      })
      .on('to', function(slide) {
        socket.broadcast.to(slide.room).emit('to', slide.to);
      });
  });
};
