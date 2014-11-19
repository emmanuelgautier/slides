'use strict';

require.config({
  baseUrl: "/js",
  maps: {},
  paths: {
    "angular": "lib/angular",
    "angular-route": "lib/angular-route",
    "angular-resource": "lib/angular-resource",
    "socketio": "lib/socket.io",

    "slideshow": "app/services/slideshow",
    "slideshare": "app/services/slideshare"
  },
  shim: {
    "angular": {
      exports: "angular"
    },
    "angular-route": {
      deps: ["angular"]
    },
    "angular-resource": {
      deps: ["angular"]
    },
    "socketio": {
      exports: "io"
    }
  }
});

require(['angular', 'angular-resource', 'angular-route', 'app/app'], 
  function(angular, angularRessource, angularRoute, app) {
    'use strict';

    angular.bootstrap(document, ['slides']);
  }
);
