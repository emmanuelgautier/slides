define([], function() {
  'use strict';

  return ['$resource', function ($resource) {
      return $resource('api/users/:username');
  }];
});
