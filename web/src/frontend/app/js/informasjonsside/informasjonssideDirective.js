angular.module('nav.bilstonad.informasjonsside')
    .directive('informasjonsside', function () {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'js/informasjonsside/informasjonsside.html'
        };
    });