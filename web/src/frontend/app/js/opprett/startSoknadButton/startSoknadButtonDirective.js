angular.module('nav.kravdialogbp.opprett')
    .directive('startSoknadButton', function (soknadService, UtilService) {
        return {
            replace: true,
            templateUrl: 'js/opprett/startSoknadButton/startSoknadButtonTemplate.html',
            link: function (scope) {
                scope.startSoknad = function () {
                    scope.fremdriftsindikator = {
                        laster: true
                    };

                    var skjemanummer = "NAV 04-01.03";

                    soknadService.create({soknadType: skjemanummer}).$promise.then(function (soknad) {
                            UtilService.redirectTilUnderside("/app/" + soknad.brukerBehandlingId + '#/informasjonsside');
                        })
                        .catch(function () {
                            scope.fremdriftsindikator.laster = false;
                        });
                };
            }
        };
    });