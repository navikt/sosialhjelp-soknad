angular.module('nav.boilerplate.felles', [
    'nav.constant',
    'nav.data',
    'nav.boilerplate.googleanalytics',
    'nav.boilerplate.httpProvider',
    'nav.boilerplate.loader',
    'nav.boilerplate.routes',
    'nav.boilerplate.timeoutbox'
]);

require('./constants/constantsModule');
require('./data/dataModule');
require('./googleanalytics/googleAnalyticsModule');
require('./httpprovider/httpProviderModule');
require('./loader/loaderModule');
require('./routes/routesModule');
require('./timeoutbox/timeoutboxModule');