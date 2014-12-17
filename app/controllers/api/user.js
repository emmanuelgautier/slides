'use strict';

var mongoose = require('mongoose'),
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

    if(room) {
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
