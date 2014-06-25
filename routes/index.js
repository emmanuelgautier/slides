'use strict';

var express = require('express');
var router = express.Router();

var index = require('../controllers/index');

router.get('/', index.home);

module.exports = router;
