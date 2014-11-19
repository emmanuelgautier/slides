define([], function() {
  'use strict';

  return ['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
      var rootPath = '/js/app';

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
        window.routes[path].templateUrl = rootPath + window.routes[path].templateUrl;

        $routeProvider.when(path, window.routes[path]);
      }

      $routeProvider.otherwise({ redirectTo: '/' });

      $locationProvider.hashPrefix('!');
    }
  ];
});
