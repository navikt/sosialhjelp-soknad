angular.module('nav.kravdialogbp.soknad')
    .directive('soknad', function (soknadBolkService, data, soknadService, $location) {
        return {
            templateUrl: "js/soknad/soknad.html",
            link: function(scope) {
                var soknadstype = 'boilerplatedummysoknadstype';

                scope.fremdriftsindikator = {laster: false};
                scope.saksoversiktUrl = data.miljovariabler["saksoversikt.link.url"];
                scope.bolker = soknadBolkService.getBolkliste(soknadstype);

                angular.forEach(scope.bolker, function (gruppe, index) {
                    scope.$watch("bolker[" + index + "].apen", function (nyverdi, gammelverdi) {
                        if (nyverdi === gammelverdi) {
                            return true;
                        }
                        settVisningAvGruppe(scope.bolker[index], nyverdi);
                    });
                });

                scope.apneTab = function (ider) {
                    settApenStatusForAccordion(true, ider);
                };

                scope.lukkTab = function (ider) {
                    setTimeout(function () {
                        settApenStatusForAccordion(false, ider);
                    }, 150);
                };

                scope.settValidert = function (id) {
                    var idx = scope.bolker.indexByValue(id);
                    scope.bolker[idx].validering = false;
                };

                scope.gaTilVedleggHvisValidert = function (feilliste){
                    if (feilliste.length === 0) {
                        soknadService.delsteg({delsteg: 'vedlegg', behandlingsId: data.soknad.brukerBehandlingId}).$promise.then(function () {
                            $location.path('/vedlegg');
                        });
                    }
                };

                function settVisningAvGruppe(gruppe, state) {
                    clearTimeout(gruppe.timer);
                    if (state === true) {
                        gruppe.skalIkkeFjernesFraDom = true;
                    } else {
                        gruppe.timer = setTimeout(function () {
                            gruppe.skalIkkeFjernesFraDom = false;
                        }, 300);
                    }
                }

                function settApenStatusForAccordion(apen, ider) {
                    if (ider instanceof Array) {
                        ider.forEach( id => settApenForId(apen, id) );
                    } else {
                        settApenForId(apen, ider);
                    }
                }

                function settApenForId(apen, id) {
                    var idx = scope.bolker.indexByValue(id);
                    if (idx > -1) {
                        scope.bolker[idx].apen = apen;
                    }
                }
            }
        };
    }
);