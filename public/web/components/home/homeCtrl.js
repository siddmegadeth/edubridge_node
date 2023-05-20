app.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'course', 'trainer', function($scope, $rootScope, $location, $timeout, course, trainer) {


    $timeout(function() {





    });

    $scope.addTrainer = function(tuple) {
        warn('Add Trainer ');
        log(tuple);
    };

    $scope.addCourse = function(tuple) {
        warn('Add addCourse ');
        log(tuple);


    };

    $scope.openCourseModal = function() {
        warn('Open Course Modal');
        $scope.courseModal = angular.element("#courseModal");
        $scope.courseModal.modal('show');
    }

    $scope.openTrainerModal = function() {
        $scope.trainerModal = angular.element("#trainerModal");
        $scope.trainerModal.modal('show');
    }
}])