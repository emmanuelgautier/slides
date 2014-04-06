'use strict';

module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

	//slideshow management routes
	////////////////////////////////
	////////// BROKEN CODE /////////
	////////////////////////////////
/*	var slideshow = require('../app/controllers/slideshow');
	app.get('slideshow/', slideshow.index);

	app.get('slideshow/:id', slideshow.show);

	app.get('slideshow/create', slideshow.create.show);
	app.post('slideshow/create', slideshow.create.add);

	app.get('slideshow/edit/:id', slideshow.edit.show);
	app.post('slideshow/edit/:id', slideshow.edit.add);

	app.get('slideshow/delete/id', slideshow.delete);*/
};
