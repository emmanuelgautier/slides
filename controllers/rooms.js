'use strict';

var mongoose = require('mongoose');
var Room = mongoose.model('Room');

exports.list = function(req, res) {
  Room.list({}, 20, 0, function(err, rooms) {
    if(err) { return; }

    res.render('rooms/list', {
      title: 'Liste de room',
      rooms: rooms
    });
  });
};
