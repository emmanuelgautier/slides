'use strict';

exports.home = function(req, res) {
  res.render('index/home', {
    title: 'Slides'
  });
};
