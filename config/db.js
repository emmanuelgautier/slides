'use strict';

var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

var config = require('./index');

var seed = function () {
  // Seeds the database with bogus info when in development.

  var seedRooms = [{
    name: 'Room 1',
    description: 'This is the first public room',
    public: true
  }, {
    name: 'Room 2',
    description: 'This is the second private room',
    public: false
  }];

  // Cleaning database when developing
  mongoose.model('Room').remove({}, function(err) {

    if (err) { throw err; }
    console.log('Database cleaned.');

    //seeding database with test datas
    mongoose.model('Room').create(seedRooms, function(err) {

      if (err) { throw err; }
      console.log('Database seeded.');
    });
  });
};

var modelsPath = path.join(config.rootDir, 'models');
var db;

mongoose.connect(config.db);
db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database');
});

// Load all database models
fs.readdirSync(modelsPath).forEach(function (filename) {
  if (path.extname(filename) === '.js') {
    require(path.join(modelsPath, filename));
  }
});

if (process.env.NODE_ENV === 'development') {
  seed();
}
