'use strict';

//FIXME : contournement jshint
/*jshint unused:false */

var slides = require('../../slides');

exports.index = function(req, res) {

};

exports.show = function(req, res) {

};

exports.create = {

	show: function(req, res) {

	},

	add: function(req, res) {
		slides.create({
			name: 'test'
		});

		console.log('created');
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
