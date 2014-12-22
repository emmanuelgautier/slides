define([], function() {
  'use strict';

  return ['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
      var rootPath = '/js/app';

      window.routes = {
        '/': {
          templateUrl: '/views/home.html'
        },

        '/rooms': {
          templateUrl: '/views/room/list.html'
        },

        '/rooms/create': {
          templateUrl: '/views/room/create.html',
          filter: {
            auth: true
          }
        },

        '/rooms/:token': {
          templateUrl: '/views/room/show.html'
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
