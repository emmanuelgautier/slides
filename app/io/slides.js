'use strict';

module.exports = function(io) {
  var slidesNsp = io.of('/slides');

  slidesNsp.on('connection', function(socket){
    socket
      .on('room', function(room) {
        socket.join(room);
      })
      .on('next', function(slides) {
        socket.to(slides.room).emit('next');
      })
      .on('previous', function(slides) {
        socket.to(slides.room).emit('previous');
      })
      .on('first', function(slides) {
        socket.to(slides.room).emit('first');
      })
      .on('last', function(slides) {
        socket.to(slides.room).emit('last');
      })
      .on('to', function(slides) {
        socket.to(slides.room).emit('to', slides.to);
      });
  });
};
