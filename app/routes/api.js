'use strict';

var express = require('express'),
    router = express.Router();

var room = require('../controllers/room');

router
  .get('/room/', room.api.list)
  .post('/room/', room.api.create)
  .get('/room/:token', room.api.show);
  //.put('/room/:token', room.api.update),
  //.delete('/room/:token', room.api.delete);

module.exports = {
  use: '/api',
  router: router
};
