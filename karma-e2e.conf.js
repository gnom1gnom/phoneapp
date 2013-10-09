// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['ng-scenario'],

        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/underscore/underscore.js',
            'test/e2e/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
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
        browsers: ['Chrome_without_security'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        reporters: ['dots'],

        // you can define custom flags
        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },

        plugins: [
            'karma-ng-scenario',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],

        // Uncomment the following lines if you are using grunt's server to run the tests
        proxies: {
            '/': 'http://kjurkowski.waw.eo.pl:9000/'
        },
        // URL root prevent conflicts with the site root
        urlRoot: '_karma_'
    });
};