angular.module('nav.kravdialogbp.soknad.dummybolk')
    .directive('dummybolk', function () {
        return {
            scope: true,
            templateUrl: 'js/soknad/bolker/dummybolk/dummybolk.html',
            link: {
                pre: function (scope) {
                }
            }
        };
    });