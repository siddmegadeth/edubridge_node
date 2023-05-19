"use strict";
var DI = [
    'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngRoute',
    'ghiscoding.validation',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'toastr'
];

var win = new winDevice("myApp", DI); //Bootstrap Cordova Or Browser Based App .no ng-app Required
var app = win.device(); // init App
win.showConsole(true);
win.info();
var deviceType = win.deviceType();
warn('Detected Platform Type :');
log(deviceType);
var osType = win.getOS();
warn('Detected OS Type :');
log(osType);
window.socket;


var osTypeAdvance = win.getOSAdvance(window);
warn('Detected OS Type Advance :');
log(osTypeAdvance);


app.config(['$locationProvider', '$httpProvider', '$routeProvider', '$translateProvider', 'productionModeProvider', 'authenticationProvider', 'stateManagerProvider', 'profileProvider', function($locationProvider, $httpProvider, $routeProvider, $translateProvider, productionModeProvider, authenticationProvider, stateManagerProvider, profileProvider) {

    $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $locationProvider.html5Mode(false).hashPrefix('');


    warn('Redirect WIndow Location Origin :');
    log(window.location.origin);

    //    log(window.location.origin + '/');
    $httpProvider.interceptors.push('httpInterceptors');
    $httpProvider.interceptors.push('httpTimeoutInterceptors');

    $translateProvider.useStaticFilesLoader({
        prefix: 'plugins/angular-validation/locales/validation/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');

    var productionLink = productionModeProvider.config({
        type: 'development',
        servername: 'https://www.onlineone.app' // only if in production
    });

    var apiURI = {
        authentication: {
            generateTokenFromEmail : productionLink + '/get/generate/token/from/email',
            createProfile : productionLink + '/post/create/profile',
            verifyAccessToken: productionLink + '/get/verify/access/token',
            updateMobileNumber: productionLink + "/get/auth/validate/otp/update/mobile"
        },
        profile: {
            createProfile: productionLink + '/post/create/profile'
        }
    };
    log(apiURI.authentication);
    authenticationProvider.config(apiURI.authentication)
    stateManagerProvider.config(apiURI.authentication);
    profileProvider.config(apiURI.profile);

    $routeProvider
        .when('/landing', {
            templateUrl: 'components/landing/landing.html',
            controller: 'landingCtrl',
            params: {
                loginRequired: false,
                clearCache: false,
                showNavBar: true,
                showFooter: true,
                disableLink: false
            }
        })
        .when('/home', {
            templateUrl: 'components/home/home.html',
            controller: 'homeCtrl',
            params: {
                loginRequired: false,
                clearCache: false,
                showNavBar: true,
                showFooter: true,
                disableLink: false
            }
        })
        .when('/marketplace', {
            templateUrl: 'components/marketplace/marketplace.html',
            controller: 'marketPlaceCtrl',
            params: {
                loginRequired: false,
                clearCache: false,
                showNavBar: true,
                showFooter: true,
                disableLink: false

            }
        })
        .when('/profile/complete', {
            templateUrl: 'components/complete-profile/complete-profile.html',
            controller: 'completeProfileCtrl',
            params: {
                loginRequired: true,
                clearCache: false,
                showNavBar: true,
                showFooter: true,
                disableLink: true
            }
        })
        .when('/login', {
            templateUrl: 'components/login/login.html',
            controller: 'loginCtrl',
            params: {
                loginRequired: false,
                clearCache: true,
                showNavBar: true,
                showFooter: true,
                disableLink: false

            }
        })
        .when('/logout', {
            templateUrl: 'components/logout/logout.html',
            controller: 'logoutCtrl',
            params: {
                loginRequired: false,
                clearCache: true,
                showNavBar: true,
                showFooter: true,
                disableLink: false

            }
        })
        .when('/not-found', {
            templateUrl: 'components/not-found.html',
            params: {
                loginRequired: false,
                clearCache: false,
                showNavBar: false,
                showFooter: true,
                disableLink: false

            }

        })
        .when('/verify', {
            templateUrl: 'components/verify/verify.html',
            controller: 'verifyCtrl',
            params: {
                loginRequired: false,
                clearCache: false,
                showNavBar: false,
                showFooter: false,
                disableLink: true
            }
        })
        .otherwise({ redirectTo: 'landing' });




}]);

app.filter('percentage', ['$filter', function($filter) {
    return function(input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}]);


app.run(['$rootScope', '$location', '$route', 'stateManager', 'toastr', function($rootScope, $location, $route, stateManager, toastr) {

    log($route.current);
    // intercept the route change event
    $rootScope.$on('$routeChangeStart', function(angularEvent, newUrl, options) {




    });

    $rootScope.$on('$routeChangeSuccess', function(angularEvent, newUrl) {
        warn('Route Change Success :');
        log(newUrl);
        log(newUrl.$$route);
        $rootScope.globalSettings = newUrl.$$route.params;
        log($rootScope.globalSettings);

        var isLoggedIn = stateManager.isUserLogggedIn();
        warn("Is User Logged In : " + isLoggedIn);
        if (isLoggedIn) {
            $rootScope.globalSettings.hideCredentialsLink = false;
            var profile = stateManager.getProfile();
            if (profile.isProfileCompleted) {

            } else {
                $rootScope.globalSettings.disableLink = true;
                $location.path('/profile/complete');
            }
            warn('Verifying Access Token');
        } else {
            $rootScope.globalSettings.hideCredentialsLink = true;
        }

    });

}]);


//mapboxgl.accessToken = 'pk.eyJ1IjoiZ2V0aGlrZWFwcCIsImEiOiJja2J0Z2l4cnkwOTN3MnJsaXRwdGMxcnVyIn0.MBRU5vDIM-DdcuHTsNuK7Q';