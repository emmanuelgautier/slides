'use strict';

var room = require('../controllers/room');

module.exports = function(app) {
  app.get('/room/create', room.create);

  app.get('/room/:token', room.show);

  app.get('/rooms/', room.list);
};