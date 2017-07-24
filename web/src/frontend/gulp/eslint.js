function buildEslint(gulp) {
    return () => {
        const eslint = require('gulp-eslint');
        return gulp.src(['./app/js/**/*.js'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };
}

module.exports = buildEslint;