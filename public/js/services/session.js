'use strict';

angular.module('slides').factory('$session', function() {
  var $session = {};

  $session.user = window.user;

  return $session;
});
