app.provider('trainer', [function() {

    var trainerURL;
    return {

        config: function(config) {
            trainerURL = config.trainer || config;
        },
        $get: ['$http', function($http) {

            return {
                getAllTrainer: function(profile) {
                    return $http({
                        method: 'GET',
                        url: trainerURL.getAllTrainer,
                        params: {
                            profile: profile

                        }
                    })
                },
                getTrainerById: function(profile, trainerId) {
                    return $http({
                        method: 'GET',
                        url: trainerURL.a,
                        params: {
                            profile: profile,
                            trainerId: trainerId
                        }
                    })
                },
                createNewTrainer: function(profile, trainer) {
                    return $http({
                        method: 'POST',
                        url: trainerURL.createNewTrainer,
                        params: {
                            profile: profile,
                            trainer: trainer
                        }
                    })
                },
                updateTrainerById: function(profile, trainer) {
                    return $http({
                        method: 'PUT',
                        url: trainerURL.updateTrainerById,
                        params: {
                            profile: profile,
                            trainer: trainer
                        }
                    })
                },
                deleteTrainerById: function(profile, trainerId) {
                    return $http({
                        method: 'DELETE',
                        url: trainerURL.deleteTrainerById,
                        params: {
                            profile: profile,
                            trainerId: trainerId
                        }
                    })
                }
            }

        }]

    }
}])