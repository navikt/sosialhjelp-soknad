angular.module('nav.kravdialogbp.opprett')
    .directive('opprett', function (UtilService, RedirectRiktigDelsteg, Miljovariabler) {
        return {
            scope: true,
            templateUrl: 'js/opprett/opprett.html',
            link: function(scope) {
                Miljovariabler.get().then((result) => scope.dittnavUrl = result.data['dittnav.link.url']);

                if(UtilService.getBehandlingIdFromUrl()) {
                    RedirectRiktigDelsteg.gaaTilRiktigDelsteg();
                }
            }
        };
    });

