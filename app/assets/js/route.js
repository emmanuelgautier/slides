slidesApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/rooms', {
        templateUrl: '/partials/rooms.html',
        controller: 'RoomsCtrl'
      }).
      when('/room/create', {
        controller: 'RoomCreateCtrl'
      }).
      when('/room/:token', {
        templateUrl: '/partials/room/show.html',
        controller: 'RoomShowCtrl'
      }).
      when('/room/', {
        redirectTo: '/rooms'
      }).
      otherwise({
        redirectTo: ''
      });
  }]);
