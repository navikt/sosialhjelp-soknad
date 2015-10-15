angular.module('nav.kravdialogbp.soknad', [
    'nav.accordion',
    'nav.kravdialogbp.soknad.dummybolk',
    'nav.kravdialogbp.soknad.dummybolk2',
    'nav.bolker',
    'nav.cms',
    'nav.services.soknad',
    'nav.fremdriftsindikator',
    'nav.miljovariabler',
    'nav.modal',
    'nav.modalsideskall',
    'nav.navfaktum',
    'nav.sidetittel',
    'nav.stickyFeilmelding',
    'nav.stegindikator',
    'nav.sistLagret',
    'nav.stickybunn',
    'nav.validering',
    'ngResource'
]);

require('angular-cms');
require('angular-miljovariabler');
require('angular-soknad-bolker');
require('angular-soknad-fremdriftsindikator');
require('angular-soknad-tittel');
require('angular-modal');
require('angular-modalsideskall');
require('angular-navfaktum');
require('angular-soknad-validering');
require('angular-stegindikator');
require('angular-accordion');
require('angular-soknad-sistlagret');
require('angular-soknad-stickybunn');

require('./soknadDirective');
require('./soknadBolkService');
require('./bolker/dummybolk/dummybolkModule');
require('./bolker/dummybolk2/dummybolk2Module');