'use strict';

var express = require('express'),
    router  = express.Router(),

    room    = require('../controllers/api/room'),
    user    = require('../controllers/api/user');

router
  .get('/rooms/',          room.list)
  .get('/rooms/:token',    room.show)
  .post('/rooms/',         room.create)
  .put('/rooms/:token',    room.update)
  .delete('/rooms/:token', room.delete);

router
  .get('/users/',             user.list)
  .get('/users/me',           user.me)
  .get('/users/:username',    user.show)
  .put('/users/:username',    user.update)

  .get('/users/:username/image',            user.image.show)
  .get('/users/:username/image/gravatar',   user.image.gravatar)
  .post('/users/:username/image',           user.image.create)
  .get('/users/:username/image/album/:id',  user.image.album);

module.exports = {
  use: '/api',
  router: router
};
