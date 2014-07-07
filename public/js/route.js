slidesApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/rooms', {
        templateUrl: 'partials/rooms',
        controller: 'RoomsCtrl'
      }).
      when('/room/create', {
        templateUrl: 'partials/room/create',
        controller: 'RoomCreateCtrl'
      }).
      when('/room/:token', {
        templateUrl: 'partials/room/show',
        controller: 'RoomShowCtrl'
      }).
      when('/room/', {
        redirectTo: '/rooms'
      }).
      otherwise({
        redirectTo: ''
      });
  }]);