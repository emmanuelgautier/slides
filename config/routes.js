'use strict';

module.exports = function(app) {

  //home route
  require('../app/routes/home')(app);

  //slideshow management routes
  require('../app/routes/slideshow')(app);
};
