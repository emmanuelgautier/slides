'use strict';

var express = require('express'),
    config = require('./app/config/config'),

    app = express(),
    server = require('http').Server(app);

require('./app/config/db')(config);
require('./app/config/express')(app, config);
require('./app/config/io')(server, config);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port', server.address().port);
});