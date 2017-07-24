const OUTPUT_DIRECTORY = require('./constants').OUTPUT_DIRECTORY;
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const templateCache = require('gulp-angular-templatecache');
const unikeFilnavn = require('./unike-filnavn');
const uniqueName = require('./unike-filnavn').uniqueName;

function buildHtml(gulp) {
    return () => {
        return gulp.src(OUTPUT_DIRECTORY + 'kravdialog.html')
            .pipe(replace('{{timestamp}}', uniqueName))
            .pipe(rename('kravdialogBuilt.html'))
            .pipe(gulp.dest(OUTPUT_DIRECTORY));
    };
}

function buildTemplates(gulp) {
    return () => {
        return gulp.src('./app/**/*.html')
            .pipe(templateCache({
                standalone: true
            }))
            .pipe(rename(unikeFilnavn.getFilename('templates', 'js')))
            .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
    }
}

function buildFellesTemplates(gulp) {
    return () => {
        return gulp.src('./node_modules/**/*Template.html')
            .pipe(templateCache({
                filename: 'felles-templates.js'
            }))
            .pipe(rename(unikeFilnavn.getFilename('felles-templates', 'js')))
            .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
    };
}

module.exports = {
    buildHtml: (gulp) => buildHtml(gulp),
    buildTemplates: (gulp) => buildTemplates(gulp),
    buildFellesTemplates: (gulp) => buildFellesTemplates(gulp)
};