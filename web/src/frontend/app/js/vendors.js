window.$ = require('jquery');
window.angular = require('angular');
require('angular-animate');
require('angular-cookies');
require('angular-sanitize');
require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('jquery-ui-browserify');
require('../../node_modules/bootstrap/js/transition');
require('angular-i18n/nb-no');
require('./navModules');
require('babelify/polyfill');

var Globals = window.Globals || {};
Globals.apiUrl = "/sendsoknad";
window.Globals = Globals;

angular.module('nav.kravdialogbp.vendors', [
    'ngAnimate',
    'ngCookies',
    'ngLocale',
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'nav.kravdialogbp.navmodules',
    'source-map-exception-handler',
    'templates'
]);