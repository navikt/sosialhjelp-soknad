angular.module('nav.boilerplate.googleanalytics')
    .run(function ($rootScope, $location) {
        if (typeof(ga) !== 'undefined') {
            ga('set', 'location', window.location.protocol + '//' + window.location.hostname + window.location.pathname.replace(/\/[^\/|start]*$/, '/soknad') + window.location.search);
        }

        $rootScope.$on('$routeChangeSuccess', function () {
            if (typeof(ga) !== 'undefined') {
                ga('send', 'pageview', $location.path());
            }
        });
    });