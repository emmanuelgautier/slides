'use strict';

var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app, config) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy(config.passport.google, 
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));

  passport.use(new GitHubStrategy(config.passport.github,
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));
};
