'use strict';

var express  = require('express'),
    router   = express.Router(),

    passport = require('passport'),

    auth     = require('../controllers/auth');

router
  .get('/register', function(req, res) {
    res.render('auth/register', { noangular: true });
  })
  .post('/register', auth.register)
  .get('/login', function(req, res) {
    res.render('auth/login', { noangular: true, error: req.flash('error') });
  })
  .post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

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
