module.exports = function(config) {
  config.set({

    basePath: '',
    // frameworks to use
    frameworks: ['browserify', 'mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/mocha/mocha.js',
      'bower_components/chai/chai.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/scripts/main.js',
      'app/scripts/**/*.js',
      'test/spec/test.js',
      'test/spec/**/*.js'
    ],

    reporters: ['progress', 'mocha', 'junit', 'coverage'],

    hostname: 'localhost',

    port: 9000,

    colors: true,

    autoWatch: true,

    browsers: ['PhantomJS'],

    preprocessors: {
      'app/scripts/**/*.js': ['coverage']
    },

    coverageReporter: {
      dir: 'reports/coverage',
      reporters: [{
          type: 'html',
          subdir: 'report-html'
        },
        {
          type: 'lcov',
          subdir: 'report-lcov'
        },
        {
          type: 'cobertura',
          subdir: '.',
          file: 'cobertura.txt'
        },
        {
          type: 'lcovonly',
          subdir: '.',
          file: 'report-lcovonly.txt'
        },
        {
          type: 'teamcity',
          subdir: '.',
          file: 'teamcity.txt'
        },
        {
          type: 'text',
          subdir: '.',
          file: 'text.txt'
        },
        {
          type: 'text-summary',
          subdir: '.',
          file: 'text-summary.txt'
        },
      ]
    },

    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      },
      output: 'autowatch'
    },

    junitReporter: {
      outputDir: 'reports',
      outputFile: 'test-results.xml',
      useBrowserName: false
    }

  });
};
