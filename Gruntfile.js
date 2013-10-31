var shim = require('browserify-shim');

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({

    meta: {
      scripts: [
        'js/**/*.js'
      ],
      styles: [
        'sass/**/*.scss',
        'sass/**/*.sass',
        'css/**/*.css'
      ]
    },

    // Combine JS modules using Browserify
//    browserify2: {
//      options: {
//        entry: './js/main.js',
//        beforeHook: function(bundle) {
//          // Shim 3rd party libraries not in `node_modules`
//          shim(bundle, {
//            'jquery': {path: 'components/jquery/jquery.js', exports: 'jQuery'},
//            'fastclick': {path: 'components/fastclick/lib/fastclick.js', exports: 'jQuery'},
//            'jquery-jail': {path: 'components/JAIL/src/jail.js', exports: 'jail'}
//          });
//        }
//      },
//      debug: {
//        compile: 'debug/app.js',
//        // For source maps
//        debug: true
//      },
//      build: {
//        compile: 'build/app.js'
//      }
//    },

    // Compile Sass files to CSS
    compass: {
      options: {
        sassDir: 'sass'
      },
      debug: {
        options: {
          cssDir: 'debug',
          // For source maps
          debugInfo: true,
          outputStyle: 'expanded'
        }
      },
      build: {
        options: {
          cssDir: 'build'
        }
      }
    },

    // Concatenate files
    concat: {
      debug: {
        files: {        	
          'debug/lib.js': ['js/lib/modernizr.js', 'js/lib/swfobject.js', 'js/lib/prototype.js', 'js/lib/prototype-date-extensions.js', 'js/lib/lowpro.js', 'js/lib/chosen.proto.js', 'js/lib/trimpath-template.js', 'js/lib/scriptaculous.js', 'js/lib/effects.js', 'js/lib/foresight.js', 'js/lib/moment.js', 'js/lib/base64.js', 'js/lib/opentip-prototype.js', 'js/lib/opentip-prototype-excanvas.js'],
          'debug/classes.js': ['js/classes/ph8/base.js' , 'js/classes/ph8/config.js' , 'js/classes/ph8/dictionary.js' , 'js/classes/ph8/storage.js' , 'js/classes/ph8/templates.js' , 'js/classes/ph8/pages.js' , 'js/classes/ph8/dialog.js' , 'js/classes/spotlight.js' , 'js/classes/ph8/loader.js' , 'js/classes/tabRotator.js' , 'js/classes/accordion.js' , 'js/classes/url.js' , 'js/classes/youtube.js' , 'js/classes/analytics.js' , 'js/classes/notificare.js' , 'js/classes/home.js' , 'js/classes/fileAPI.js' , 'js/classes/websockets.js' , 'js/classes/dashboard/audience.js' , 'js/classes/dashboard/map.js' , 'js/classes/dashboard/preview.js' , 'js/classes/dashboard/push.js' , 'js/classes/dashboard/users.js' , 'js/classes/dashboard/notifications.js' , 'js/classes/dashboard/charts.js' , 'js/style.js']    
        }
      },
      build: {
        files: {
            'build/lib.js': ['js/lib/modernizr.js', 'js/lib/swfobject.js', 'js/lib/prototype.js', 'js/lib/prototype-date-extensions.js', 'js/lib/lowpro.js', 'js/lib/chosen.proto.js', 'js/lib/trimpath-template.js', 'js/lib/scriptaculous.js', 'js/lib/effects.js', 'js/lib/foresight.js', 'js/lib/moment.js', 'js/lib/base64.js', 'js/lib/opentip-prototype.js', 'js/lib/opentip-prototype-excanvas.js'],
            'build/classes.js': ['js/classes/ph8/base.js' , 'js/classes/ph8/config.js' , 'js/classes/ph8/dictionary.js' , 'js/classes/ph8/storage.js' , 'js/classes/ph8/templates.js' , 'js/classes/ph8/pages.js' , 'js/classes/ph8/dialog.js' , 'js/classes/spotlight.js' , 'js/classes/ph8/loader.js' , 'js/classes/tabRotator.js' , 'js/classes/accordion.js' , 'js/classes/url.js' , 'js/classes/youtube.js' , 'js/classes/analytics.js' , 'js/classes/notificare.js' , 'js/classes/home.js' , 'js/classes/fileAPI.js' , 'js/classes/websockets.js' , 'js/classes/dashboard/audience.js' , 'js/classes/dashboard/map.js' , 'js/classes/dashboard/preview.js' , 'js/classes/dashboard/push.js' , 'js/classes/dashboard/users.js' , 'js/classes/dashboard/notifications.js' , 'js/classes/dashboard/charts.js' , 'js/style.js']    
        }
      }
    },

    // Minify CSS files
    cssmin: {
      build: {
        files: {
          'build/default.min.css': ['build/default.css'],
          'build/print.min.css': ['build/print.css']
        }
      }
    },

    // Minify JS files
    uglify: {
      build: {
        files: {
          'build/lib.min.js': ['build/lib.js'],
          'build/classes.min.js': ['build/classes.js']
        }
      }
    },

    // Watch files for changes
    watch: {
      scripts: {
        files: ['<%= meta.scripts %>'],
        tasks: ['browserify2:debug']
      },
      styles: {
        files: ['<%= meta.styles %>'],
        tasks: ['compass:debug', 'concat:debug']
      }
    },

    // Clean target directories
    clean: {
      debug: ['debug'],
      buildTemp: [
        'build/default.css',
        'build/print.css',
        'build/app.js'
      ],
      all: ['debug', 'build']
    },

    // Run Jekyll commands
    jekyll: {
      server: {
        server : true,
        // Add the --watch flag, i.e. rebuild on file changes
        watch: true
      },
      build: {
        server: false
      }
    }

  });

  // Load tasks from plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify2');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jekyll');

  // Compile JS & CSS, run watch to recompile on change
  grunt.registerTask('debug', function() {
    // Rebuild './debug'
    grunt.task.run([
      'clean:debug',
      'compass:debug',
//      'browserify2:debug',
      'concat:debug'
    ]);
    // Watch for changes
    grunt.task.run('watch');
  });

  // Alias to `grunt jekyll:server`
  grunt.registerTask('server', 'jekyll:server');

  // Run Jekyll build with environment set to production
  grunt.registerTask('jekyll-production', function() {
    grunt.log.writeln('Setting environment variable JEKYLL_ENV=production');
    process.env.JEKYLL_ENV = 'production';
    grunt.task.run('jekyll:build');
  });

  // Compile and minify JS & CSS, run Jekyll build for production 
  grunt.registerTask('build', [
    'clean:all',
    'compass:build',
//    'browserify2:build',
    'concat:build',
    'cssmin',
    'uglify',
    'clean:buildTemp',
    'jekyll-production'
  ]);

  grunt.registerTask('default', ['debug']);

};