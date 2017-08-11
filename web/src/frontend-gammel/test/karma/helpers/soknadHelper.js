angular.module('nav.soknad.test.helper', ['nav.services.faktum'])
    .factory('SoknadTestGenerator', function (Faktum, FaktaService) {
        // TODO: Slett filen når vi går vekk fra dataobjektet

        var faktumIdTeller = 0;

        // Konverterer en liste av objekter til riktige Faktumobjekter
        function leggTilFaktaPaaService(fakta) {
            for (var i = 0; i < fakta.length; i++) {
                if (!(fakta[i] instanceof Faktum)) {
                    var faktum = new Faktum(fakta[i]);
                    faktum.faktumId = faktumIdTeller++;
                    FaktaService.leggTilFaktum(faktum);
                }
            }
        }

        var genererSoknad = function (arg) {
            var fakta = arg.fakta || [];

            leggTilFaktaPaaService(fakta);
            return {
                soknadId: 1,
                brukerBehandlingId: '1A',
                fakta: FaktaService.getFakta(),
                finnFaktum: FaktaService.finnFaktum,
                finnBarnFakta: FaktaService.finnBarnFakta,
                finnFaktumMedId: FaktaService.finnFaktumMedId,
                finnFakta: FaktaService.finnFakta,
                finnAlleFaktumMedVerdi: FaktaService.finnAlleFaktumMedVerdi,
                slettFaktum: FaktaService.slettFaktum,
                leggTilFaktum: function(faktum) {
                    if(!faktum.faktumId) {
                        faktum.faktumId = faktumIdTeller++;
                    }
                    FaktaService.leggTilFaktum(new Faktum(faktum));
                }
            };
        };

        var genererSoknadMedTommeFaktum = function (arg) {
            arg.fakta = [];
            return genererSoknad(arg);
        };

        return {
            genererSoknad: genererSoknad,
            genererSoknadMedTommeFaktum: genererSoknadMedTommeFaktum
        };
    });