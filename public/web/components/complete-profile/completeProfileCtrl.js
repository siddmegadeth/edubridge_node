app.controller('completeProfileCtrl', ['$scope', '$rootScope', 'profile', 'stateManager', '$timeout', 'toastr', '$route', '$location', function($scope, $rootScope, profile, stateManager, $timeout, toastr, $route, $location) {


    $timeout(function() {
        $scope.profile = stateManager.getProfile();
    });

    $scope.updateProfile = function() {

        log($scope.profile);
        profile.createProfile($scope.profile).then(function(resp) {
            warn('Profile Created :');
            log(resp);
            if (resp.data.isProfileCompleted && resp.data.status) {
                stateManager.saveProfile(resp.data.data);
                toastr.success('Profile Created', 'Profile Successfully Created');
                $route.reload();
                $location.path("/home");
            } else {
                toastr.error('Profile Not Created', resp.data.message);
            }
        });

    };

}])