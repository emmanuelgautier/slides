define([], function() {
  'use strict';

  return ['$scope', '$stateParams', '$location', '$session', 'User',
    function($scope, $stateParams, $location, $session, User) {
      $scope.show = function() {
        if($stateParams.username === 'me') {
          this.user = $session.user;
        } else {
          this.user = User.get({username: $stateParams.username});
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
