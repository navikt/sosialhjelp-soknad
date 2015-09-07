require('nav-logger');
require('angular-soknad-defaultresolvers');
require('angular-cms');
require('angular-loggingfiks');
require('angular-markup');
require('angular-soknad-tittel');
require('angular-soknad-feilsider');
require('nav-timeoutbox');

var Globals = window.Globals || {};
Globals.apiUrl = "/sendsoknad";
window.Globals = Globals;

NavLogger({url: window.Globals.apiUrl + '/informasjon/actions/logg'});

angular.module('nav.kravdialogbp.navmodules', [
    'nav.defaultresolvers',
    'nav.defaultservices',
    'nav.common.markup',
    'nav.feilside',
    'nav.tittel'
]).run(function(TimeoutboxService){
    TimeoutboxService.init();
});