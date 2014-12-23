'use strict';

var mongoose          = require('mongoose'),
    User              = mongoose.model('User'),

    loginValidator    = require('../validators/login'),
    registerValidator = require('../validators/register');

exports.authenticate = {
  local: function(username, password, done) {
    var validateStatement = loginValidator.validate({
      username: username,
      password: password
    });

    if(validateStatement !== null) {
      return done(null, false, { message: validateStatement });
    }

    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        done(null, user);
      });
    });
  },

  google: function(accessToken, refreshToken, profile, done) {
    User.findOne({ provider: 'google', id: profile.id }, function (err, user) {
      if (!user) {
        User.create(profile, function(err, user) {
          done(err, user);
        });
      } else {
        user.save(profile, function(err, user) {
          done(err, user);
        });
      }
    });
  },

  github: function(accessToken, refreshToken, profile, done) {
    User.findOne({ provider: 'github', id: profile.id }, function (err, user) {
      if (!user) {
        User.create(profile, function(err, user) {
          done(err, user);
        });
      } else {
        user.save(profile, function(err, user) {
          done(err, user);
        });
      }     
    });
  }
};

exports.register = function(req, res) {
  /*jshint camelcase:false */

  var validateStatement = registerValidator.validate({
    username: req.param('username'),
    email: req.param('email'),
    password: req.param('password'),
    password_confirmation: req.param('password_confirmation')
  });

  if(validateStatement !== null) {
    req.flash('error', validateStatement);

    res.render('auth/register', {
      noangular: true,
      error: req.flash('error')
    });
    return;
  }

  var user = new User();
    user.username    = req.param('username');
    user.displayName = user.username;
    user.emails      = [{ value: req.param('email'), type: 'Primary' }];
    user.password    = req.param('password');

  user.save(function(err) {
    if(!err) {
      res.redirect('/login');
    }
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
