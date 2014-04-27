'use strict';

var express = require('express'),
    hbs = require('express-hbs'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override');

module.exports = function(app, config) {
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'hbs');

    app.engine('hbs', hbs.express3({
      partialsDir: config.root + '/app/views/partials',
      layoutsDir: config.root + '/app/views/layouts'
    }));

    app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser());
    app.use(methodOverride());
};
