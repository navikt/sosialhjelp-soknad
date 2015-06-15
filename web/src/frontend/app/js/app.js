var Globals = window.Globals || {};
Globals.utils = require("angular-common-utils").utils;
window.Globals = Globals;

require('./navmodules');
require('nav-timeoutbox');

angular.module('bilstonad', [
    'nav.bilstonad.navmodules',
    'nav.bilstonad.vendors',
    'nav.bilstonad.routes',
    'nav.bilstonad.hovedindeks',
    'nav.timeoutbox.service'
]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('resetTimeoutInterceptor');
    $httpProvider.interceptors.push('settDelstegStatusEtterKallMotServer');
    $httpProvider.interceptors.push('feilhandteringInterceptor');

    if (window.Globals.utils.getIEVersion() < 10) {
        $httpProvider.interceptors.push('httpRequestInterceptorPreventCache');
    }
}]).run(function (TimeoutboxService) {
    TimeoutboxService.init();
});

// Disse må requires etter hovedmodulen er definert
require('./init');
require('./index');
require('./routes');