angular.module('nav.kravdialogbp.routes', [
    'nav.miljovariabler',
    'nav.redirectTilDiagloginnsending.routes',
    'nav.cms',
    'ngRoute'
]);

require('angular-cms');
require('angular-miljovariabler');
require('angular-route');
require('angular-soknad-routeredirect');
require('./routesConfig');
