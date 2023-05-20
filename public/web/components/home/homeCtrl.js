app.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'course', 'trainer', 'stateManager','toastr', function($scope, $rootScope, $location, $timeout, course, trainer, stateManager,toastr) {


    $timeout(function() {
        $scope.profile = stateManager.getProfile();

    });

    $scope.addTrainer = function(tuple) {
        warn('Add addTrainer ');
        log(tuple);
        trainer.createNewTrainer($scope.profile.profile, tuple)
            .then(function(resp) {
                warn('Response From Add Trainer :');
                log(resp);
                if (resp.data.status && resp.data.isTrainerAdded) {
                    toastr.success('Trainer', resp.data.message);
                } else {
                    toastr.warning('Trainer', resp.data.message);
                }
            });
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