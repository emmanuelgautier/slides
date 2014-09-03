'use strict';

module.exports = function(io) {
  var chatNsp = io.of('/chat');

  chatNsp.on('connection', function(socket){
    console.log(socket);
  });
};
