'use strict';

slidesApp.controller('AppCtrl', function($scope) {});

slidesApp.controller('HomeCtrl', function($scope, $location) {});

slidesApp.controller('RoomsCtrl', function($scope, Room){
  $scope.rooms = Room.query();
});

slidesApp.controller('RoomCreateCtrl', function($scope){

});

slidesApp.controller('RoomShowCtrl', function($scope, $routeParams, $socket, $slideshow, Room) {
  var room = Room.get({token: $routeParams.token}, function() {
    $scope.room = room;

    $slideshow.start(room);
  });
});

slidesApp.controller('RoomCreateFormCtrl', function($scope, $location, Room) {
  $scope.save = function(roomForm) {
    var room = new Room(roomForm);
      room.$save(function(roomCreated) {
      	$location.path('/room/' + roomCreated.token);
      });
  };
});
