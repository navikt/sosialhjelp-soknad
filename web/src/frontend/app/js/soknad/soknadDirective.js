angular.module('nav.kravdialogbp.soknad')
    .directive('soknad', function ($scope, miljovariabler, skjemaService) {
        var soknadstype = 'boilerplatedummysoknadstype';

        $scope.fremdriftsindikator = {laster: false};
        $scope.saksoversiktUrl = miljovariabler["saksoversikt.link.url"];
        $scope.bolker = skjemaService.getBolkliste(soknadstype);

        angular.forEach($scope.bolker, function (gruppe, index) {
            $scope.$watch("bolker[" + index + "].apen", function (nyverdi, gammelverdi) {
                if (nyverdi === gammelverdi) {
                    return true;
                }
                settVisningAvGruppe($scope.bolker[index], nyverdi);
            });
        });

        $scope.apneTab = function (ider) {
            settApenStatusForAccordion(true, ider);
        };

        $scope.lukkTab = function (ider) {
            setTimeout(function () {
                settApenStatusForAccordion(false, ider);
            }, 150);
        };

        $scope.settValidert = function (id) {
            var idx = $scope.bolker.indexByValue(id);
            $scope.bolker[idx].validering = false;
        };

        function settVisningAvGruppe(gruppe, state) {
            clearTimeout(gruppe.timer);
            if (state === true) {
                gruppe.skalVises = true;
            } else {
                gruppe.timer = setTimeout(function () {
                    gruppe.skalVises = false;
                }, 300);
            }
        }

        function settApenStatusForAccordion(apen, ider) {
            if (ider instanceof Array) {
                angular.forEach(ider, function (id) {
                    settApenForId(apen, id);
                });
            } else {
                settApenForId(apen, ider);
            }
        }

        function settApenForId(apen, id) {
            var idx = $scope.bolker.indexByValue(id);
            if (idx > -1) {
                $scope.bolker[idx].apen = apen;
            }
        }
    }
);