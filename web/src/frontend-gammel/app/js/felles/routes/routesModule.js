angular.module('nav.soknadsosialhjelp.routes', [
    'nav.miljovariabler',
    'nav.redirectTilDiagloginnsending.routes',
    'nav.cms',
    'ngRoute'
]);

require('angular-cms');
require('angular-miljovariabler');
require('angular-soknad-routeredirect');
require('./routesConfig');
