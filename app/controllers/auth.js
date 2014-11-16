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

    if(validateStatement.error === true) {
      return done(null, validateStatement.messages);
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
  var validateStatement = registerValidator.validate(req.params);

  if(validateStatement.error === true) {
    res.render('auth/register', {
      noangular: true,
      errors: validateStatement.messages 
    });
    return;
  }

  var user = new User();
    user.username = req.param('username');
    user.password = req.param('password');

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
