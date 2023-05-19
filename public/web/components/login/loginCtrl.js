app.controller('loginCtrl', ['$scope', '$rootScope', '$timeout', 'authentication', 'stateManager', '$window', '$route', '$location', 'toastr', function($scope, $rootScope, $timeout, authentication, stateManager, $window, $route, $location, toastr) {


    $timeout(function() {
        isLoggedIn = stateManager.isUserLogggedIn();
        if (isLoggedIn) {
            //$location.path('/login');
            $window.history.back();
        } else {
            //$scope.initPhone();

        }

    });



    $scope.signIn = function(email) {
        log(email);
        if (email) {
            authentication.generateTokenFromEmail(email).then(function(resp) {
                warn('Generate OTP Response :');
                log(resp);
                if (resp.data.status && resp.data.isAuthenticated) {
                    toastr.success('Sign In', 'Successfully Sent OTP');

                    stateManager.saveProfile(resp.data.profile);
                    stateManager.saveAccessToken(resp.data.access_token);
                    toastr.success('Sign In', 'Verified OTP.Success');
                    $route.reload();
                    $location.path("/home");
                } else {
                    warn('OTP Not Generated');
                    toastr.warning('Sign In', 'OTP Not Found');

                }
            });
        } else {
            toastr.error('Sign In', 'Invalid Email');
            log("Invalid Email");
        }

    }





}])