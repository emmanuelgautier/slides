module.exports = function(grunt) {
  'use strict';

  grunt.util.linefeed = '\n';

  grunt.initConfig({

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

    less: {
      dev: {
        options: {
          paths: ['app/assets/less', 'bower_components'],
          compress: true,
        },
        files: {
          'public/css/style.css': 'app/assets/less/style.less'
        }
      }
    },

    requirejs: {

    },

    watch: {
      assetsLess: {
        files: ['app/assets/less/*.less'],
        tasks: ['less:dev'],
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

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less:dev', 'jshint:dev', 'copy', 'watch']);
  grunt.registerTask('prod', ['less', 'jshint', 'copy', 'requirejs']);
};
