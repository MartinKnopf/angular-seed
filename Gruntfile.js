'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // forward requests to fake backend
  var httpProxy = require('http-proxy'),
    proxy = new httpProxy.RoutingProxy(),
    backend = {
      host: 'localhost',
      port: 9000
    },
    proxyFunction = function (req, res, next) {
      var match = req.url.toString().match(/.*\/rest.*/);
      if (match) {
        proxy.proxyRequest(req, res, backend);
      } else {
        next();
      }
    };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      test: 'test',
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= yeoman.app %>/**/*.js', '<%= yeoman.test %>/**/*.js'],
        tasks: ['newer:jshint'],
        options: {
          livereload: true
        }
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['exec:scsslint', 'compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 8088,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: false,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ],
          middleware: function(connect, options, middlewares) {
            middlewares.push(proxyFunction);
            return middlewares;
          }
        }
      },
      test: {
        options: {
          port: 32187,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>',
           middleware: function(connect, options, middlewares) {
             middlewares.push(proxyFunction);
             return middlewares;
           }
        }
      }
    },

    // fake backend
    interfake: {
      options: {
        port: 9000
      },
      src: ['fake-backend.json'],
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= yeoman.app %>/scripts/**/*.js'
      ],
      test: {
        options: {
          jshintrc: '<%= yeoman.test %>/.jshintrc'
        },
        src: ['<%= yeoman.test %>/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }],
        options: {
          force: true
        }
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: '<%= yeoman.app %>/'
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        ignorePath: '<%= yeoman.app %>/bower_components/'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', '**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '**/*.html',
            'images/**/*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/styles/fonts',
          src: ['bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '**/*.css'
      },
      fonts: {
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp/styles/fonts',
          src: ['bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*']
        }
    },

    compress: {
      main: {
        options: {
          archive: '<%= yeoman.dist %>.zip'
        },
        files: [
          {src: ['dist/**'], dest: '/'}, // includes files in path
        ]
      }
    },

    exec: {
      scsslint: {
        cmd: function() {
          return 'scss-lint app/styles/** -c scss-lint.yml';
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: {
        tasks: [
          'compass:server'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      watchAndInterfake: {
        tasks: [
          'watch',
          'interfake'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      test: {
        tasks: [
          'compass'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: {
        tasks: [
          'compass:dist',
          'imagemin',
          'svgmin'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/**/*.css',
    //         '<%= yeoman.app %>/styles/**/*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false
      },
      single: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    var tasks = [];

    if (target === 'dist') {
      tasks = ['build', 'connect:dist:keepalive'];
      backend = {
        host: '127.0.0.1',
        port: 8080
      };
    } else if(target === 'withFakeBackend') {
      tasks = [
        'clean:server',
        'copy:fonts',
        'concurrent:server',
        'autoprefixer',
        'connect:livereload',
        'concurrent:watchAndInterfake'
      ];
    } else {
      tasks = [
        'clean:server',
        'copy:fonts',
        'concurrent:server',
        'autoprefixer',
        'connect:livereload',
        'watch'
      ];
      backend = {
        host: '127.0.0.1',
        port: 8080
      };
    }

    return grunt.task.run(tasks);
  });

  grunt.registerTask('test', 'Runs the unit tests with karma', function(singleRun) {
    grunt.task.run(singleRun ? ['karma:single'] : ['karma:unit']);
  });

  grunt.registerTask('build', [
    'newer:jshint',
    'exec:scsslint',
    'test:single',
    'clean:dist',
    'bowerInstall',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'compress'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
