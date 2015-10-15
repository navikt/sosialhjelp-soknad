angular.module('nav.kravdialogbp.routes')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/opprett', {
                template: '<opprett></opprett>',
                resolve: {
                    cms: function (CmsResolver) {
                        return CmsResolver;
                    },
                    miljovariabler: function (Miljovariabler) {
                        return Miljovariabler.get();
                    }
                }
            })
            .when('/informasjonsside', {
                template: '<informasjonsside></informasjonsside>',
                resolve: {
                    cms: function (CmsResolver) {
                        return CmsResolver;
                    },
                    soknad: function(SoknadMedFaktaResolver) {
                        return SoknadMedFaktaResolver.get();
                    },
                    miljovariabler: function (Miljovariabler) {
                        return Miljovariabler.get();
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
                    miljovariabler: function (Miljovariabler) {
                        return Miljovariabler.get();
                    }
                }
            })
            .when('/', {
                redirectTo: '/opprett'
            })
            .otherwise({redirectTo: '/404'});
    });
