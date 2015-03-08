'use strict';

require.config({
  baseUrl: "/js",
  maps: {},
  paths: {
    "angular": "lib/angular",

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

require(['angular', 'app/app'], 
  function(angular, app) {
    'use strict';

    angular.bootstrap(document, ['slides']);
  }
);
