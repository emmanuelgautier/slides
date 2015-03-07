module.exports = function(grunt) {
  'use strict';

  grunt.util.linefeed = '\n';

  grunt.initConfig({

    sass: {
      options: {
        includePaths: ['bower_components/foundation-apps/scss']
      },
      dist: {
        files: {
          'public/css/style.css': 'app/assets/scss/foundation.scss'
        }
      }
    },

    copy: {
      fontawesome: {
        expand: true,
        cwd: 'bower_components/fontawesome/fonts/',
        src: '*',
        dest: 'public/fonts/'
      },
      components: {
        expand: true,
        cwd: 'bower_components/',
        src: [
          'angular/angular.{js,js.map}',
          'angular-*/angular-*.{js,*.js.map}',
          'jquery/dist/jquery.js',
          'modernizr/modernizr.js',
          'requirejs/require.js'
        ],
        flatten: true,
        dest: 'public/js/lib/'
      },
      foundationAppComponents: {
        expand: true,
        cwd: 'bower_components/foundation-apps/js/angular/components/',
        src: ['**'],
        dest: 'public/js/app/components/'
      },
      foundationAppServices: {
        expand: true,
        cwd: 'bower_components/foundation-apps/js/angular/services/',
        src: ['**'],
        dest: 'public/js/app/services/'
      },
      foundationAppVendor: {
        expand: true,
        cwd: 'bower_components/foundation-apps/js/angular/services/',
        src: ['**'],
        dest: 'public/js/lib/'
      },
      socketIO: {
        expand: true,
        cwd: 'node_modules/socket.io-client/',
        src: 'socket.io.js',
        dest: 'public/js/lib/'
      }
    },

    jshint: {
      dev: [
        'Gruntfile.js',
        'app.js',
        'app/config/*.js',
        'app/models/*.js',
        'app/routes/*.js',
        'app/controllers/*.js',
        'app/io/*.js',
        'app/validators/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      assetsLess: {
        files: ['app/assets/scss/*.scss'],
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      },
      jshint: {
        files: [
        'Gruntfile.js',
        'app.js',
        'app/config/*.js',
        'app/models/*.js',
        'app/routes/*.js',
        'app/controllers/*.js',
        'app/io/*.js',
        'app/validators/*.js'
        ],
        tasks: ['jshint:dev'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'jshint:dev', 'copy', 'watch']);
  grunt.registerTask('prod', ['sass', 'jshint', 'copy']);
};
