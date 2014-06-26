'use strict';

var mongoose = require('mongoose');
var Room = mongoose.model('Room');

exports.create = function(req, res, next) {
  var room = new Room();
  room.name = require('../fun').haiku();
  room.description = 'A new room';
  room.save(function(err, room){
    if (err) {
      next(new Error('Something wrong happened while creating your room'));
    } else {
      res.redirect('/room/' + room.token);
    }
  });
};

exports.show = function(req, res, next) {

  Room.find({ token: req.params.token }, function(err, room) {
    if(room.length) {
      res.render('room/show', {
        title: room[0].name,
        room: room[0]
      });
    } else {
      next();
    }
  });
};
