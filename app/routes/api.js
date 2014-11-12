'use strict';

var express = require('express'),
    router  = express.Router(),

    room 	= require('../controllers/room');

router
  .get('/rooms/',          room.api.list)
  .post('/rooms/',         room.api.create)
  .get('/rooms/:token',    room.api.show)
  .put('/rooms/:token',    room.api.update)
  .delete('/rooms/:token', room.api.delete);

module.exports = {
  use: '/api',
  router: router
};
