const constants = require('./constants');
const uniqueName = constants.isProduction() ? Math.floor(Date.now() / 1000) : "";

function getFilename(basename, extension) {
    return basename  + "." + extension;
}

module.exports = {
    getFilename: (basename, extension) => getFilename(basename, extension),
    uniqueName
};