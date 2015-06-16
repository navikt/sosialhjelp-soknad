var Globals = window.Globals || {};
Globals.utils = require("angular-common-utils").utils;
window.Globals = Globals;

angular.module('bilstonad', [
    'nav.bilstonad.felles',
    'nav.bilstonad.informasjonsside',
    'nav.bilstonad.soknad',
    'nav.bilstonad.vendors'
]);

require('./felles/fellesModule');
require('./informasjonsside/informasjonssideModule');
require('./soknad/soknadModule');
require('./vendors');
