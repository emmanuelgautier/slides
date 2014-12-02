define([], function() {
  'use strict';

  return ['$scope', '$location', 'Room',
    function($scope, $location, Room) {
      $scope.featuredRooms = Room.query();
    }
  ];
});
