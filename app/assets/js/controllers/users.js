define([], function() {
  'use strict';

  return ['$scope', '$routeParams', '$location', '$session', 'User',
    function($scope, $routeParams, $location, $session, User) {
      $scope.show = function() {
        if($routeParams.username === 'me') {
          this.user = $session.user;
        } else {
          this.user = User.get({username: $routeParams.username});
        }
      };

      $scope.edit = function() {
        this.user = $session.user;

        this.saveEdit = function() {
          this.user.$save(function(user) {
            $session.user = user;

            $location.path('/users/me');
          });
        };
      };
    }
  ];
});
