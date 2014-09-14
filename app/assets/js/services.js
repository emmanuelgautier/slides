(function(){
  'use strict';

  slidesApp.factory('$socket', function ($rootScope) {
    var $socket = function(namespace) {
          var socket = io('/' + namespace),

              _room = null;

          return {
            on: function (eventName, callback) {
              return socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  callback.apply(socket, args);
                });
              });
            },
            emit: function (eventName, data, callback) {
              if(_room)
                data = (typeof data === 'object') ? data.room = _room : { room: _room };

              return socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  if (callback) {
                    callback.apply(socket, args);
                  }
                });
              });
            },
            join: function(room) {
              if(namespace)
                _room = room;

              return socket.emit('room', room);
            }
          }
        };

    return {
      chat: $socket('chat'),
      slides: $socket('slides')
    };
  });

  slidesApp.factory('Room', function ($resource) {
    return $resource('api/room/:token');
  });
})();
