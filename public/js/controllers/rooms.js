'use strict';

angular.module('slides.rooms').controller('RoomsController', ['$scope', '$routeParams', '$location', '$slideshow', 'Room',
  function($scope, $routeParams, $location, $slideshow, Room) {
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
        $slideshow.start($scope.room);
      });
    };
  }]
);
