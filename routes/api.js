'use strict';

var express = require('express'),
    router = express.Router();

var room = require('../controllers/room');
//TODO: add api routes

module.exports = {
  use: '/api',
  router: router
};
