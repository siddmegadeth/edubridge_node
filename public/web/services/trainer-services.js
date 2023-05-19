app.provider('trainer', [function() {

    var trainerURL;
    return {

        config: function(config) {
            trainerURL = config.trainer || config;
        },
        $get: ['$http', function($http) {

            return {
                createProfile: function(profile) {
                    return $http({
                        method: 'POST',
                        url: profileURL.createProfile,
                        params: {
                            profile: profile
                        }
                    })
                }
            }

        }]

    }
}])