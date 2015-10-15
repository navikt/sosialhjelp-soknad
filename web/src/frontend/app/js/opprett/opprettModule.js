angular.module('nav.kravdialogbp.opprett', [
    'nav.redirect.delsteg',
    'nav.kravdialogbp.opprett.startsoknadbutton',
    'nav.utils.service'
]);

require('./opprettDirective');
require('./startSoknadButton/startSoknadButtonModule');
