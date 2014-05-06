'use strict';

var mongoose = require('mongoose'),
    Room = mongoose.model('Room');

exports.create = function(req, res) {
  var room = new Room();

  room.save(function(err, room){
    if (err) {
      res.redirect('/');
      return console.error(err);
    } else {
      res.redirect('/room/' + room.token);
    }
  });
};

exports.show = function(req, res) {
  Room.find({ token: req.query.token }, function(err, room) {
    if(err) {
      res.status(404).render('404', { title: '404' });
    }

    res.render('room/show', {
      title: 'ma room',
      room: room
    });
  });
};

exports.list = function(req, res) {
  Room.list({}, 20, 0, function(err, rooms) {
    if(err) {
      return;
    }

    res.render('room/list', {
      title: 'Liste de room',
      rooms: rooms
    });
  });
};