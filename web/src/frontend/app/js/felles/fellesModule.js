angular.module('nav.bilstonad.felles', [
    'nav.bilstonad.cms',
    'nav.constant',
    'nav.data',
    'nav.bilstonad.googleanalytics',
    'nav.bilstonad.httpProvider',
    'nav.bilstonad.loader',
    'nav.bilstonad.routes',
    'nav.bilstonad.timeoutbox'
]);

require('./cms/cmsModule');
require('./constants/constantsModule');
require('./data/dataModule');
require('./googleanalytics/googleAnalyticsModule');
require('./httpprovider/httpProviderModule');
require('./loader/loaderModule');
require('./routes/routesModule');
require('./timeoutbox/timeoutboxModule');