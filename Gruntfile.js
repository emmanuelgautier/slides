'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35728, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    develop: {
      server: {
        file: 'app.js'
      }
    },

    jshint: {
      // define the list to lint
      files: ['Gruntfile.js', 'app.js', 'config/*.js', 'app/**/*.js'],
      // configure JSHint
      options: {
        jshintrc: true
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [ 'Gruntfile.js', 'app.js', 'config/*.js', 'app/**/*.js' ],
        tasks: ['jshint', 'develop', 'delayed-livereload'],
        options: { livereload: reloadPort }
      },
      jade: {
        files: ['app/views/**/*.jade'],
        options: { livereload: reloadPort }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('delayed-livereload',
    'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort +
        '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          }
          else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['jshint', 'develop']);
};
