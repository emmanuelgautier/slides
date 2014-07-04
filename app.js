'use strict';

var express = require('express'),
    config  = require('./config/config'),

    app = express();

require('./config/db')(config);
require('./config/express')(app, config);
require('./routes/')(app);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port', server.address().port);
});