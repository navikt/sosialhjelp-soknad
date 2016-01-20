angular.module('nav.kravdialogbp.googleanalytics')
    .run(function ($rootScope, $location) {
        if (angular.isDefined(ga)) {
            ga('set', 'location', window.location.protocol + '//' + window.location.hostname + window.location.pathname.replace(/\/[^\/|start]*$/, '/soknad') + window.location.search);
        }

        var routeChangeSucessCallback = $rootScope.$on('$routeChangeSuccess', function () {
            if (angular.isDefined(ga)) {
                ga('send', 'pageview', $location.path());
            }
        });

        $rootScope.$on('$destroy', routeChangeSucessCallback);
    });