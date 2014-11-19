define([], function() {
  'use strict';

  return [function() {
    var $session = {};

    $session.user = window.user;

    return $session;
  }];
});
