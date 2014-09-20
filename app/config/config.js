'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  env: env,
  root: rootPath,
  app: {
    name: 'slides',
  },
  port: 3000,
  db: 'mongodb://localhost/slides',
  passport: {
    google: {
      clientID: null,
      clientSecret: null,
      callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
    },
    github: {
      clientID: null,
      clientSecret: null,
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    }
  }
};

module.exports = config;
