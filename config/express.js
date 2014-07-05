'use strict';

var express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    swig = require('swig');

module.exports = function(app, config){
  // view engine setup
  swig.setDefaults({ loader: swig.loaders.fs(config.root + '/views') });
  if (process.env.NODE_ENV === 'development') {
    swig.setDefaults({ cache: false });
  }
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', config.root + '/views');

  app.use(favicon( config.root + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(config.root + '/public'));

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

      console.error(err.message);
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

    console.error(err.message);
  });

  app.set('port', process.env.PORT || config.port);
};
