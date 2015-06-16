angular.module('nav.boilerplate.loader')
    .run(function ($rootScope) {
        $rootScope.app = {laster: false};

        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.$$route && next.$$route.resolve) {
                $rootScope.app.laster = true;
            }
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.app.laster = false;
        });
    });