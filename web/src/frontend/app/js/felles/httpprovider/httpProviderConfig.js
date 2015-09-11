angular.module('nav.kravdialogbp.httpProvider')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN-SOKNAD-API';

        $httpProvider.interceptors.push('resetTimeoutInterceptor');
        $httpProvider.interceptors.push('settDelstegStatusEtterKallMotServer');
        $httpProvider.interceptors.push('feilhandteringInterceptor');

        if (window.Globals.utils.getIEVersion() < 10) {
            $httpProvider.interceptors.push('httpRequestInterceptorPreventCache');
        }
    }]);