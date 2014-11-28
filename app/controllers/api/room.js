'use strict';

var mongoose = require('mongoose'),
    Room     = mongoose.model('Room');

exports.list = function(req, res, next) {
  Room.find({ public: true }, function(err, rooms) {
    if(err) { next(err); }

    res.json(rooms);
  });
};

exports.show = function(req, res, next) {
  Room.findOne({ token: req.params.token }, function(err, room) {
    if(err) { next(err); }

    if(room) {
      res.json(room);
    } else {
      next();
    }
  });
};

exports.create = function(req, res, next) {
  var room = new Room();
    room.name        = req.param('name');
    room.description = 'A new room';
    room.master      = req.user.id;

  room.save(function(err, room) {
    if (err) { next(err); }

    res.json(room);
  });
};

exports.update = function(req, res, next) {
  //
};

exports.delete = function(req, res, next) {
  //
};
