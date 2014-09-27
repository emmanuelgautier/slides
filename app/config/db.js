'use strict';

var path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),

    clean = function() {
      // Cleaning database when developing
      mongoose.model('Room').remove({}, function(err) {
        if(err) { throw err; }

        mongoose.model('User').remove({}, function(err) {
          if (err) { throw err; }
          console.log('Database cleaned.');
        });
      });
    },

    seed = function () {
      var randomName = function() {
        var adjs = [
            'Autumn', 'Hidden', 'Bitter', 'Misty', 'Silent', 'Empty',
            'Dry', 'Dark', 'Summer', 'Icy', 'Delicate', 'Quiet', 'White',
            'Cool', 'Spring', 'Winter', 'Patient', 'Twilight', 'Dawn',
            'Crimson', 'Wispy', 'Weathered', 'Blue', 'Billowing', 'Broken',
            'Cold', 'Damp', 'Falling', 'Frosty', 'Green', 'Long', 'Late',
            'Lingering', 'Bold', 'Little', 'Morning', 'Muddy', 'Old', 'Red',
            'Rough', 'Still', 'Small', 'Sparkling', 'Throbbing', 'Shy',
            'Wandering', 'Withered', 'Wild', 'Black', 'Young', 'Holy',
            'Solitary', 'Fragrant', 'Aged', 'Snowy', 'Proud', 'Floral',
            'Restless', 'Divine', 'Polished', 'Ancient', 'Purple', 'Lively',
            'Nameless'
          ],

          nouns = [
            'waterfall', 'river', 'breeze', 'moon', 'rain', 'wind', 'sea',
            'morning', 'snow', 'lake', 'sunset', 'pine', 'shadow', 'leaf',
            'dawn', 'glitter', 'forest', 'hill', 'cloud', 'meadow', 'sun',
            'glade', 'bird', 'brook', 'butterfly', 'bush', 'dew', 'dust',
            'field', 'fire', 'flower', 'firefly', 'feather', 'grass', 'haze',
            'mountain', 'night', 'pond', 'darkness', 'snowflake', 'silence',
            'sound', 'sky', 'shape', 'surf', 'thunder', 'violet', 'water',
            'wildflower', 'wave', 'water', 'resonance', 'sun', 'wood', 'dream',
            'cherry', 'tree', 'fog', 'frost', 'voice', 'paper', 'frog', 'smoke',
            'star'
          ];

        return adjs[Math.floor(Math.random()*(adjs.length-1))] + ' ' +
          nouns[Math.floor(Math.random()*(nouns.length-1))];
      };

      var seedRooms = [{
        name: randomName(),
        description: 'This is the first public room',
        public: true
      }, {
        name: randomName(),
        description: 'This is the second private room',
        public: false
      }];

      //seeding database with test datas
      mongoose.model('Room').create(seedRooms, function(err) {

        if (err) { throw err; }
        console.log('Database seeded.');
      });
    };

module.exports = function(config){
  var modelsPath = config.root + '/app/models', db;

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

  if (config.env === 'development') {
    clean();
    seed();
  }
};
