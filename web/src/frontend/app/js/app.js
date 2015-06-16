var Globals = window.Globals || {};
Globals.utils = require("angular-common-utils").utils;
window.Globals = Globals;

angular.module('kravdialogbp', [
    'nav.kravdialogbp.felles',
    'nav.kravdialogbp.informasjonsside',
    'nav.kravdialogbp.soknad',
    'nav.kravdialogbp.vendors'
]);

require('./felles/fellesModule');
require('./informasjonsside/informasjonssideModule');
require('./soknad/soknadModule');
require('./vendors');
