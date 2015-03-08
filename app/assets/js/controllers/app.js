define([], function() {
  'use strict';

  return ['$scope', '$auth', '$session', 'User',
    function($scope, $auth, $session, User) {
      if(!!window.user)
        $session.user = window.user;

      $session.user = User.get({ username: 'me' });

      $scope.$auth    = $auth;
      $scope.$session = $session;
    }
  ];
});
