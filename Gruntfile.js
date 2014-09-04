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
          'angular/angular.min.{js,js.map}',
          'angular-*/angular-*.min.{js,js.map}',
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
        'app/controllers/*.js',
        'app/io/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    less: {
      dev: {
        options: {
          paths: ['app/assets/less', 'bower_components/bootstrap/less/'],
          compress: true,
        },
        files: {
          'public/css/styles.css': 'app/assets/less/styles.less'
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
