angular.module('nav.feilside', [])
    .run([function() {
        // Preload ikon for feilside
        var img = new Image();
        img.src = "/soknadforeldrepenger/img/utropstegn-sirkel-gra.svg";
    }])
    .controller('FeilSideCtrl', function ($scope, data) {
        $scope.mineInnsendinger = data.miljovariabler["saksoversikt.link.url"];
        $scope.dittnavUrl = data.miljovariabler["dittnav.link.url"];
    });