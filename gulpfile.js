'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
      './**/*.js',
      '!**/node_modules/**',
      '!**/public/**'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint']);
