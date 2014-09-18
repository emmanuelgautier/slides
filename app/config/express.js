'use strict';

var express = require('express'),
    session = require('express-session'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    hbs = require('express-hbs'),
    passport = require('passport');

module.exports = function(app, config){
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(cookieParser());
  app.use(session({
    secret: 'key',
    saveUninitialized: true,
    resave: true
  }));

  require('../routes/')(app);

  app.set('view engine', 'hbs');
  app.set('views', config.root + '/app/views');

  app.engine('hbs', hbs.express3({
    partialsDir: config.root + '/app/views/partials',
    layoutsDir: config.root + '/app/views/layouts',
    defaultLayout: config.root + '/app/views/layouts/main.hbs',
    extname: '.hbs',
  }));

  app.use(favicon( config.root + '/public/favicon.ico'));
  app.use(logger('dev'));

  app.use(express.static(config.root + '/public'));

  //passport
  app.use(passport.initialize());
  app.use(passport.session());

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
