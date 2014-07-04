'use strict';

var express = require('express'),
    router = express.Router();

var room = require('../controllers/room');

router
  .get('/create', room.create)
  .get('/:token', room.show)
  .get('/', function (req, res) {
    res.redirect('/rooms');
  });

module.exports = {
  use: '/room',
  router: router
};
