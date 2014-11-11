'use strict';

angular.module('slides.rooms').factory('Room', function ($resource) {
    return $resource('api/room/:token');
  }
);
