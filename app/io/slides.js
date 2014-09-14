'use strict';

module.exports = function(io) {
  var slidesNsp = io.of('/slides');

  slidesNsp.on('connection', function(socket){
    socket
      .on('room', function(room) {
        socket.join(room);
      })
      .on('next', function(slide) {
        socket.to(slide.room).emit('next');
      })
      .on('previous', function(slide) {
        socket.to(slide.room).emit('previous');
      })
      .on('first', function(slide) {
        socket.to(slide.room).emit('first');
      })
      .on('last', function(slide) {
        socket.to(room).emit('last');
      })
      .on('to', function(slide) {
        socket.to(slide.room).emit('to', slide.to);
      });
  });
};
