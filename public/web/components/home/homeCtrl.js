app.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'course', 'trainer', 'stateManager', 'toastr', function($scope, $rootScope, $location, $timeout, course, trainer, stateManager, toastr) {


    $timeout(function() {
        $scope.profile = stateManager.getProfile();
        $scope.fetchTrainers();
    });


    $scope.fetchTrainers = function() {
        trainer.getAllTrainer($scope.profile.profile)
            .then(function(resp) {
                warn('Response From Find All Trainer :');
                log(resp);
                if (resp.data.status && resp.data.isTrainerFound) {
                    toastr.success('Trainer', resp.data.message);
                    $scope.allTrainers = resp.data.data.trainers;
                } else {
                    toastr.warning('Trainer', resp.data.message);
                }
            });

    }

    $scope.addTrainer = function(tuple) {
        warn('Add addTrainer ');
        log(tuple);
        trainer.createNewTrainer($scope.profile.profile, tuple)
            .then(function(resp) {
                warn('Response From Add Trainer :');
                log(resp);
                if (resp.data.status && resp.data.isTrainerAdded) {
                    toastr.success('Trainer', resp.data.message);
                    $scope.allTrainers = resp.data.data.trainers;
                } else {
                    toastr.warning('Trainer', resp.data.message);
                }
            });
    };

    $scope.deleteTrainerById = function(tuple) {
        warn("deleteTrainerById");
        log(tuple);
        trainer.deleteTrainerById($scope.profile.profile, tuple._id)
            .then(function(resp) {
                warn('Delete Trainer By Id : ');
                log(resp);
                if (resp.data.status && resp.data.isTrainerDeleted) {
                    toastr.success('Trainer', resp.data.message);
                    $scope.allTrainers = resp.data.data.trainers;
                } else {
                    toastr.warning('Trainer', resp.data.message);
                }
            });
    };


    $scope.updateTrainerById = function(tuple) {
        warn("updateTrainerById");
        log(tuple);
    }

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