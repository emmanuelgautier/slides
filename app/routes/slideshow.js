'use strict';

var slideshow = require('../controllers/slideshow');

module.exports = function(app) {
  app.get('/slideshow/', slideshow.index);

  app.get('/slideshow/:id', slideshow.show);

  app.get('/slideshow/create', slideshow.create.show);
  app.post('/slideshow/create', slideshow.create.add);

  app.get('/slideshow/edit/:id', slideshow.edit.show);
  app.post('/slideshow/edit/:id', slideshow.edit.add);

  app.get('/slideshow/delete/id', slideshow.delete);
};
