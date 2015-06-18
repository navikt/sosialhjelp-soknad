angular.module('nav.kravdialogbp.opprett', [
    'nav.data',
    'nav.redirect.delsteg',
    'nav.kravdialogbp.opprett.startsoknadbutton',
    'nav.utils.service'
]);

require('./opprettDirective');
require('./startSoknadButton/startSoknadButtonModule');
