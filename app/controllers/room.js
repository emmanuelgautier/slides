'use strict';

var mongoose = require('mongoose');
var Room = mongoose.model('Room');

exports.create = function(req, res, next) {
  exports.api.create(req, res, next, function(room){
    res.redirect('/room/' + room.token);
  });
};

exports.list = function(req, res, next) {
  exports.api.list(req, res, next, function(rooms){
    res.render('rooms/list', {
      rooms: rooms
    });
  });
};

exports.show = function(req, res, next) {
  exports.api.show(req, res, next, function(room){
    res.render('room/show', {
      title: room[0].name,
      room: room[0]
    });
  });
};

exports.api = {
  create: function(req, res, next, callback){
    callback = (!callback || typeof callback != 'function') ? function(d){ res.json(d); } : callback;

    var room = new Room();
      room.name = require('../fun').haiku();
      room.description = 'A new room';
      room.save(function(err, room){
        if (err) {
          next(new Error('Something wrong happened while creating your room'));
        } else {
          callback(room);
        }
      });
  },

  list: function(req, res, next, callback){
    callback = (!callback || typeof callback != 'function') ? function(d){ res.json(d); } : callback;

    Room.find({ public: true }, function(err, rooms) {
      if(err) { return; }

      callback(rooms);
    });
  },

  show: function(req, res, next, callback){
    callback = (!callback || typeof callback != 'function') ? function(d){ res.json(d); } : callback;

    Room.find({ token: req.params.token }, function(err, room) {
      if(room.length) {
        callback(room);
      } else {
        next();
      }
    });
  }
};
