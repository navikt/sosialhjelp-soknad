angular.module('nav.soknadsosialhjelp.loader')
    .run(function ($rootScope) {
        $rootScope.app = {laster: false};

        var routeChangeStartCallBack = $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.$$route && next.$$route.resolve) {
                $rootScope.app.laster = true;
            }
        });

        var routeChangeSuccessCallBack = $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.app.laster = false;
        });

        $rootScope.$on('$destroy', routeChangeStartCallBack, routeChangeSuccessCallBack);
    });