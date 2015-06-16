require('angular-cms');
require('angular-miljovariabler');
require('angular-route');
require('angular-soknad-routeredirect');

angular.module('nav.bilstonad.routes', [
    'nav.miljovariabler',
    'nav.redirectTilDiagloginnsending.routes',
    'nav.cms',
    'ngRoute'
]);

require('./routesConfig');
