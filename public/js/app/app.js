define([
    'require',
    'angular',
    'app/config',
    'app/run',
    'app/services/auth',
    'app/services/session',
    'app/services/socket',
    'app/resources/rooms',
    'app/controllers/home',
    'app/controllers/rooms'
  ],

  function(require, angular, config, run, $auth, $session, $socket, Room, HomeController, RoomsController) {
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
