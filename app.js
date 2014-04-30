'use strict';

var express = require('express'),
    http = require('http'),
    config = require('./config/config'),

    app = express(),
    server = http.createServer(app);

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port);

console.log('Listening on port', config.port);
