'use strict';

exports.home = function(req, res) {
  res.render('angularapp');
  /*res.render('home', {
  	user: req.user || null
  });*/
};
