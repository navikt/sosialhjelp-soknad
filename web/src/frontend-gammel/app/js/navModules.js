require('angular-soknad-defaultresolvers');
require('angular-cms');
require('angular-booleanradio');
require('angular-loggingfiks');
require('angular-markup');
require('angular-navinput');
require('angular-soknad-tittel');
require('angular-soknad-feilsider');
require('angular-soknad-hjelpetekst');
require('nav-ng-timeoutbox');
require('nav-checkbox');
require('nav-textarea');

var NavLogger = require('nav-logger');

var Globals = window.Globals || {};
Globals.apiUrl = "/sendsoknad";
window.Globals = Globals;

NavLogger({url: window.Globals.apiUrl + '/informasjon/actions/logg'});

angular.module('nav.soknadsosialhjelp.navmodules', [
    'nav.defaultresolvers',
    'nav.defaultservices',
    'nav.timeoutbox.service',
    'nav.common.markup',
    'nav.feilside',
    'nav.hjelpetekst',
    'nav.input',
    'nav.textarea',
    'nav.tittel',
    'nav.input.checkbox',
    'nav.booleanradio'
]).run(function(TimeoutboxService){
    TimeoutboxService.init();
});