angular.module('nav.kravdialogbp.felles', [
    'nav.constant',
    'nav.data',
    'nav.kravdialogbp.googleanalytics',
    'nav.kravdialogbp.httpProvider',
    'nav.kravdialogbp.loader',
    'nav.kravdialogbp.routes',
    'nav.kravdialogbp.timeoutbox'
]);

require('./constants/constantsModule');
require('./data/dataModule');
require('./googleanalytics/googleAnalyticsModule');
require('./httpprovider/httpProviderModule');
require('./loader/loaderModule');
require('./routes/routesModule');
require('./timeoutbox/timeoutboxModule');