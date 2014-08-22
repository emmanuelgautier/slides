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
      assetsJs: {
        expand: true,
        cwd: 'app/assets/js/',
        src: '*.js',
        dest: 'public/js/'
      },
      components: {
        expand: true,
        cwd: 'bower_components/',
        src: [
          'angular/angular.min.js',
          'angular-*/angular-*.min.js',
          'jquery/dist/jquery.min.js',
          'modernizr/modernizr.js'
        ],
        flatten: true,
        dest: 'public/js/'
      }
    },

    jshint: {
      dev: [
        'Gruntfile.js',
        'app.js',
        'app/config/*.js',
        'app/models/*.js',
        'app/routes/*.js',
        'app/controllers/*.js'
      ],
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
          'app/assets/less/default.less': 'public/css/default.css'
        }
      }
    },

    watch: {
      assetsLess: {
        files: ['app/assets/less/*.less'],
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      },
      assetsJs: {
        files: ['app/assets/js/*.js'],
        tasks: ['copy:assetsJs'],
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
          'app/routes/*.js'
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less:dev', 'jshint:dev', 'copy', 'watch']);
  grunt.registerTask('prod', ['less']);
};
