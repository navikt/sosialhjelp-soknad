require('./feilsiderRoutes');
require('angular-cms');
require('angular-soknad-routeredirect');

angular.module('nav.bilstonad.routes', ['ngRoute', 'nav.feilsider.routes', 'nav.redirectTilDiagloginnsending.routes'])
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
