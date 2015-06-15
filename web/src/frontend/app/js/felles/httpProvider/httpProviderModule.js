require('./httpProviderConfig');
require('angular-interceptors');

angular.module('nav.bilstonad.httpProvider', [
    'nav.interceptors'
]);