angular.module('nav.bilstonad.soknad.dummybolk')
    .directive('dummybolk', function () {
        return {
            scope: true,
            templateUrl: 'js/bolker/dummybolk/dummybolk.html',
            link: {
                pre: function (scope) {
                }
            }
        };
    });