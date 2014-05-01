'use strict';

var express = require('express'),
    config = require('./config/config'),

    app = express();

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port);

console.log('Listening on port', config.port);
