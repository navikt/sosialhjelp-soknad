angular.module('nav.kravdialogbp.skjema')
    .factory('skjemaService', function () {
        var dummyBolk = {
            id: 'dummybolk',
            tittel: 'dummybolk.tittel',
            template: '<div data-dummybolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        var bolkliste = {
            boilerplatedummysoknadstype: [dummyBolk]
        };

        return {
            getBolkliste: function (soknadstype) {
                return bolkliste[soknadstype];
            }
        };
    });