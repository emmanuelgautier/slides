'use strict';

function seed(mongoose) {

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

    if (err) {
      throw err;
    }
    console.log('Database cleaned.');

    //seeding database with test datas
    mongoose.model('Room').create(seedRooms, function(err) {

      if (err) {
        throw err;
      }
      console.log('Database seeded.');

      if (require.main === module) {
        mongoose.disconnect();
      }
    });
  });
}

if (require.main === module) {

  process.argv.forEach(function(val) {
    //if command line param is passed
    if (val === 'c') {
      var config = require('./config/config'),
          fs = require('fs'),
          mongoose = require('mongoose');

      mongoose.connect(config.db);
      var db = mongoose.connection;
      db.on('error', function() {
        throw new Error('unable to connect to database at ' + config.db);
      });

      var modelsPath = __dirname + '/app/models';
      fs.readdirSync(modelsPath).forEach(function(file) {
        if (file.indexOf('.js') >= 0) {
          require(modelsPath + '/' + file);
        }
      });

      seed(mongoose);
    }
  });
} else {
  module.exports = seed;
}
