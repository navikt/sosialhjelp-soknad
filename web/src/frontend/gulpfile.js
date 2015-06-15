var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var karma = require('gulp-karma');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var karmaServer = require('karma').server;
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var del = require('del');
var less = require('gulp-less');
var replace = require('gulp-replace');
var recess = require('gulp-recess');

var OUTPUT_DIRECTORY = '../main/webapp/';

var isDevelopment = !!gutil.env.dev;
var isProduction = !isDevelopment;

var onError = function(err) {
    gutil.beep();
    gutil.log(err.message);
};

gulp.task('jshint', function() {
    // Run JSHint on everything but tredjeparts-JS
    return gulp.src(['./app/js/*/*.js', './app/js/*/!(tredjeparts)/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('build-vendors', function() {
    return browserify('./app/js/vendors.js', { debug: isDevelopment })
        .transform({global: false}, browserifyShim)
        .bundle()
        .pipe(source('vendors.js'))
        .pipe(buffer())
        .pipe(gulpif(isDevelopment, replace("/sendsoknad", "http://127.0.0.1:8181/sendsoknad")))
        .pipe(gulpif(isProduction, ngAnnotate()))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
});

gulp.task('build-bilstonad-js', function() {
    return browserify('./app/js/app.js', { debug: isDevelopment })
        .bundle()
        .on('error', function(err) {
            onError(err);
            this.end();
        })
        .pipe(source('bilstonad.js'))
        .pipe(buffer())
        .pipe(gulpif(isProduction, ngAnnotate()))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
});

gulp.task('build-templates', function() {
    return gulp.src('./app/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
});

gulp.task('build-felles-templates', function() {
    return gulp.src('./node_modules/**/*Template.html')
        .pipe(templateCache({
            filename: 'felles-templates.js'
        }))
        .pipe(gulp.dest(OUTPUT_DIRECTORY+ 'js/'));
});

gulp.task('build-less', function() {
    return gulp.src('./app/css/bilstonad-main.less')
        .pipe(less())
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'css/'));
});

gulp.task('recess', ['build-less'], function() {
    return gulp.src(OUTPUT_DIRECTORY + 'css/bilstonad-main.css')
        .pipe(recess())
        .on('error', function(err) {
            onError(err);
            this.end();
        })
        .pipe(recess.reporter())
        .pipe(gulp.dest('RECESS'));
});

gulp.task('copy-img', function() {
    return gulp.src(['./node_modules/modig-frontend/modig-frontend-ressurser/src/main/resources/META-INF/resources/img/**/*', './app/img/*'])
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'img/'));
});

gulp.task('test', function() {
    var browsers = ['PhantomJS'];
    if (isDevelopment) {
        browsers.push('Chrome')
    }

    return gulp.src('./foobar')
        .pipe(karma({
            configFile: './test/karma/karma.conf.js',
            browsers: browsers,
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('tdd', function(done){
    karmaServer.start({configFile: __dirname + '/test/karma/karma.conf.js'}, done);
});

gulp.task('clean', function(callback) {
    return del([
        // Delete all copied images and built .js- and .css-files in outputDirectory
        OUTPUT_DIRECTORY + 'js/',
        OUTPUT_DIRECTORY + 'css/',
        OUTPUT_DIRECTORY + 'img/'
    ], {'force' : true}, callback);
});

gulp.task('build', ['build-vendors', 'build-bilstonad-js', 'build-templates', 'build-felles-templates', 'build-less', 'copy-img']);

gulp.task('watch', function() {
    isProduction = false;
    isDevelopment = true;
    gulp.start('build');
    gulp.watch('./app/js/**/*.js', ['build-bilstonad-js']);
    gulp.watch('./app/**/*.html', ['build-templates']);
    gulp.watch('./app/css/*.less', ['build-less']);
});

gulp.task('default', ['clean'], function() {
    gutil.log("-------- Start building for " + (isProduction ? "production" : "development"));
    gulp.start('jshint', 'build');
});