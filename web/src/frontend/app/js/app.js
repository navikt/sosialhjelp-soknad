var Globals = window.Globals || {};
Globals.utils = require("angular-common-utils").utils;
window.Globals = Globals;

require('./felles/fellesModule');
require('./soknad/soknadModule');

angular.module('bilstonad', [
    'nav.bilstonad.vendors',
    'nav.bilstonad.felles',
    'nav.bilstonad.soknad'
]);
