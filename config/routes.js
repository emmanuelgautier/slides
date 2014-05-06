'use strict';

module.exports = function(app) {

  //home route
  require('../app/routes/home')(app);

  //room route
  require('../app/routes/room')(app);

  app.use(function(req, res) {
    res.status(404).render('404', { title: '404' });
  });
};
