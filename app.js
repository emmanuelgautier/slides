'use strict';

var express = require('express'),
    config = require('./app/config/config'),

    app = express();

require('./app/config/db')(config);
require('./app/config/express')(app, config);
require('./app/config/passport')(app, config);
require('./app/routes/')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;

  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
// (requires all 4 arguments to be considered an error handler)
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });

    console.error(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

  console.error(err.message);
});

app.set('port', process.env.PORT || config.port);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port', server.address().port);
});

require('./app/config/io')(server, config);
