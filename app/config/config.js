'use strict';

/*jshint maxlen: 1000 */

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env      = process.env.NODE_ENV || 'development';

var config = {
  env: env,
  root: rootPath,
  app: {
    name: 'slides',
  },
  cookie: { 
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  },
  port: 3000,
  db: 'mongodb://localhost/slides',
  passport: {
    google: {
      clientID: null,
      clientSecret: null,
      callbackURL: null,
      scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email'
    },
    github: {
      clientID: null,
      clientSecret: null,
      callbackURL: null
    }
  }
};

module.exports = config;
