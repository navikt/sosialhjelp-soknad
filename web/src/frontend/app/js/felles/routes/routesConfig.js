angular.module('nav.kravdialogbp.routes')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/informasjonsside', {
                template: '<div data-informasjonsside></div>',
                resolve: {
                    cms: function (CmsResolver) {
                        return CmsResolver;
                    },
                    miljovariabler: function (MiljovariablerResolver) {
                        return MiljovariablerResolver;
                    }
                }
            })
            .when('/soknad', {
                template: '<div data-soknad></div>',
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
