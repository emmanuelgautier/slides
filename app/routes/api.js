'use strict';

var express = require('express'),
    router = express.Router();

var room = require('../controllers/room');

router
  .get('/room/', room.api.list)
  .get('/room/create', room.api.create)
  .get('/room/:token', room.api.show);

module.exports = {
  use: '/api',
  router: router
};
