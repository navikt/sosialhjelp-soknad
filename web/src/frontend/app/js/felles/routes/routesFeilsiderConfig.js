require('angular-cms');

angular.module('nav.kravdialogbp.routes')
    .config(function ($routeProvider) {
        $routeProvider
            //.when('/feilside', {
            //    templateUrl: 'js/felles/feilsider/templates/feilsideBaksystem.html',
            //    resolve: {
            //        cms: function (CmsResolver) {
            //            return CmsResolver;
            //        },
            //        miljovariabler: function (MiljovariablerResolver) {
            //            return MiljovariablerResolver;
            //        }
            //    }
            //})
            //.when('/feilside/soknadikkefunnet', {
            //    templateUrl: 'js/felles/feilsider/templates/soknadIkkeFunnetFeilside.html',
            //    resolve: {
            //        cms: function (CmsResolver) {
            //            return CmsResolver;
            //        },
            //        miljovariabler: function (MiljovariablerResolver) {
            //            return MiljovariablerResolver;
            //        }
            //    }
            //})
            //.when('/404', {
            //    templateUrl: 'js/felles/feilsider/templates/feilside404.html',
            //    resolve: {
            //        cms: function (CmsResolver) {
            //            return CmsResolver;
            //        },
            //        miljovariabler: function (MiljovariablerResolver) {
            //            return MiljovariablerResolver;
            //        }
            //    }
            //})
            .when('/', {
                redirectTo: '/informasjonsside'
            })
            .otherwise({redirectTo: '/404'});
    });
