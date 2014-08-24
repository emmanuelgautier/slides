'use strict';

var mongoose = require('mongoose'),
    Room = mongoose.model('Room');

var fn = {
  create: function(req, next, callback) {
    var room = new Room();
      room.name = req.param('name');
      room.description = 'A new room';
      room.save(function(err, room){
        if (err) {
          next(new Error('Something wrong happened while creating your room'));
        } else {
          callback(room);
        }
      });
  },

  list: function(next, callback) {
    Room.find({ public: true }, function(err, rooms) {
      if(err) { return; }

      callback(rooms);
    });
  },

  show: function(req, next, callback) {
    Room.findOne({ token: req.params.token }, function(err, room) {
      if(room) {
        callback(room);
      } else {
        next();
      }
    });
  }
};

exports.create = function(req, res, next) {
  fn.create(req, next, function(room){
    res.redirect('/room/' + room.token);
  });
};

exports.list = function(req, res, next) {
  fn.list(next, function(rooms){
    res.render('rooms/list', {
      rooms: rooms
    });
  });
};

exports.show = function(req, res, next) {
  fn.show(req, next, function(room){
    res.render('room/show', {
      title: room.name,
      room: room
    });
  });
};

exports.api = {
  create: function(req, res, next){
    console.log(req.body.name);
    fn.create(req, next, function(room) {
      res.json({token: room.token});
    });
  },

  list: function(req, res, next){
    fn.list(next, function(rooms) {
      res.json(rooms);
    });
  },

  show: function(req, res, next){
    fn.show(req, next, function(room) {
      res.json(room);
    });
  }
};
