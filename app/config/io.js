'use strict';

var socket = require('socket.io');

module.exports = function(server, config) {
  var io = socket(server);

  require(config.root + '/app/io/slides')(io);
  require(config.root + '/app/io/chat')(io);
};
