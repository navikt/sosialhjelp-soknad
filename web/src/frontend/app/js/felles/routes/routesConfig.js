angular.module('nav.bilstonad.routes')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/informasjonsside', {
                template: '<div data-informasjonsside>',
                resolve: {
                    cms: function (CmsResolver) {
                        return CmsResolver;
                    }
                }
            })
            .when('/soknad', {
                template: '<div data-soknad>',
                resolve: {
                    cms: function (CmsResolver) {
                        return CmsResolver;
                    },
                    soknad: function (SoknadMedFaktaResolver) {
                        return SoknadMedFaktaResolver.get();
                    },
                    miljovariabler: function (MiljovariablerResolver) {
                        return MiljovariablerResolver;
                    }
                }
            })
            .when('/', {
                redirectTo: '/informasjonsside'
            })
            .otherwise({redirectTo: '/404'});
    });
