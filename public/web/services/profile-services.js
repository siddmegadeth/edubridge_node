app.provider('profile', [function() {

    var profileURL;
    return {

        config: function(config) {
            profileURL = config.profile || config;
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