'use strict';

var express = require('express'),
    router = express.Router();

var partials = require('../controllers/partials');

router.get(':name', partials);

module.exports = {
  use: '/partials',
  router: router
};
