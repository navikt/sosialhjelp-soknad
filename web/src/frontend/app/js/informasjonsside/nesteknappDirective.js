angular.module('nav.kravdialogbp.informasjonsside')
    .directive('informasjonssideNesteknapp', function (soknadService, data, $location) {
        return {
            scope: true,
            templateUrl: 'js/informasjonsside/nesteknapp.html',
            link: function(scope) {
                scope.nesteSide = function() {
                    scope.fremdriftsindikator = {
                        laster: true
                    };

                    soknadService.delsteg({behandlingsId: data.soknad.brukerBehandlingId, delsteg: 'utfylling'}).$promise.then(function() {
                        $location.path("/soknad");
                    }).catch(function () {
                        scope.fremdriftsindikator.laster = false;
                    });
                }
            }
        };
    });
