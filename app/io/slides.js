'use strict';

module.exports = function(io) {
  var slidesNsp = io.of('/slides');

  slidesNsp.on('connection', function(socket){
    socket
      .on('room', function(room) {
        socket.join(room);
      })
      .on('next', function(slide) {
        if(typeof slide === 'object')
          socket.to(slide.room).emit('next');
      })
      .on('previous', function(slide) {
        if(typeof slide === 'object')
          socket.to(slide.room).emit('previous');
      })
      .on('first', function(slide) {
        if(typeof slide === 'object')
          socket.to(slide.room).emit('first');
      })
      .on('last', function(slide) {
        if(typeof slide === 'object')
          socket.to(room).emit('last');
      })
      .on('to', function(slide) {
        if(typeof slide === 'object')
          socket.to(slide.room).emit('to', slide.to);
      });
  });
};
