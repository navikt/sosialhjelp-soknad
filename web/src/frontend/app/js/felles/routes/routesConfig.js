angular.module('nav.bilstonad.routes')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/soknad', {
                template: '<div data-skjema>',
                resolve: {
                    cms: function (CmsResolver) {
                        return CmsResolver;
                    },
                    soknad: function (SoknadMedFaktaResolver) {
                        return SoknadMedFaktaResolver.get();
                    },
                    miljovariabler: function (MiljovariablerResolver) {
                        return MiljovariablerResolver;
                    },
                    land: function (LandResolver) {
                        return LandResolver;
                    }
                }
            })
            .when('/', {
                redirectTo: '/soknad'
            })
            .otherwise({redirectTo: '/404'});
    });
