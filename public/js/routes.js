'use strict';

angular.module('slides').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    window.routes = {
      '/': {
        templateUrl: '/partials/home.html'
      },

      '/rooms': {
        templateUrl: '/partials/room/list.html'
      },

      '/room/create': {
        templateUrl: '/partials/room/create.html',
        filter: {
          auth: true
        }
      },

      '/room/:token': {
        templateUrl: '/partials/room/show.html'
      }
    };

    for(var path in window.routes) {
      $routeProvider.when(path, window.routes[path]);
    }

    $routeProvider.otherwise({ redirectTo: '/' });
  }
]);

angular.module('slides').config(['$locationProvider', 
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

angular.module('slides').run(['$rootScope', '$auth',
  function ($rootScope, $auth) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      for(var i in window.routes) {
        if(next.indexOf(i) != -1) {
          if(window.routes[i].filter && window.routes[i].filter.auth && !$auth.isAuthenticated()) {
            window.location = '/login';

            event.preventDefault();
          }
        }
      }
    });
  }
]);