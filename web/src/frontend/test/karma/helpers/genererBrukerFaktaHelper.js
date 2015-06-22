angular.module('nav.soknad.test.helper.genererfakta', ['nav.services.faktum', 'nav.soknad.test.helper'])
    .factory('genererBrukerFaktaHelper', function ( SoknadTestGenerator) {
        var faktanokler = {
            stonadstype: 'soknadsvalg.stonadstype',
            fodselelleradopsjon: 'soknadsvalg.fodselelleradopsjon',
            barn: 'barnet.antall',
            terminbekreftelse: 'veiledning.mor.terminbekreftelse',
            omsorg: 'rettigheter.omsorg',
            harrett: 'rettighet.harrett',
            dekningsgrad: 'dekningsgrad',
            barnedato: 'barnet.dato'
        };

        function genererFakta(brukerFakta) {
            var fakta = [
                {key: faktanokler.stonadstype, value: brukerFakta.stonadstype},
                {key: faktanokler.fodselelleradopsjon, value: brukerFakta.fodselAdopsjon},
                {key: faktanokler.barn, value: brukerFakta.barn},
                {key: faktanokler.terminbekreftelse, value: brukerFakta.terminbekreftelse},
                {key: faktanokler.omsorg, value: brukerFakta.omsorg},
                {key: faktanokler.dekningsgrad, value: brukerFakta.dekningsgrad},
                {key: faktanokler.harrett, value: brukerFakta.harrett},
                {key: faktanokler.barnedato, value: brukerFakta.barnedato}
            ];

            return SoknadTestGenerator.genererSoknad({fakta: fakta})
        }

        var stonadstype = {
            overforing: 'overforing',
            engangsstonadFar: 'engangsstonadFar',
            engangsstonadMor: 'engangsstonadMor',
            foreldrepengerFar: 'foreldrepengerFar',
            foreldrepengerMor: 'foreldrepengerMor'
        };

        var adopsjonFodsel = {
            fodsel: 'fodsel',
            adopsjon: 'adopsjon'
        };

        var termminbekreftelse = {
            fodt: "fodt",
            merEnn26Uker: 'merEnn26Uker',
            mindreEnn26Uker: 'mindreEnn26Uker'
        };
        var omsorg = {
            aleneomsorg: 'aleneomsorg',
            morfarborsammen: 'morfarborsammen'
        };

        var dekningsgrad = {
            atti: 'aatti',
            hundre: 'hundre'
        };

        return {
            genererFakta: genererFakta,
            stonadstype:stonadstype,
            adopsjonFodsel:adopsjonFodsel,
            termminbekreftelse:termminbekreftelse,
            omsorg:omsorg,
            dekningsgrad:dekningsgrad,
            faktanokler:faktanokler
        };
    });