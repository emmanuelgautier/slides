define(['require', 'slideshow', 'slideshare'], function(require) {
  'use strict';

  return ['$scope', '$stateParams', '$location', '$socket', 'Room',
    function($scope, $stateParams, $location, $socket, Room) {
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
        this.room = Room.get({token: $stateParams.token}, function() {
          var slideshare = require('slideshare'),
              slideshow = require('slideshow')($socket.slides, slideshare);

          slideshow.start($scope.room);
        });
      };
    }
  ];
});
