// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
//
module.exports = function (grunt) {

  grunt.initConfig ({
    pkg : grunt.file.readJSON('package.json'),

    assets: 'client/assets',
    dist: 'client/dist',

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ['<%= dist %>', 'client/test-reports'],

    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint:{
      options: {
        scripturl: true,
        laxcomma: true,
        nomen: false,
        globals : {
          angular: true,
          chai: true,
          describe: true,
          beforeEach: true,
          afterEach: true,
          it: true,
          xit: true
        }
      },
      code : {
        src: ['client/src/**/*.js']
      },
      specs : {
        src: ['client/test/**/*.js'],
        options: {
          expr: true
        }
      }
    },

    // Compiles the Less files into the style.css file.
    less:{
      app:{
        options: {
          paths: ["<%= assets %>/less"]
        },
        files : {
          '<%= dist %>/assets/css/style.css': '<%= assets %>/less/style.less'
        }
      }
    },

    // Combines the application templates into a single javascript file that populates
    // the angular template cache.
    //
    // Also builds the angular ui-bootstrap application specific template overrides
    html2js: {
      // Application Templates
      main: {
        options: {
          base: 'client',
        },
        src: [
          '<%= assets %>/templates/**/*.html'
        ],
        dest: '<%= dist %>/assets/templates/main.templates.js'
      }
    },

    // Task to add the array-style angular injection to protect against uglifying.
    ngmin : {
      app : {
        src : 'client/src/**/*.js',
        dest : '<%= dist %>/assets/js/src.js'
      }
    },

    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.
    concat:{
      jsdeps : {
        src : [

          // jQuery and Related
          '<%= assets %>/js/jquery/dist/jquery.js',

          // AngularJS libraries
          '<%= assets %>/js/angular/angular.js',
          '<%= assets %>/js/angular-resource/angular-resource.js',
          '<%= assets %>/js/angular-sanitize/angular-sanitize.js',

          // Angular UI Libraries
          '<%= assets %>/js/angular-ui-router/release/angular-ui-router.js',

          // Utilities
          '<%= assets %>/js/lodash/dist/lodash.js'
        ],

        dest: '<%= dist %>/assets/js/deps.js'
      },
      appjs : {
        src : [
          '<%= dist %>/assets/js/deps.js',
          '<%= dist %>/assets/templates/main.templates.js',
          '<%= dist %>/assets/js/src.js'
        ],
        dest: '<%= dist %>/assets/js/app.js'
      },
      css : {
        src : [
          '<%= dist %>/assets/css/style.css'
        ],
        dest: '<%= dist %>/assets/css/style.css'
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named style.css.  It
    // also minifies all the CSS as well.  This is named style.css, because we
    // only want to load one stylesheet in index.html.
    cssmin :{
      all : {
        files : {
          '<%= dist %>/assets/css/style.min.css': ['<%= dist %>/assets/css/style.css']
        }
      }
    },

    // Takes the built app.js file and minifies it for filesize benefits.
    uglify : {
      dist : {
        files: {
          '<%= dist %>/assets/js/app.min.js' : ['<%= dist %>/assets/js/app.js']
        }
      }
    },

    // A task that runs in the background 'watching' for changes to code.
    watch : {
      options : {
        livereload: true,
        atBegin: true
      },
      development: {
        files: [
          'client/src/**/*.js',
          'client/test/**/*.js',
          '<%= assets %>/templates/**/*.html',
          '<%= assets %>/scss/**/*.scss',
          'api/src/views/*.jade'
        ],
        tasks: ['development']
      },
      debug: {
        files: [
          'client/src/**/*.js',
          'client/test/**/*.js',
          '<%= assets %>/templates/**/*.html',
          '<%= assets %>/scss/**/*.scss',
          'api/src/views/*.jade'
        ],
        tasks: ['debug']
      },
      production: {
        files: [
          'client/src/**/*.js',
          'client/test/**/*.js',
          '<%= assets %>/templates/**/*.html',
          '<%= assets %>/scss/**/*.scss',
          'api/src/views/*.jade'
        ],
        tasks: ['production']
      }
    },

    // Stages all the files for running the application.  Each of these
    // tasks are cumulative where production builds off of debug, debug
    // off of development, and development off of vendor.
    // vendor: All of the 3rd party library files
    // development: All of the files required for development mode
    // debug: All of the files required for debug mode
    // production:  All of the files required for production mode
    copy: {
      vendor : {
        files: [
          {
            expand: true,
            cwd: '<%= assets %>/js/bootstrap/fonts',
            src:['**'],
            dest:'<%= dist %>/assets/fonts/glyphicons'
          }
        ]
        },
      development : {
        files: [
          {
            expand: true,
            cwd: '<%= assets %>',
            src: ['img/**', 'fonts/**'],
            dest: '<%= dist %>/assets'
          }
        ]
      },
      debug : {
        files: [
          {
            expand: true,
            cwd: '<%= dist %>/assets',
            src: ['css/style.css', 'fonts/**', 'img/**', 'js/app.js'],
            dest: '<%= dist %>/<%= pkg.name %>-debug/assets'
          },
          {
            expand: true,
            cwd: '<%= dist %>/assets/html',
            src:['index.html'],
            dest: '<%= dist %>/<%= pkg.name %>-debug'
          }
        ]
      },
      production : {
        files: [
          {
            expand: true,
            cwd: '<%= dist %>/assets',
            src: ['css/style.min.css', 'fonts/**', 'img/**', 'js/app.min.js'],
            dest: '<%= dist %>/<%= pkg.name %>/assets'
          },
          {
            src: '<%= dist %>/assets/html/index.min.html',
            dest:'<%= dist %>/<%= pkg.name %>/index.html'
          }
        ]
      }
    },

    // Compile the jade templates into html for deployment
    jade: {
      debug: {
        options: {
          pretty: true,
          data: {
            debug: true,
            env: 'debug'
          }
        },
        files: {
          '<%= dist %>/assets/html/index.html' : ['api/src/views/index.jade']
        }
      },
      production : {
        options: {
          data: {
            debug: false,
            env: 'production'
          }
        },
        files: {
          '<%= dist %>/assets/html/index.min.html' : ['api/src/views/index.jade']
        }
      }
    },

    // The **runapp** task will run the `server.js` in a `nodemon` and watch the server files for changes
    runapp: {
      development : {
        env: 'development'
      },

      debug : {
        env: 'debug'
      },

      production : {
        env: 'production'
      },

      test : {
        options: {
          dieWithParent: true
        },
        env: 'development'
      }
    },

    // Starts the karama runner for unit and e2e tests.
    // Tests are run when the task is re-invoked from the watch task.
    karma : {
      unit : {
        reporters: 'dots',
        configFile: 'karma.config.js',
      }
    },

    // Starts the protractor e2e tests.
    protractor: {
      e2e: {
        options: {
          configFile: 'protractor.config.js',
          keepAlive: true,
          noColor: false
        }
      }
    }

  });

  // Load NPM Grunt Tasks
  require('load-grunt-tasks')(grunt);

  // The default task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.

  grunt.registerTask('default', ['clean', 'jshint', 'less', 'concat:css', 'html2js', 'concat:jsdeps', 'copy:vendor', 'copy:development']);

  // Task to compile everything in development mode
  grunt.registerTask('development', ['default']);
  grunt.registerTask('debug', ['development', 'ngmin', 'concat:appjs', 'jade:debug', 'copy:debug']);
  grunt.registerTask('production', ['debug', 'cssmin', 'uglify', 'jade:production', 'copy:production']);

  // Forks off the application server and runs the unit and e2e tests.
  // Test results stored in client/test-reports
  grunt.registerTask('test', ['production', 'runapp:test', 'karma:unitci']);
};
