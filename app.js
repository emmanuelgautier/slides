'use strict';

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

var app, server, routes, room, rooms;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./config/db');

routes = require('./routes/index');
room = require('./routes/room');
rooms = require('./routes/rooms');

app = express();


// view engine setup
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/views') });
if (process.env.NODE_ENV === 'development') {
  swig.setDefaults({ cache: false });
}
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/room', room);
app.use('/rooms', rooms);

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
  app.use(function(err, req, res, next) {
    /*jshint unused:false*/
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  /*jshint unused:false*/
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', process.env.PORT || 3000);

server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port', server.address().port);
});

