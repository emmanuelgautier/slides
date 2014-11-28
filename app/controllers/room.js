'use strict';

var mongoose = require('mongoose'),
    Room     = mongoose.model('Room');

exports.create = function(req, res) {
  if(!req.user) { return res.redirect('/login'); }

  res.render('room/create', {
    user: req.user
  });
};

exports.saveCreate = function(req, res, next) {
  if(!req.user) { return res.redirect('/login'); }

  var room = new Room();
    room.name        = req.param('name');
    room.description = 'A new room';
    room.master      = req.user.id;

  room.save(function(err, room) {
    if (err) { next(err); }

    res.redirect('/room/' + room.token);
  });
};

exports.list = function(req, res, next) {
  Room.find({ public: true }, function(err, rooms) {
    if(err) { next(err); }

    res.render('room/list', {
      user: req.user || null,
      rooms: rooms
    });
  });
};

exports.show = function(req, res, next) {
  Room.findOne({ token: req.params.token }, function(err, room) {
    if(err) { next(err); }

    if(room) {
      res.render('room/show', {
        title: room.name,
        user: req.user || null,
        room: room
      });
    } else {
      next();
    }
  });
};
