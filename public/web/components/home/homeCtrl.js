app.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$timeout', function($scope, $rootScope, $location, $timeout) {


    $timeout(function() {





    });



    $scope.showCourse = function() {
        $scope.courseModal = angular.element("#courseModal");

        $scope.courseModal.modal('show')
    }

    $scope.showTrainer = function() {
        $scope.trainerModal = angular.element("#trainerModal");

        $scope.trainerModal.modal('show')
    }
}])