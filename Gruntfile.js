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
        	'debug/lib.js': ['js/libs/modernizr.js', 'js/libs/jquery.js', 'js/libs/bootstrap.js', 'js/libs/holder.js'],
            'debug/classes.js': ['js/classes/app.js' ]    
        }
      },
      build: {
        files: {
            'build/lib.js': ['js/libs/modernizr.js', 'js/libs/jquery.js', 'js/libs/bootstrap.js', 'js/libs/holder.js'],
            'build/classes.js': ['js/classes/app.js' ]
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
        tasks: []
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
          options: {
              serve : true,
//              server_port: 4444,
              // Add the --watch flag, i.e. rebuild on file changes
              watch: true
          }
      },
      build: {
          options: {
              serve: false
          }
      }
    }

  });

  // Load tasks from plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
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
    'concat:build',
    'cssmin',
    'uglify',
    'clean:buildTemp',
    'jekyll-production'
  ]);

  grunt.registerTask('default', ['debug']);

};