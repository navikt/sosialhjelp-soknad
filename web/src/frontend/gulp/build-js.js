const constants = require('./constants');
const OUTPUT_DIRECTORY = constants.OUTPUT_DIRECTORY;
const isProduction = constants.isProduction;
const isDevelopment = constants.isDevelopment;

const onError = function (err) {
    const gutil = require('gulp-util');
    gutil.beep();
    gutil.log("Error: [line " + err.lineNumber + "] " + err.message);
};

function bundle(gulp, bundle, bundleFileName) {
    const gulpif = require('gulp-if');
    const buffer = require('vinyl-buffer');
    const uglify = require('gulp-uglify');
    const source = require('vinyl-source-stream');
    const replace = require('gulp-replace');
    const rename = require('gulp-rename');
    const unikeFilnavn = require('./unike-filnavn');
    const ngAnnotate = require('gulp-ng-annotate');

    return bundle
        .bundle()
        .on('error', function (err) {
            onError(err);
            this.emit('end');
        })
        .pipe(source(bundleFileName +'.js'))
        .pipe(buffer())
        .pipe(gulpif(isDevelopment() && bundleFileName.includes('vendor'), replace("/sendsoknad", "http://127.0.0.1:8181/sendsoknad")))
        .pipe(gulpif(isProduction(), buffer()))
        .pipe(gulpif(isProduction(), ngAnnotate()))
        .pipe(gulpif(isProduction(), uglify())).on('error', function (error) {
            onError(error);
            process.exit(1);
        })
        .pipe(rename(unikeFilnavn.getFilename(bundleFileName, 'js')))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
}

function buildJs(gulp) {
    return () => {
        const browserify = require('browserify');
        const babelify = require('babelify');

        var bundler = browserify('./app/js/app.js', {
            debug: isDevelopment(),
            fullPaths: isDevelopment()
        }).transform(babelify, {presets: ['es2015']});
        return bundle(gulp, bundler, 'kravdialog');
    };
}

function buildVendors(gulp) {
    return () => {
        const browserify = require('browserify');
        const babelify = require('babelify');

        var bundler = browserify('./app/js/vendors.js', {
            debug: isDevelopment(),
            fullPaths: isDevelopment()
        }).transform(babelify, {presets: ['es2015']});
        return bundle(gulp, bundler, 'vendors');
    };
}

function buildJsWatchify(gulp) {
    return () => {
        const watchify = require('watchify');
        const browserify = require('browserify');
        const gutil = require('gulp-util');
        const babelify = require('babelify');

        const browserifyOpts = {
            debug: isDevelopment(),
            entries: './app/js/app.js',
            cache: {},
            packageCache: {},
            fullPaths: isDevelopment()
        };

        var opts = Object.assign({}, watchify.args, browserifyOpts);
        var bundler = watchify(browserify(opts)).transform(babelify, {presets: ['es2015']});

        bundler.on('update', function () {
            gutil.log('Starting', gutil.colors.cyan("'watchify rebundle'"), '...');
            var start = new Date();

            return bundle(gulp, bundler, 'kravdialog').on('end', function () {
                var time = parseFloat((new Date() - start) / 1000).toFixed(2);
                gutil.log('Finished', gutil.colors.cyan("'watchify rebundle'"), 'after', gutil.colors.magenta(time + ' s'));
            });
        });

        return bundle(gulp, bundler, 'kravdialog');
    };
}

module.exports = {
    buildJsWatchify: (gulp) => buildJsWatchify(gulp),
    buildVendors: (gulp) => buildVendors(gulp),
    buildJs: (gulp, pathToAppjs) => buildJs(gulp)
};
