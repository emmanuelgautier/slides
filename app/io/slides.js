'use strict';

var mongoose = require('mongoose'),
    Room     = mongoose.model('Room'),

    cookie   = require('cookie');

module.exports = function(io, sessionStore) {
  var _user = {},

      _room = {},

      slidesNsp = io.of('/slides');

  slidesNsp.on('connection', function(socket) {
    _user[socket.id] = {
      id: null,
      room: {}
    };

    var cookies = socket.request.headers.cookie;
    if(cookies) {
      var sessionId = cookie.parse(cookies)['connect.sid'];

      if(sessionId) {
        sessionId = sessionId.slice(2, sessionId.lastIndexOf('.'));

        sessionStore.get(sessionId, function(err, session) {
          if(session) {
            _user[socket.id].id = session.passport.user;
          }
        });
      }
    }

    socket
      .on('room', function(roomToken) {
        if(!_room[roomToken]) {
          Room.findOne({ 
            token: roomToken 
          }).select('+master').exec(function(err, room) {
            if(room) {
              _room[roomToken] = room;
              _user[socket.id].room[roomToken] = {};

              socket.join(roomToken);
            }
          });
        } else {
          _user[socket.id].room[roomToken] = {};

          socket.join(roomToken);
        }
      })
      .on('to', function(slide) {
        if(_room[slide.room] && 
            _room[slide.room].master === _user[socket.id].id) {

          socket.broadcast.to(slide.room).emit('to', slide.to);
        }
      });
  });
};
