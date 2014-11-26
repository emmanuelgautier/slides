define(['require', 'angular', 'app/config', 'app/run',
  'app/services/auth', 'app/services/rooms', 'app/services/session', 'app/services/socket',
  'app/controllers/home', 'app/controllers/rooms'],
  function(require, angular, config, run, $auth, Room, $session, $socket, HomeController, RoomsController) {
    'use strict';

    var app = angular.module('slides', ['ngRoute', 'ngResource']);

    app.config(config);

    //load factories
    app.factory('$auth', $auth)
       .factory('$session', $session)
       .factory('$socket', $socket)
       .factory('Room', Room);

    app.controller('HomeController', HomeController)
       .controller('RoomsController', RoomsController);

    app.run(run);

    return app;
  }
);
