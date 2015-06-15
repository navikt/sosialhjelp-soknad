require('./soknadDirective');
require('./soknadService');

angular.module('nav.bilstonad.skjema', [
    'nav.bilstonad.soknad.directive',
    'nav.bilstonad.soknad.service'
]);