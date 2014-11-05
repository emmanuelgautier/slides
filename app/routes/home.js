'use strict';

var express = require('express'),
    router  = express.Router(),

    home 	= require('../controllers/home');

router.get('/', home.home);

module.exports = {
  use: '/',
  router: router
};
