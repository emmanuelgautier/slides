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

<<<<<<< HEAD
	},

	add: function(req, res) {

	}
=======
  if (success) {
    console.log('created slideshow named', req.body.name);
  }
>>>>>>> 242d031986291774d2a359a7422cae6e0a622009
};

exports.edit = {

  show: function(req, res) {

  },

  add: function(req, res) {

  }
};


exports.delete = function(req, res) {

};
