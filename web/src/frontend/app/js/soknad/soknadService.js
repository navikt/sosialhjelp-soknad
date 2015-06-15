angular.module('nav.bilstonad.soknad')
    .factory('soknadService', function () {
        var dummyBolk = {
            id: 'dummybolk',
            tittel: 'dummybolk.tittel',
            template: '<div data-dummybolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        var bolkliste = {
            bilstonad_spesialutstyr: [dummyBolk]
        };

        return {
            getBolkliste: function (soknadstype) {
                return bolkliste[soknadstype];
            }
        };
    });