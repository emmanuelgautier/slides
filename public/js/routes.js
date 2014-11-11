'use strict';

angular.module('slides').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/home.html'
      }).
      when('/rooms', {
        templateUrl: '/partials/room/list.html'
      }).
      when('/room/create', {
        templateUrl: '/partials/room/create.html'
      }).
      when('/room/:token', {
        templateUrl: '/partials/room/show.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);

angular.module('slides').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }]
);
