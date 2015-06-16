var Globals = window.Globals || {};
Globals.utils = require("angular-common-utils").utils;
window.Globals = Globals;

angular.module('boilerplate', [
    'nav.boilerplate.felles',
    'nav.boilerplate.informasjonsside',
    'nav.boilerplate.soknad',
    'nav.boilerplate.vendors'
]);

require('./felles/fellesModule');
require('./informasjonsside/informasjonssideModule');
require('./soknad/soknadModule');
require('./vendors');
