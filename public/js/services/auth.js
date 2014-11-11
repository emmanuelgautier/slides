'use strict';

angular.module('slides').factory('$auth', function($http, $session) {
  var $auth = {};

  $auth.isAuthenticated = function() {
    return !!$session.user;
  };

  return $auth;
});
