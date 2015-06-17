angular.module('nav.kravdialogbp.skjema.dummybolk')
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