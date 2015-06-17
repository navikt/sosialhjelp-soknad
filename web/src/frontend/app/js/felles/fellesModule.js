angular.module('nav.kravdialogbp.felles', [
    'nav.constant',
    'nav.data',
    'nav.feilside',
    'nav.kravdialogbp.googleanalytics',
    'nav.kravdialogbp.httpProvider',
    'nav.kravdialogbp.loader',
    'nav.kravdialogbp.routes',
    'nav.kravdialogbp.timeoutbox'
]);

require('./feilsider/feilsideController');
require('./constants/constantsModule');
require('./data/dataModule');
require('./googleanalytics/googleAnalyticsModule');
require('./httpprovider/httpProviderModule');
require('./loader/loaderModule');
require('./routes/routesModule');
require('./timeoutbox/timeoutboxModule');