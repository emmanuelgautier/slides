'use strict';

var mongoose = require('mongoose'),
    Room     = mongoose.model('Room');

var fn = {
  create: function(req, next, callback) {
    var room = new Room();
      room.name = req.param('name');
      room.description = 'A new room';
      room.master = req.user.id;
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

exports.create = function(req, res) {
  if(!req.user){ return res.redirect('/login'); }

  res.render('room/create', {
    user: req.user
  });
};

exports.saveCreate = function(req, res, next) {
  if(!req.user){ return res.redirect('/login'); }

  fn.create(req, next, function(room) {
    res.redirect('/room/' + room.token);
  });
};

exports.list = function(req, res, next) {
  fn.list(next, function(rooms) {
    res.render('room/list', {
      user: req.user,
      rooms: rooms
    });
  });
};

exports.show = function(req, res, next) {
  fn.show(req, next, function(room) {
    res.render('room/show', {
      title: room.name,
      user: req.user,
      room: room
    });
  });
};

exports.api = {
  create: function(req, res, next) {
    if (!req.user) { res.send(401); }

    fn.create(req, next, function(room) {
      res.json({ token: room.token });
    });
  },

  list: function(req, res, next) {
    fn.list(next, function(rooms) {
      res.json(rooms);
    });
  },

  show: function(req, res, next) {
    fn.show(req, next, function(room) {
      res.json(room);
    });
  },

  update: function() {
    //
  },

  delete: function() {
    //
  }
};
