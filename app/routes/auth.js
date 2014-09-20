'use strict';

var express = require('express'),
    router = express.Router(),

    passport = require('passport');

var auth = require('../controllers/auth');

router
  .get('/register', function(req, res) {
    res.render('register');
  })
  .post('/register', auth.register)
  .get('/login', function(req, res) {
    res.render('login');
  })
  .post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
  })
  .get('/auth/google', passport.authenticate('google'))
  .get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login' 
  }), function(req, res) {
    res.redirect('/');
  })
  .get('/auth/github', passport.authenticate('github'))
  .get('/auth/github/callback', passport.authenticate('github', {
      failureRedirect: '/login' 
  }), function(req, res) {
    res.redirect('/');
  })
  .get('/logout', auth.logout);

module.exports = {
  use: '/',
  router: router
};
