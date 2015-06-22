// Karma configuration
// Generated on Thu Sep 05 2013 15:48:54 GMT+0200 (Central Europe Daylight Time)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        // '../../' sets the path to the frontend folder
        basePath: '../../',

        // frameworks to use
        frameworks: ['browserify', 'jasmine'],

        preprocessors: {
            'app/**/!(*Spec).js': ['browserify'],
            'app/**/*.html': 'ng-html2js'
        },

        // list of files / patterns to load in the browser
        files: [
            'app/js/vendors.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/karma/helpers/**/*.js',
            'app/js/app.js',
            'app/js/**/*.js',
            'app/**/*.html',
            'test/karma/lib/**/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-browserify',
            'browserify-istanbul',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],

        ngHtml2JsPreprocessor: {
            moduleName: 'templates-main',
            cacheIdFromPath: function(filepath) {
                var filepathBeginsWithApp = filepath.substr(0,4) == 'app/';

                if (filepathBeginsWithApp) {
                    // Remove app/ from filepath
                    filepath = filepath.substring(4);
                }

                return filepath;
            }
        },

        "browserify": {
            "debug": true,
            "transform": ["browserify-shim", "browserify-istanbul"]
        },

        coverageReporter: {
            dir: '../../target/karma-coverage',
            reporters: [
                { type: 'lcovonly' },
                { type: 'html', subdir: 'report-html' }
            ]
        },

        junitReporter: {
            outputFile: '../../target/surefire-reports/TEST-karma.xml',
            suite: ''
        }

    });
};
