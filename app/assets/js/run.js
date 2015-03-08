define(['fastclick'], function(FastClick) {
  return ['$rootScope', '$auth',
    function ($rootScope, $auth) {
      FastClick.attach(document.body);

      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        for(var i in window.routes) {
          if(next.indexOf(i) != -1) {
            if(window.routes[i].filter && window.routes[i].filter.auth && !$auth.isAuthenticated()) {
              window.location = '/login';

              event.preventDefault();
            }
          }
        }
      });
    }
  ];
});
