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
  if(!req.user) {
    res.json({ 'unauthenticated': 'Your are not authenticated !' });

    return;
  }

  req.user.name = req.user.name || {};
    req.user.name.familyName = req.param('name').familyName || "";
    req.user.name.givenName  = req.param('name').givenName  || "";

  req.user.emails[0].value = req.param('emails')[0].value;

  req.user.save(function(err) {
    if(err) {
      res.json({ 'error': 'An unknown error occured !' });
    }

    return;
  });
};

exports.image = {
  show: function(req, res, next) {

  },

  gravatar: function(req, res, next) {
    var email = req.user.email[0].value;

    req.user.image = gravatar.url(email, { s: '200', r: 'g', d: 'mm' });

    req.user.save(function(err) {
      res.json(user.image);
    });
  },

  create: function(req, res, next) {

  },

  album: function(req, res, next) {

  }
};
