require('./bolker');
require('./felles');

angular.module('nav.bilstonad.hovedindeks', [
    'nav.bilstonad.bolker',
    'nav.bilstonad.felles',
    'nav.bilstonad.soknad'
]);