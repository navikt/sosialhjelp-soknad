angular.module('nav.bilstonad.dummybolk', [])
    .directive('dummybolk', function () {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'js/bolker/dummybolk/dummybolk.html',
            link: {
                pre: function (scope) {
                }
            }
        };
    });