angular.module('nav.soknadsosialhjelp.opprett')
    .directive('startSoknadButton', function (soknadService, UtilService, Miljovariabler) {
        return {
            replace: true,
            templateUrl: 'js/opprett/startSoknadButton/startSoknadButtonTemplate.html',
            link: function (scope) {
                Miljovariabler.get().then((result) => scope.dittnavUrl = result.data['dittnav.link.url']);

                scope.startSoknad = function () {
                    scope.fremdriftsindikator = {
                        laster: true
                    };

                    var skjemanummer = "NAV 04-01.03";

                    soknadService.create({soknadType: skjemanummer}).then(function (soknad) {
                        UtilService.redirectTilUnderside("/app/" + soknad.brukerBehandlingId + '#/informasjonsside');
                    })
                    .catch(function () {
                        scope.fremdriftsindikator.laster = false;
                    });
                };
            }
        };
    });