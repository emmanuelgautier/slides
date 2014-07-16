'use strict';

module.exports = function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
