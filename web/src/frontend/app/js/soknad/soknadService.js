angular.module('nav.kravdialogbp.soknad')
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
            boilerplatedummysoknadstype: [dummyBolk]
        };

        return {
            getBolkliste: function (soknadstype) {
                return bolkliste[soknadstype];
            }
        };
    });