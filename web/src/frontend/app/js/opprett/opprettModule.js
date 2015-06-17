angular.module('nav.kravdialogbp.opprett', [
    'nav.data',
    'nav.services.soknad',
    'nav.redirect.delsteg',
    'nav.utils.service'
]);

require('./opprettDirective');
require('./startSoknadButtonDirective');
