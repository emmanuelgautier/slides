module.exports = function(grunt) {
  'use strict';

  grunt.util.linefeed = '\n';

  grunt.initConfig({

    jshint: {
      dev: ['Gruntfile.js', 'app.js', 'config/*.js', 'models/*.js', 'routes/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    less: {
      dev: {
        options: {
          compress: true,
        },
        files: {
          'assets/stylesheets/default.css': 'public/css/default.css'
        }
      }
    },

    watch: {
      stylesheets: {
        files: ['assets/stylesheets/*.less'],
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      },
      javascript: {
        files: ['Gruntfile.js', 'app.js', 'config/*.js', 'models/*.js', 'routes/*.js'],
        tasks: ['jshint:dev'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less:dev', 'jshint:dev', 'watch']);
  grunt.registerTask('prod', ['less']);
};
