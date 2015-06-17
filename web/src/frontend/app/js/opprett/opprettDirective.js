angular.module('nav.kravdialogbp.opprett')
    .directive('opprett', function (data, UtilService, RedirectRiktigDelsteg) {
        return {
            scope: true,
            templateUrl: 'js/opprett/opprett.html',
            link: function(scope) {
                scope.dittnavUrl = data.miljovariabler['dittnav.link.url'];

                if(UtilService.getBehandlingIdFromUrl()) {
                    RedirectRiktigDelsteg.gaaTilRiktigDelsteg();
                }
            }
        };
    });
