window.$ = require('jquery');
window.angular = require('angular');
require('angular-animate');
require('angular-cookies');
require('angular-cms');
require('angular-sanitize');
require('jquery-ui-browserify');
require('../../node_modules/bootstrap/js/transition');
require('nav-logger');
require('angular-i18n/nb-no');
require('angular-soknad-defaultresolvers');
require('angular-loggingfiks');

var Globals = window.Globals || {};
Globals.apiUrl = "/sendsoknad";
window.Globals = Globals;

NavLogger({url: window.Globals.apiUrl + '/informasjon/actions/logg'});

angular.module('nav.kravdialogbp.vendors', [
    'nav.defaultresolvers',
    'nav.defaultservices',
    'ngAnimate',
    'ngCookies',
    'ngLocale',
    'ngSanitize',
    'source-map-exception-handler',
    'templates'
]);