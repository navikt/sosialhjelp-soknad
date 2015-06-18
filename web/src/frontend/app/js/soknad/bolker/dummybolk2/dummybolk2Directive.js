angular.module('nav.kravdialogbp.soknad.dummybolk')
    .directive('dummybolk2', function () {
        return {
            scope: true,
            templateUrl: 'js/soknad/bolker/dummybolk2/dummybolk2.html',
            link: {
                pre: function (scope) {
                }
            }
        };
    });