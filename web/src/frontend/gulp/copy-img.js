const OUTPUT_DIRECTORY = require('./constants').OUTPUT_DIRECTORY;

function cleanImg() {
    return () => {
        const del = require('del');
        return del([OUTPUT_DIRECTORY + 'img/'], {'force': true});
    };
}

function copyImg(gulp) {
    return () => {
        return gulp.src(['./node_modules/modig-frontend/modig-frontend-ressurser/src/main/resources/META-INF/resources/img/**/*', './app/img/*'])
            .pipe(gulp.dest(OUTPUT_DIRECTORY + 'img/'));
    };
}

module.exports = {
    cleanImg: () => cleanImg(),
    copyImg: (gulp) => copyImg(gulp)
};