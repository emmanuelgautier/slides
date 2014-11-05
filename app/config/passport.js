'use strict';

var passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    GitHubStrategy = require('passport-github').Strategy,

    mongoose       = require('mongoose'),
    User           = mongoose.model('User'),

    auth           = require('../controllers/auth');

module.exports = function(app, config) {
  passport.use(new LocalStrategy(auth.authenticate.local));
  passport.use(new GoogleStrategy(
    config.passport.google,
    auth.authenticate.google
  ));
  passport.use(new GitHubStrategy(
    config.passport.github,
    auth.authenticate.github
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
