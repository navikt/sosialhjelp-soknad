angular.module('nav.kravdialogbp.informasjonsside')
    .directive('informasjonsside', function (data, $location, RedirectRiktigDelsteg) {
        return {
            scope: true,
            templateUrl: 'js/informasjonsside/templates/informasjonsside.html',
            link: function(scope) {
                scope.dittnavUrl = data.miljovariabler['dittnav.link.url'];

                if(window.Globals.utils.getBehandlingIdFromUrl()) {
                    RedirectRiktigDelsteg.gaaTilRiktigDelsteg();
                }

                scope.startSoknad = function () {

                };
            }
        };
    });
