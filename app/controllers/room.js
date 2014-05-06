'use strict';

var mongoose = require('mongoose'),
    Room = mongoose.model('Room');

exports.create = function(req, res) {
  var room = new Room({});
      room.key = 'toto';

  room.save(function(err, room){
    if (err) {
      res.redirect('/');
      return console.error(err);
    } else {
      res.redirect('/room/' + room.key);
    }
  });
};

exports.show = function(req, res) {
  res.render('room/show', {
    title: 'ma room'
  });
};