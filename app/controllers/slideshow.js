'use strict';

//FIXME : contournement jshint
/*jshint unused:false */

var slides = require('../../slides');

exports.index = function(req, res) {

};

exports.show = function(req, res) {

};

exports.create = function(req, res) {

  var success = slides.create({
    name: req.body.name
  });

  if (success) {
    console.log('created slideshow named', req.body.name);
  }
};

exports.edit = {

  show: function(req, res) {

  },

  add: function(req, res) {

  }
};


exports.delete = function(req, res) {

};
