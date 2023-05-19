app.controller('verifyCtrl', ['$scope', '$rootScope', '$location', 'stateManager', '$timeout', '$route', 'toastr', function($scope, $rootScope, $location, stateManager, $timeout, $route, toastr) {

    $timeout(function() {
        warn('Verify User Status :');
        isLoggedIn = stateManager.isUserLogggedIn();
        warn("Is User Logged In : " + isLoggedIn);
        if (isLoggedIn) {

            stateManager.verifyAccessToken(function(resp) {
                warn('Verifying Access Token');
                log(resp);
                if (resp.isTokenValid) {
                    // check if profile is completed or not
                    $scope.profile = stateManager.getProfile();
                    if ($scope.profile.isProfileCompleted) {
                        toastr.success('Welcome ' + $scope.profile.fullname, '');
                        $location.path('/home');

                    } else {
                        toastr.warning('Profile Not Complete', 'Complete Your Profile');
                        $location.path('/profile/complete');

                    }

                } else {
                    toastr.error('Login Expired', 'Your Access Token Has Expired');
                    stateManager.clearLocalStorage();
                    $route.reload();
                    $location.path('/login');
                }
            });

        } else {
            $route.reload();
            // toastr.error('Login Invalid', 'You Are Not Logged In. Kindly login');
            $location.path('/login');
        }
    });

}])