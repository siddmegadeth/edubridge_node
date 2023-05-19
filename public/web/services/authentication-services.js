app.provider('authentication', [function() {

    var authenticationURL;
    return {

        config: function(config) {

            if (config.authentication) {
                authenticationURL = config.authentication;
            } else {
                authenticationURL = config;
            }
        },
        $get: ['$http', function($http) {

            return {
                verifyAccessToken :  function() {
                    return $http({
                        method: 'GET',
                        url: authenticationURL.verifyAccessToken,
                    })
                },
                createProfile: function(profile) {
                    return $http({
                        method: 'POST',
                        url: authenticationURL.createProfile,
                        params: {
                            profile: profile
                        }
                    })
                },
                authentiateProfile: function(profile) {

                    return $http({
                        method: 'POST',
                        url: authenticationURL.authentiateProfile,
                        params: {
                            profile: profile
                        }
                    })
                },
                generateTokenFromEmail: function(email) {

                    return $http({
                        method: 'POST',
                        url: authenticationURL.generateTokenFromEmail,
                        params: {
                            email: email
                        }
                    })
                }
            }

        }]

    }
}])