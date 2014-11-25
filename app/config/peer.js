'use strict';

var ExpressPeerServer = require('peer').ExpressPeerServer;

module.exports = function(app, server, sessionStore, config) {
  app.use(config.peer.path, new ExpressPeerServer(server, config.peer.options));
};