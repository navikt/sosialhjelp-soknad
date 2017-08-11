const karmaServer = require('karma').Server;

function test(isDevelopment) {
    return () => {
        const browsers = ['PhantomJS'];
        if (isDevelopment) {
            browsers.push('Chrome')
        }

        return new karmaServer({
            configFile: __dirname + '/../test/karma/karma.conf.js',
            browsers: browsers,
            singleRun: true
        }).start();
    }
}

function tdd(done) {
    return () => {
        new karmaServer({
            configFile: __dirname + '/../test/karma/karma.conf.js',
            browsers:['Chrome']
        }, done).start();
    }
}

module.exports = {
    test: (isDevelopment) => test(isDevelopment),
    tdd: (done) => tdd(done)
};
