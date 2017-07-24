angular.module('nav.soknadsosialhjelp.felles', [
    'nav.constant',
    'lodash',
    'nav.soknadsosialhjelp.googleanalytics',
    'nav.soknadsosialhjelp.httpProvider',
    'nav.soknadsosialhjelp.loader',
    'nav.soknadsosialhjelp.routes'
]);

require('./constants/constantsModule');
require('./lodash/lodash-module');
require('./googleanalytics/googleAnalyticsModule');
require('./httpprovider/httpProviderModule');
require('./loader/loaderModule');
require('./routes/routesModule');