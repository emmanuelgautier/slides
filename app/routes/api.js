'use strict';

var express = require('express'),
    router  = express.Router(),

    room    = require('../controllers/api/room');

router
  .get('/rooms/',          room.list)
  .get('/rooms/:token',    room.show)
  .post('/rooms/',         room.create)
  .put('/rooms/:token',    room.update)
  .delete('/rooms/:token', room.delete);

module.exports = {
  use: '/api',
  router: router
};
