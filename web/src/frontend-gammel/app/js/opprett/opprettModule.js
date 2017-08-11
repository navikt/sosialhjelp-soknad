angular.module('nav.soknadsosialhjelp.opprett', [
    'nav.redirect.delsteg',
    'nav.soknadsosialhjelp.opprett.startsoknadbutton',
    'nav.utils.service'
]);

require('./opprettDirective');
require('./startSoknadButton/startSoknadButtonModule');
