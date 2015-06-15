window.$ = require('jquery');
window.angular = require('angular');
require('angular-resource');
require('angular-route');
require('angular-animate');
require('angular-cookies');
require('angular-sanitize');
require('jquery-ui-browserify');
require('../../node_modules/bootstrap/js/transition');
require('nav-logger');
require('angular-i18n/nb-no');

var Globals = window.Globals || {};
Globals.apiUrl = "/sendsoknad";
window.Globals = Globals;

NavLogger({url: window.Globals.apiUrl + '/informasjon/actions/logg'});

angular.module('nav.bilstonad.vendors', [
    'ngResource',
    'ngLocale',
    'ngSanitize',
    'ngCookies',
    'ngAnimate',
    'templates'
]);