'use strict';

module.exports = function(io) {
  var slidesNsp = io.of('/slides');

  slidesNsp.on('connection', function(socket){
    console.log(socket);
  });
};
