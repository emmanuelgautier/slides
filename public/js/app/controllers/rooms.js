define(['require', 'slideshow', 'slideshare'], function(require) {
  'use strict';

  return ['$scope', '$routeParams', '$location', '$socket', 'Room',
    function($scope, $routeParams, $location, $socket, Room) {
      $scope.list = function() {
        this.rooms = Room.query();
      };

      $scope.create = function() {
        var room = new Room({
          name: this.name
        });

        room.$save(function(roomCreated) {
          $location.path('/room/' + roomCreated.token);
        });
      };

      $scope.show = function() {
        this.room = Room.get({token: $routeParams.token}, function() {
          var slideshare = require('slideshare'),
              slideshow = require('slideshow')($socket.slides, slideshare);

          slideshow.start($scope.room);
        });
      };
    }
  ];
});
