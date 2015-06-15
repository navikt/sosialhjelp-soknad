angular.module('bilstonad')
    .value('data', {})
    .value('cms', {})
    .config(function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN-SOKNAD-API';
    })
    .run(function ($rootScope, $location) {
        $('#hoykontrast a, .skriftstorrelse a').attr('href', '#');

        if (typeof(ga) !== 'undefined') {
            ga('set', 'location', window.location.protocol + '//' + window.location.hostname + window.location.pathname.replace(/\/[^\/|start]*$/, '/soknad') + window.location.search);
        }

        $rootScope.app = {laster: false};

        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.$$route && next.$$route.resolve) {
                $rootScope.app.laster = true;
            }
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.app.laster = false;
            if (typeof(ga) !== 'undefined') {
                ga('send', 'pageview', $location.path());
            }
        });
    });