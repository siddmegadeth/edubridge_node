app.controller('globalCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'stateManager', '$route', 'toastr', function($scope, $rootScope, $location, $timeout, stateManager, $route, toastr) {


    $timeout(function() {
       $scope.profile = stateManager.getProfile();
        $location.path('/verify');
    })

    $scope.isActive = function(loc) {
        return $location.path() === loc;
    }

    $scope.logout = function() {

        stateManager.clearLocalStorage();
        $route.reload();
        $location.path('/login');
    };

}])