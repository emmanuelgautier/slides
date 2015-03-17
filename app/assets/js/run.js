define([], function() {
  return ['$rootScope', '$location', '$auth',
    function ($rootScope, $location, $auth) {
      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        for(var i in foundationRoutes) {
          if(next.indexOf(i) != -1) {
            if(foundationRoutes[i].auth === true && !$auth.isAuthenticated()) {
              $location.path("/login");

              event.preventDefault();
            }
          }
        }
      });
    }
  ];
});
