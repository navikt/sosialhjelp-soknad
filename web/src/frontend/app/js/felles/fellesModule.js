require('./cms/cmsModule');
require('./data/dataModule');
require('./googleanalytics/googleAnalyticsModule');
require('./httpprovider/httpProviderModule');
require('./loader/loaderModule');
require('./routes/routesModule');
require('./timeoutbox/timeoutboxModule');

angular.module('nav.bilstonad.felles', [
    'nav.bilstonad.cms',
    'nav.bilstonad.data',
    'nav.bilstonad.googleanalytics',
    'nav.bilstonad.httpProvider',
    'nav.bilstonad.loader',
    'nav.bilstonad.routes',
    'nav.bilstonad.timeoutbox'
]);