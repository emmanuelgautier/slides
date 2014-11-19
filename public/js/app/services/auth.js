define([], function() {
  'use strict';

  return ['$http', '$session', function($http, $session) {
    var $auth = {};

    $auth.isAuthenticated = function() {
      return !!$session.user;
    };

    return $auth;
  }];
});
