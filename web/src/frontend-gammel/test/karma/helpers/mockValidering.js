angular.module('nav.mock.validering', [])
    .service('mockValidering', function(){
        return {
            settOppMock: function(scope) {
                scope.registrerValideringsmetode = function(){};
                scope.avregistrerValideringsmetode = function(){};
                scope.validerOgFinnFeilmeldinger = function(){};
                scope.fjernFeilFraListe = function(){};
                scope.registrerVisFeillisteMetode = function(){};
                scope.bolk = {};
            }
        };
    });