angular.module('nav.soknadsosialhjelp.httpProvider')
    .config(function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN-SOKNAD-API';

        $httpProvider.interceptors.push('resetTimeoutInterceptor');
        $httpProvider.interceptors.push('settDelstegStatusEtterKallMotServer');
        $httpProvider.interceptors.push('feilhandteringInterceptor');

        if (window.Globals.utils.getIEVersion() < 10) {
            $httpProvider.interceptors.push('httpRequestInterceptorPreventCache');
        }
    });
