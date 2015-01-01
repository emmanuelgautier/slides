'use strict';

var gravatar = require('gravatar'),

    mongoose = require('mongoose'),
    User     = mongoose.model('User');

exports.list = function(req, res, next) {
  User.find({ public: true }, function(err, users) {
    if(err) { next(err); }

    res.json(users);
  });
};

exports.show = function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if(err) { next(err); }

    if(user) {
      res.json(user);
    } else {
      next();
    }
  });
};

exports.me = function(req, res) {
  res.json(req.user);
};

exports.update = function(req, res, next) {
  //
};

exports.image = {
  show: function(req, res, next) {

  },

  gravatar: function(req, res, next) {
    var email = req.user.email[0].value;

    req.user.image = gravatar.url(email, { s: '200', r: 'g', d: 'mm' });

    req.user.save(function(user) {
      res.json(user.image);
    });
  },

  create: function(req, res, next) {

  },

  album: function(req, res, next) {

  }
};
