'use strict';

var express = require('express');
var router = express.Router();

var rooms = require('../controllers/rooms');

router.get('/', rooms.list);

module.exports = router;
