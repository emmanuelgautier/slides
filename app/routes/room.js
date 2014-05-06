'use strict';

var room = require('../controllers/room');

module.exports = function(app) {
  app.get('/room/create', room.create);
};