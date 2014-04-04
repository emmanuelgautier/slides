'use strict';

var mongoose = require('mongoose');

exports.index = function(req, res){
  var SlideShow = mongoose.model('SlideShow');

  res.render('home/index', {
    title: 'Slides',
    slideshow: new SlideShow({})
  });
};
