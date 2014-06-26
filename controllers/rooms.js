'use strict';

var mongoose = require('mongoose');
var Room = mongoose.model('Room');

exports.list = function(req, res) {
  Room.find({ public: true }, function(err, rooms) {
    if(err) { return; }

    res.render('rooms/list', {
      title: 'Salles publiques',
      rooms: rooms
    });
  });
};
