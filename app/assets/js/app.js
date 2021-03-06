define([
    'require',
    'angular',
    'app/routes',
    'app/config',
    'app/run',
    'app/services/auth',
    'app/services/session',
    'app/services/socket',
    'app/resources/rooms',
    'app/resources/users',
    'app/controllers/app',
    'app/controllers/home',
    'app/controllers/rooms',
    'app/controllers/users',
  ],

  function(
    require, 
    angular,
    routes,
    config,
    run,
    $auth,
    $session,
    $socket,
    Room,
    User,
    AppController,
    HomeController,
    RoomsController,
    UsersController
  ) {
    'use strict';

    var app = angular.module('slides', [
      'ngRoute',
      'ngResource',

      'ui.router',
      'ngAnimate',

      //foundation
      'foundation',
      'foundation.dynamicRouting',
      'foundation.dynamicRouting.animations'
    ]);

    app.config(config);

    //load factories
    app.factory('$auth', $auth)
      .factory('$session', $session)
      .factory('$socket', $socket)
      .factory('Room', Room)
      .factory('User', User);

    //load controllers
    app.controller('AppController', AppController)
      .controller('HomeController', HomeController)
      .controller('RoomsController', RoomsController)
      .controller('UsersController', UsersController);

    app.run(run);

    return app;
  }
);
