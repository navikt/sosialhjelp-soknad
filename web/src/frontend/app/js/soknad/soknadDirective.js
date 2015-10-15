angular.module('nav.kravdialogbp.soknad')
    .directive('soknad', function (soknadBolkService, Miljovariabler, soknadService, $location, $timeout) {
        return {
            templateUrl: "js/soknad/soknad.html",
            link: function(scope) {
                var soknadstype = 'boilerplatedummysoknadstype';
                Miljovariabler.get().then((result) => scope.saksoversiktUrl = result.data["saksoversikt.link.url"]);

                scope.fremdriftsindikator = {laster: false};
                scope.bolker = soknadBolkService.getBolkliste(soknadstype);

                angular.forEach(scope.bolker, function (gruppe, index) {
                    scope.$watch("bolker[" + index + "].apen", function (nyverdi, gammelverdi) {
                        if (nyverdi === gammelverdi) {
                            return true;
                        }
                        settVisningAvGruppeIDOM(scope.bolker[index], nyverdi);
                    });
                });

                scope.apneTab = soknadBolkService.apneTab;
                scope.lukkTab = soknadBolkService.lukkTab;
                scope.settValidert = soknadBolkService.settValidert;

                scope.gaTilVedleggHvisValidert = function (feilliste){
                    if (feilliste.length === 0) {
                        soknadService.delsteg({delsteg: 'vedlegg', behandlingsId: data.soknad.brukerBehandlingId}).$promise.then(function () {
                            $location.path('/vedlegg');
                        });
                    }
                };

                function settVisningAvGruppeIDOM(gruppe, state) {
                    $timeout.cancel(gruppe.timer);
                    if(state === true) {
                        gruppe.skalIkkeFjernesFraDom = true;
                    } else {
                        gruppe.timer = $timeout(function(){
                            gruppe.skalIkkeFjernesFraDom = false;
                        }, 300);
                    }
                }
            }
        };
    }
);