const gutil = require('gulp-util');

module.exports = {
    OUTPUT_DIRECTORY: '../main/webapp/',
    isProduction: () => gutil.env.prod != null,
    isDevelopment: () => gutil.env.prod == null
};