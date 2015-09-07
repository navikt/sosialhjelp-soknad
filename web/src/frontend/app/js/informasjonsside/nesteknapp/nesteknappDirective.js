angular.module('nav.kravdialogbp.informasjonsside')
    .directive('informasjonssideNesteknapp', function (soknadService, data, $location) {
        return {
            templateUrl: 'js/informasjonsside/nesteknapp/nesteknapp.html',
            link: function(scope) {
                scope.nesteSide = function() {
                    scope.fremdriftsindikator = {
                        laster: true
                    };

                    soknadService.delsteg({behandlingsId: data.soknad.brukerBehandlingId, delsteg: 'utfylling'}).then(function() {
                        $location.path("/soknad");
                    }).catch(function () {
                        scope.fremdriftsindikator.laster = false;
                    });
                };
            }
        };
    });
