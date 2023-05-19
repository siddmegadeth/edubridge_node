app.provider('course', [function() {

    var courseURL;
    return {

        config: function(config) {
            courseeURL = config.course || config;
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