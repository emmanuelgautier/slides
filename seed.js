'use strict';

    //number process to do
var actionToDo = 2,

    //number process done
    actionDone = 0,

    terminateAction = function(){},

    seed = function(mongoose, console) {
      // Cleaning database when developing
      mongoose.model('Room').remove({}, function(err) {
        if (err) {
          throw err;
        }

        //console.log('Database cleaned.');

        terminateAction();
      });

      //seeding database with test datas
      var seedRooms = [{
        name: 'Room 1',
        description: 'This is the first public room',
        public: true
      },
      {
        name: 'Room 2',
        description: 'This is the second private room',
        public: false
      }];

      mongoose.model('Room').create(seedRooms, function(err) {
        if(err) {
          throw err;
        }

        //console.log('Database seeded');

        terminateAction();
      });
    };

module.exports = function(mongoose) {
  seed(mongoose);
};

//if the process isn't call in express app
process.argv.forEach(function (val) {
  //if command line param is passed
  if(val === 'c') {
    var config = require('./config/config'),
        fs = require('fs'),
        mongoose = require('mongoose');

        //call to terminate process
        terminateAction = function() {
          actionDone += 1;

          if(actionDone >= actionToDo) {
            process.exit(0);
          }
        };

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
      throw new Error('unable to connect to database at ' + config.db);
    });

    var modelsPath = __dirname + '/app/models';
    fs.readdirSync(modelsPath).forEach(function (file) {
      if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
      }
    });

    seed(mongoose);
  }
});
