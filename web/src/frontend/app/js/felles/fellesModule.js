angular.module('nav.kravdialogbp.felles', [
    'nav.constant',
    'lodash',
    'nav.kravdialogbp.googleanalytics',
    'nav.kravdialogbp.httpProvider',
    'nav.kravdialogbp.loader',
    'nav.kravdialogbp.routes'
]);

require('./constants/constantsModule');
require('./lodash/lodash-module');
require('./googleanalytics/googleAnalyticsModule');
require('./httpProvider/httpProviderModule');
require('./loader/loaderModule');
require('./routes/routesModule');