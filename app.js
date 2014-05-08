'use strict';

var express = require('express'),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    fs = require('fs'),

    app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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

// Cleaning database when developing
if (process.env.NODE_ENV === 'development') {
  mongoose.model('Room').remove({}, function(err) {
    if (err) {
      throw err;
    }
    console.log('Database cleaned.');
  });
}

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port);

console.log('Listening on port', config.port);
