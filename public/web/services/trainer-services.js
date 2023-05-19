app.provider('trainer', [function() {

    var trainerURL;
    return {

        config: function(config) {
            trainerURL = config.trainer || config;
        },
        $get: ['$http', function($http) {

            return {
                getAllTrainer: function(profile, trainer) {
                    return $http({
                        method: 'GET',
                        url: trainerURL.getAllTrainer,
                        params: {
                            profile: profile,
                            trainer: trainer
                        }
                    })
                },
                getTrainerById: function(profile, trainer) {
                    return $http({
                        method: 'GET',
                        url: trainerURL.getTrainerById,
                        params: {
                            profile: profile,
                            trainer: trainer
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
                deleteTrainerById: function(profile, trainer) {
                    return $http({
                        method: 'DELETE',
                        url: trainerURL.deleteTrainerById,
                        params: {
                            profile: profile,
                            trainer: trainer
                        }
                    })
                }
            }

        }]

    }
}])