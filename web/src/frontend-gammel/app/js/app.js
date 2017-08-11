var Globals = window.Globals || {};
Globals.utils = require("angular-common-utils").utils;
window.Globals = Globals;

angular.module('soknadsosialhjelp', [
    'nav.soknadsosialhjelp.felles',
    'nav.soknadsosialhjelp.informasjonsside',
    'nav.soknadsosialhjelp.soknad',
    'nav.soknadsosialhjelp.opprett',
    'nav.soknadsosialhjelp.vendors'
]);

require('./felles/fellesModule');
require('./informasjonsside/informasjonssideModule');
require('./soknad/soknadModule');
require('./opprett/opprettModule');
