angular.module('nav.kravdialogbp.soknad')
    .factory('soknadBolkService', function () {
        var dummyBolk1 = {
            id: 'dummybolk1',
            tittel: 'arbeidsforhold.tittel',
            template: '<div data-dummybolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        var dummyBolk2 = {
            id: 'dummybolk2',
            tittel: 'arbeidsforhold.tittel',
            template: '<div data-dummybolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        var alleBolker = [dummyBolk1, dummyBolk2];

        var bolklister = {
            boilerplatedummysoknadstype: [dummyBolk1, dummyBolk2]
        };

        function apneTab (ider) {
            settApenStatusForAccordion(true, ider);
        }

        function lukkTab (ider) {
            settApenStatusForAccordion(false, ider);
        }

        function getBolkliste (soknadstype) {
            return bolklister[soknadstype];
        }

        function getBolkMedNavn(bolknavn) {
            return alleBolker.filter(function(bolk){
               return bolk.id === bolknavn;
            })[0];
        }

        function settApenStatusForAccordion(apen, ider) {
            if (ider instanceof Array) {
                angular.forEach(ider, function (id) {
                    settApenForId(apen, id);
                });
            } else if (ider !== undefined) {
                settApenForId(apen, ider);
            }
        }

        function settApenForId(apen, id) {
            getBolkMedNavn(id).apen = apen;
        }

        function settValidert(bolknavn) {
            getBolkMedNavn(bolknavn).validering = false;
        }


        return {
            getBolkliste: getBolkliste,
            getBolkMedNavn: getBolkMedNavn,
            settValider: settValidert,
            apneTab: apneTab,
            lukkTab: lukkTab
        };
    });