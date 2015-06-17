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

        var bolkliste = {
            boilerplatedummysoknadstype: [dummyBolk1, dummyBolk2]
        };

        return {
            getBolkliste: function (soknadstype) {
                return bolkliste[soknadstype];
            }
        };
    });