module.exports = function(config) {
    config.set({

        basePath: '',
        // frameworks to use
        frameworks: ['browserify', 'mocha', 'chai'],

        // list of files / patterns to load in the browser

        files: [
            "node_modules/jquery/dist/jquery.js",
            "node_modules/angular/angular.js",
            "node_modules/angular-ui-router/release/angular-ui-router.js",
            "node_modules/angular-mocks/angular-mocks.js",
            "node_modules/angular-ys-directive-only-number/dist/angular-ys-directive-only-number.js",
            "node_modules/angular-ys-factory-keyboard/dist/angular-ys-factory-keyboard.js",
            "node_modules/angular-ys-service-keyboard/dist/angular-ys-service-keyboard.js",
            "app/scripts/main.js",
            "app/scripts/controllers/footer.js",
            "app/scripts/controllers/header.js",
            "app/scripts/controllers/help.js",
            "app/scripts/controllers/home.js",
            "app/scripts/directives/buttonsearch.js",
            "app/scripts/services/constants.js",
            "test/spec/test.js",
            "test/spec/controllers/footer.js",
            "test/spec/controllers/header.js",
            "test/spec/controllers/help.js",
            "test/spec/controllers/home.js",
            "test/spec/directives/buttonsearch.js",
            "test/spec/services/constants.js"
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
            dir: 'coverage',
            reporters: [{
                type: 'html',
                subdir: '.'
            }]
        },

        junitReporter: {
            outputDir: 'reports',
            outputFile: 'test-results.xml',
            useBrowserName: false
        }

    });
};