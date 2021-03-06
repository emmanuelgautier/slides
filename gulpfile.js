// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation
// for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var gulp       = require('gulp'),
    $          = require('gulp-load-plugins')(),
    rimraf     = require('gulp-rimraf'),
    sequence   = require('run-sequence'),
    path       = require('path'),
    router     = require('./bower_components/foundation-apps/bin/gulp-dynamic-routing');

// 2. SETTINGS VARIABLES
// - - - - - - - - - - - - - - -

// Sass will check these folders for files when you use @import.
var sassPaths = [
  'app/assets/scss',
  'bower_components/foundation-apps/scss'
];

// These files include Foundation for Apps and its dependencies
var foundationJS = [
  'bower_components/fastclick/lib/fastclick.js',
  'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
  'bower_components/tether/tether.js',
  'bower_components/foundation-apps/js/angular/**/*.js',
  '!bower_components/foundation-apps/js/angular/app.js'
];

var angularJS = [
  'bower_components/angular/angular.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'bower_components/angular-resource/angular-resource.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
];

// These files are for your app's JavaScript
var appJS = [
  'app/assets/js/app.js'
];

// 3. TASKS
// - - - - - - - - - - - - - - -
// Cleans build directories
gulp.task('clean', function() {
  return gulp.src(['./public/{components,css,fonts,templates}'], { read: false })
    .pipe(rimraf({ force: true }));
});

// Copies user-created files and Foundation assets
gulp.task('copy', function() {
  // Fontawesome
  gulp.src(['./bower_components/fontawesome/fonts/*'])
    .pipe(gulp.dest('./public/fonts/'));

  // jQuery
  gulp.src(['./bower_components/jquery/dist/jquery.min.{map,js}'])
    .pipe(gulp.dest('./public/js/lib/'));

  // Modernizr
  gulp.src(['./bower_components/modernizr/modernizr.js'])
    .pipe(gulp.dest('./public/js/lib/'));

  // Require.js
  gulp.src(['./bower_components/requirejs/require.js'])
    .pipe(gulp.dest('./public/js/lib/'));

  // Socket.io
  gulp.src(['./node_modules/socket.io-client/socket.io.js'])
    .pipe(gulp.dest('./public/js/lib/'));

  // Foundation's Angular partials
  gulp.src(['./bower_components/foundation-apps/js/angular/components/**/*.html'])
    .pipe(gulp.dest('./public/components/'));

  // App
  gulp.src(['./app/assets/js/**/*.js', '!./app/assets/js/main.js'])
    .pipe(gulp.dest('./public/js/app/'));

  // App main
  return gulp.src(['./app/assets/js/main.js'])
    .pipe(gulp.dest('./public/js/'));
});

// Compiles Sass
gulp.task('sass', function() {
  return gulp.src('app/assets/scss/app.scss')
    .pipe($.rubySass({
      loadPath: sassPaths,
      style: 'nested',
      bundleExec: true
    })).on('error', function(e) {
      console.log(e);
    })
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./public/css/'));
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', function() {
  // Foundation JavaScript
  gulp.src(foundationJS)
    .pipe($.uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('./public/js/lib/'))
  ;

  // Angular JavaScript
  gulp.src(angularJS)
    .pipe($.uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe($.concat('angular.js'))
    .pipe(gulp.dest('./public/js/lib/'))
  ;

  // App JavaScript
  return gulp.src(appJS)
    .pipe(gulp.dest('./public/js/app/'))
  ;
});

// Copies your app's page templates and generates URLs for them
gulp.task('routing-templates', ['copy'], function() {
  return gulp.src('./app/assets/templates/**/*.html')
    .pipe(router({
      path: './public/js/app/routes.js',
      root: 'app/assets'
    }))
    .pipe(gulp.dest('./public/templates'))
  ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function() {
  sequence('clean', ['copy', 'sass', 'uglify'], 'routing-templates', function() {
    console.log("Successfully built.");
  });
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build'], function() {
  // Watch Sass
  gulp.watch(['./app/assets/scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./app/assets/js/**/*'], ['uglify', 'copy']);

  //watch Templates
  gulp.watch(['./app/assets/templates/**/*.*'], ['routing-templates']);

  // Watch static files
  gulp.watch(['./app/assets/**/*.*', '!./app/assets/templates/**/*.*', '!./app/assets/{scss}/**/*.*'], ['copy']);
});
