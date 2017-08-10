const OUTPUT_DIRECTORY = require('./constants').OUTPUT_DIRECTORY;
const autoprefixer = require('gulp-autoprefixer');
const gutil = require('gulp-util');

function buildLess(gulp) {
    return () => {
        const less = require('gulp-less');
        const rename = require('gulp-rename');
        const unikeFilnavn = require('./unike-filnavn');

        return gulp.src('./app/css/soknadsosialhjelp-main.less')
            .pipe(less().on('error', function(err){
                gutil.log(`error in less: ${err.message}`);
                this.emit('end');
            }))
            .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
            .pipe(rename(unikeFilnavn.getFilename('soknadsosialhjelp', 'css')))
            .pipe(gulp.dest(OUTPUT_DIRECTORY + 'css/'));
    };
}

module.exports = buildLess;