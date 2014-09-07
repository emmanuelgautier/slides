(function(){
  'use strict';

  slidesApp.factory('$socket', function ($rootScope) {
    var $socket = function(socket) {
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
              return this.emit('room', room);
            }
          }
        };

    return {
      chat: $socket(io('/chat')),
      slides: $socket(io('/slides'))
    };
  });

  slidesApp.factory('Room', function ($resource) {
    return $resource('api/room/:token');
  });
})();
