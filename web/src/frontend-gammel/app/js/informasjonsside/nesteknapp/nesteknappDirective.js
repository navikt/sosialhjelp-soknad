angular.module('nav.soknadsosialhjelp.informasjonsside')
    .directive('informasjonssideNesteknapp', function (soknadService, $location, Miljovariabler) {
        return {
            templateUrl: 'js/informasjonsside/nesteknapp/nesteknapp.html',
            link: function (scope) {
                Miljovariabler.get().then((result) => {
                    scope.dittnavUrl = result.data['dittnav.link.url'];
                });

                scope.nesteSide = function () {
                    scope.fremdriftsindikator = {
                        laster: true
                    };

                    soknadService.delsteg({
                        behandlingsId: soknadService.soknad.brukerBehandlingId,
                        delsteg: 'utfylling'
                    }).then(function () {
                        $location.path("/soknad");
                    }).catch(function () {
                        scope.fremdriftsindikator.laster = false;
                    });
                };
            }
        };
    });
