'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    env: 'development',
    root: rootPath,
    app: {
      name: 'slides'
    },
    port: 3000,
    db: 'mongodb://localhost/slides',
  },

  production: {
    env: 'production',
    root: rootPath,
    app: {
      name: 'slides',
    },
    port: 3000,
    db: 'mongodb://localhost/slides',
  }
};

module.exports = config[env];