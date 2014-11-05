'use strict';

var express = require('express'),
    router  = express.Router();

var room 	= require('../controllers/room');

router
  .get('/', room.list)
  .get('/create', room.create)
  .post('/create', room.saveCreate)
  .get('/:token', room.show);

module.exports = {
  use: '/room',
  router: router
};
