'use strict';

slidesApp.controller('AppCtrl', function($scope) {});

slidesApp.controller('HomeCtrl', function($scope, $location) {});

slidesApp.controller('RoomsCtrl', function($scope, $http){
  $http.get('api/room/').success(function(data) {
  	$scope.rooms = data;
  });
});

slidesApp.controller('RoomCreateCtrl', function($scope){});

slidesApp.controller('RoomShowCtrl', function($scope, $http){

});
