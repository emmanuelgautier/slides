'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src(['./**/*.js', '!**/node_modules/**'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint']);
