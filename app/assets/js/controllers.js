'use strict';

slidesApp.controller('AppCtrl', function($scope) {});

slidesApp.controller('HomeCtrl', function($scope, $location) {});

slidesApp.controller('RoomsCtrl', function($scope, Room){
  $scope.rooms = Room.query();
});

slidesApp.controller('RoomCreateCtrl', function($scope){

});

slidesApp.controller('RoomShowCtrl', function($scope, $routeParams, Room){
  $scope.room = Room.get({token: $routeParams.token});
});

slidesApp.controller('RoomCreateFormCtrl', function($scope, $location, Room) {
  $scope.save = function(roomForm) {
    var room = new Room(roomForm);
      room.$save(function(roomCreated){
      	$location.path('/room/' + roomCreated.token);
      });
  };
});
