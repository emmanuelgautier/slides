'use strict';

var express = require('express'),
    config = require('./app/config/config'),

    app = express();

require('./app/config/db')(config);
require('./app/config/express')(app, config);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port', server.address().port);
});

require('./app/config/io')(server, config);
