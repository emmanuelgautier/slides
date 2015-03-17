'use strict';

require.config({
  baseUrl: "/js",
  maps: {},
  paths: {
    "angular": "lib/angular",
    "foundation": "lib/foundation",

    "socketio": "lib/socket.io",

    "slideshow": "app/services/slideshow",
    "slideshare": "app/services/slideshare"
  },
  shim: {
    "angular": {
      exports: "angular"
    },
    "foundation": {
        exports: "foundation",
        deps: ['angular']
    },
    "socketio": {
      exports: "io"
    }
  }
});

require(['angular', 'foundation', 'app/app'], 
  function(angular, foundation, app) {
    'use strict';

    angular.bootstrap(document, ['slides']);
  }
);
