var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
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
var rename = require('gulp-rename');
var babelify = require('babelify');
var argv = require("yargs").argv;

var OUTPUT_DIRECTORY = '../main/webapp/';

var isDevelopment = !!gutil.env.dev;
var isProduction = !isDevelopment;

var uniqueName = isProduction ? Math.floor(Date.now() / 1000) : "";
var applikasjonsnavn = "kravdialogbp";
var contextroot = "soknadkravdialogbp";

var onError = function (err) {
    gutil.beep();
    gutil.log("Error(" + err.plugin + "): [line " + err.lineNumber + "] " + err.message);
};

function getFilename(basename, extension) {
    return basename + uniqueName + "." + extension;
}

gulp.task('jshint', function () {
    // Run JSHint on everything but tredjeparts-JS
    return gulp.src(['./app/js/*/*.js', './app/js/*/!(tredjeparts)/**/*.js'])
        .pipe(jshint({
            //varstmt:true tillatter ikke var, må bruke let eller const i stedet. Bør vurderes å dra inn gitt at man får skrevet all kode i es2016
            esnext: true,
            eqnull: true,
            curly: true,
            eqeqeq: true,
            unused: "strict", //sjekker om variabler og funksjoner blir brukt
            undef: true, //sjekker om variabler er definert
            withstmt: true, //sjekker om man bruker with
            futurehostile: true, //warning hvis man bruker indetifiers som kommer i fremtiden
            noarg: true,
            nonew: true,
            strict: "implied", //impliserer strict mode uten å måtte skrive det i filene
            jasmine: true, //de resterende tillatter globale variabler som kommer med de forskjellige rammeverkene
            jquery: true,
            browserify: true,
            browser: true,
            predef: ["angular", "inject", "ga"]

        }))
        .pipe(jshint.reporter());
});

gulp.task('build-vendors', function () {
    return browserify('./app/js/vendors.js', {debug: isDevelopment})
        .transform({global: false}, browserifyShim)
        .bundle()
        .pipe(source('vendors.js'))
        .pipe(buffer())
        .pipe(gulpif(isDevelopment, replace("/sendsoknad", "http://127.0.0.1:8181/sendsoknad")))
        .pipe(gulpif(isProduction, ngAnnotate()))
        .pipe(gulpif(isProduction, uglify())).on('error', function (error) {
            onError(error);
            process.exit(1);
        })
        .pipe(rename(getFilename('vendors', 'js')))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
});

gulp.task('build-kravdialog-js', function () {
    return browserify('./app/js/app.js', {
        debug: isDevelopment,
        paths: ['./app/js/felles/']
    })
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            onError(err);
            this.emit('end');
        })
        .pipe(source('kravdialog.js'))
        .pipe(buffer())
        .pipe(gulpif(isProduction, ngAnnotate()))
        .pipe(gulpif(isProduction, uglify())).on('error', function (error) {
            onError(error);
            process.exit(1);
        })
        .pipe(rename(getFilename('kravdialog', 'js')))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
});

gulp.task('build-templates', function () {
    return gulp.src('./app/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(rename(getFilename('templates', 'js')))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
});

gulp.task('build-kravdialog-html', function () {
    return gulp.src('./app/kravdialog.html')
        .pipe(replace('{{timestamp}}', uniqueName))
        .pipe(replace('{{appname}}', applikasjonsnavn))
        .pipe(replace('{{contextroot}}', contextroot))
        .pipe(gulp.dest(OUTPUT_DIRECTORY));
});

gulp.task('build-felles-templates', function () {
    return gulp.src('./node_modules/**/*Template.html')
        .pipe(templateCache({
            filename: 'felles-templates.js'
        }))
        .pipe(rename(getFilename('felles-templates', 'js')))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
});

gulp.task('build-less', function () {
    return gulp.src('./app/css/kravdialog-main.less')
        .pipe(less())
        .pipe(rename(getFilename('kravdialog-main', 'css')))
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'css/'));
});

gulp.task('recess', ['build-less'], function () {
    return gulp.src(OUTPUT_DIRECTORY + 'css/' + getFilename('kravdialog-main', 'css'))
        .pipe(recess())
        .on('error', function (err) {
            onError(err);
            this.end();
        })
        .pipe(recess.reporter())
        .pipe(gulp.dest('RECESS'));
});

gulp.task('copy-img', function () {
    return gulp.src(['./node_modules/modig-frontend/modig-frontend-ressurser/src/main/resources/META-INF/resources/img/**/*', './app/img/*'])
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'img/'));
});

gulp.task('test', function () {
    var browsers = ['PhantomJS'];
    if (isDevelopment) {
        browsers.push('Chrome');
    }

    return karmaServer.start({
        configFile: __dirname + '/test/karma/karma.conf.js',
        browsers: browsers,
        singleRun: true
    });
});

gulp.task('tdd', function (done) {
    karmaServer.start({configFile: __dirname + '/test/karma/karma.conf.js'}, done);
});

gulp.task('clean', function (callback) {
    return del([
        // Delete all copied images and built .js- and .css-files in outputDirectory
        OUTPUT_DIRECTORY + 'js/',
        OUTPUT_DIRECTORY + 'css/',
        OUTPUT_DIRECTORY + 'img/',
        OUTPUT_DIRECTORY + 'kravdialog.html'
    ], {'force': true}, callback);
});

gulp.task('build', ['clean'], function () {
    gulp.start(['build-vendors', 'build-kravdialog-js', 'build-templates', 'build-felles-templates', 'build-less', 'copy-img', 'build-kravdialog-html']);
});

gulp.task('watch', function () {
    isProduction = false;
    isDevelopment = true;
    gulp.start('build');
    gulp.watch('./app/js/**/*.js', ['build-kravdialog-js']);
    gulp.watch('./app/**/*.html', ['build-templates']);
    gulp.watch('./app/**/*.less', ['build-less']);
});

gulp.task("watch-dep", function () {
    isProduction = false;
    isDevelopment = true;

    var GIT_ROOT = "../../../../";
    var module = argv.module;

    console.log("watching module: " + module + " in folder: " + GIT_ROOT + module);

    gulp.start('build');
    gulp.watch('./app/js/**/*.js', ['build-kravdialog-js']);
    gulp.watch('./app/**/*.html', ['build-templates']);
    gulp.watch('./app/css/*.less', ['build-less']);

    gulp.watch(GIT_ROOT + module + '/**/*.less', ['build-less']);
    gulp.watch(GIT_ROOT + module + '/**/*.html', ['build-templates', 'build-felles-templates']);
    gulp.watch(GIT_ROOT + module + '/**/*.js', ['build-kravdialog-js']);
});

gulp.task('default', ['clean'], function () {
    gutil.log("-------- Start building for " + (isProduction ? "production" : "development"));
    gulp.start('jshint', 'build');
});