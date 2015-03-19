define([], function() {
  'use strict';

  return ['$session', function($session) {
    var $auth = {};

    $auth.isAuthenticated = function() {
      return !!$session.user && !!$session.user._id;
    };

    return $auth;
  }];
});
