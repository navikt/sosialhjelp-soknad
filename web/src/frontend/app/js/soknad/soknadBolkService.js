angular.module('nav.kravdialogbp.soknad')
    .factory('soknadBolkService', function () {
        const dummyBolk1 = {
            id: 'dummybolk1',
            tittel: 'arbeidsforhold.tittel',
            template: '<div data-dummybolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const dummyBolk2 = {
            id: 'dummybolk2',
            tittel: 'infofar.tittel',
            template: '<div data-dummybolk2></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const alleBolker = [dummyBolk1, dummyBolk2];

        const bolklister = {
            boilerplatedummysoknadstype: [dummyBolk1, dummyBolk2]
        };

        const apneTab = (ider) => settApenStatusForAccordion(true, ider);

        const lukkTab = (ider) => settApenStatusForAccordion(false, ider);

        const getBolkliste = (soknadstype) =>  bolklister[soknadstype];

        const getBolkMedNavn = (bolknavn) => {
            return alleBolker.filter((bolk) => bolk.id === bolknavn)[0];
        };

        const settApenStatusForAccordion = (apen, ider) => {
            if (ider instanceof Array) {
                angular.forEach(ider, function (id) {
                    settApenForId(apen, id);
                });
            } else if (angular.isDefined(ider)) {
                settApenForId(apen, ider);
            }
        };

        const settApenForId = (apen, id) => getBolkMedNavn(id).apen = apen;

        const settValidert = (bolknavn) => getBolkMedNavn(bolknavn).validering = false;

        return {
            getBolkliste,
            getBolkMedNavn,
            settValidert,
            apneTab,
            lukkTab
        };
    });