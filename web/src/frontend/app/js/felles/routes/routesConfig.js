angular.module('nav.kravdialogbp.routes')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/opprett', {
                template: '<opprett></opprett>',
                resolve: {
                    cms: function (CmsResolver) {
                        return CmsResolver;
                    },
                    miljovariabler: function (MiljovariablerResolver) {
                        return MiljovariablerResolver;
                    }
                }
            })
            .when('/informasjonsside', {
                template: '<informasjonsside></informasjonsside>',
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
                template: '<soknad></soknad>',
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
                redirectTo: '/opprett'
            })
            .otherwise({redirectTo: '/404'});
    });
