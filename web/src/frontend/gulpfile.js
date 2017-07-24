const gulp = require('gulp');
const pathExistst = require('path-exists');
const gutil = require('gulp-util');

const constants = require('./gulp/constants');
const OUTPUT_DIRECTORY = constants.OUTPUT_DIRECTORY;
const isProduction = constants.isProduction;

function copyImage() {
    if (isProduction()) {
        gulp.start('copy-img');
    } else {
        pathExistst(OUTPUT_DIRECTORY + 'img/').then(function (exists) {
            if (!exists) {
                gulp.start('copy-img');
            }
        });
    }
}

gulp.task('build-less', require('./gulp/build-less')(gulp));
gulp.task('eslint', require('./gulp/eslint')(gulp));
gulp.task('build-html', require('./gulp/build-html').buildHtml(gulp));
gulp.task('build-templates', require('./gulp/build-html').buildTemplates(gulp));
gulp.task('build-felles-templates', require('./gulp/build-html').buildFellesTemplates(gulp));
gulp.task('build-js', require('./gulp/build-js').buildJs(gulp));
gulp.task('build-vendors', require('./gulp/build-js').buildVendors(gulp));
gulp.task('build-js-watchify', require('./gulp/build-js').buildJsWatchify(gulp));
gulp.task('clean-img', require('./gulp/copy-img').cleanImg());
gulp.task('copy-img', require('./gulp/copy-img').copyImg(gulp));
gulp.task('test', require('./gulp/tests').test(false));
gulp.task('tdd', require('./gulp/tests').tdd (gulp));


gulp.task('build', ['clean'], function () {
    gulp.start(['build-js', 'build-vendors', 'build-less', 'build-html', 'build-templates', 'build-felles-templates']);
    copyImage();
});

gulp.task('clean', function (callback) {
    const del = require('del');
    return del([
        // Delete all copied images and built .js- and .css-files in outputDirectory
        OUTPUT_DIRECTORY + 'js/',
        OUTPUT_DIRECTORY + 'css/',
        OUTPUT_DIRECTORY + 'index.html',
        './messages/'
    ], {'force': true}, callback);
});

gulp.task('watch', ['clean'], function () {
    process.env.NODE_ENV = 'development';

    gulp.start(['build-html', 'build-templates', 'build-felles-templates', 'build-vendors', 'build-less', 'build-js-watchify']);
    gulp.watch('./app/css/*.less', ['build-less']);
    gulp.watch('./app/**/*.html', ['build-templates']);
    copyImage();
});

gulp.task('default', ['clean'], function () {
    gutil.log("-------- Start building for " + (isProduction() ? "production" : "development"));
    gulp.start('build');
});