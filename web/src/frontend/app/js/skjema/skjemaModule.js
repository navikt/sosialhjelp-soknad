angular.module('nav.kravdialogbp.skjema', [
    'nav.kravdialogbp.skjema.dummybolk',
    'nav.bolker',
    'nav.cms',
    'nav.fremdriftsindikator',
    'nav.miljovariabler',
    'nav.modal',
    'nav.modalsideskall',
    'nav.sidetittel',
    'nav.stickyFeilmelding',
    'nav.validering',
    'ngResource'
]);

require('angular-cms');
require('angular-miljovariabler');
require('angular-resource');
require('angular-soknad-bolker');
require('angular-soknad-fremdriftsindikator');
require('angular-soknad-tittel');
require('angular-modal');
require('angular-modalsideskall');
require('angular-soknad-validering');
require('./skjemaDirective');
require('./skjemaService');
require('./dummybolk/dummybolkModule');