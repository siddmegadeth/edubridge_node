app.provider('stateManager', [function() {

    var stateManagerURL;
    return {

        config: function(configRoute) {
            window.localStorage.setItem("access_token_status", false);
            warn('Setting access_token_status to False On Page Reload');
            warn("Status : " + window.localStorage.access_token_status);
            log(configRoute);
            stateManagerURL = configRoute;
        },
        $get: ['$http', function($http) {
            return {
                saveProfile: function(profile) {
                    warn('Saving To Profile (LocalStorage:');
                    window.localStorage.setItem("profile_auto", JSON.stringify(profile));
                },
                getProfile: function() {
                    if (window.localStorage.profile_auto)
                        return JSON.parse(window.localStorage.profile_auto);
                },
                getAccessToken: function() {
                    if (window.localStorage.access_token_auto)
                        return window.localStorage.access_token_auto;
                },
                saveAccessToken: function(access_token) {
                    return window.localStorage.setItem("access_token_auto", access_token);
                },
                isAccessTokenFound: function() {
                    if (window.localStorage.access_token_auto)
                        return true;
                    else
                        return false;

                },
                isAccessTokenVerified: function() {
                    if (window.localStorage.access_token_status)
                        return window.localStorage.access_token_status
                    else
                        return false;
                },
                setAccessTokenVerificationStatus: function(status) {
                    return window.localStorage.setItem("access_token_status", status);

                },
                verifyAccessToken: function(callback) {

                    warn("Token Status : " + window.localStorage.access_token_status);
                    if (window.localStorage.access_token_status == true || window.localStorage.access_token_status == 'true') {
                        warn('Calling localStorage As https Is Verified Earlier :');
                        callback({
                            isTokenValid: true,
                            status: true,
                            message: 'Token Verified'
                        })

                    } else {
                        warn('Calling HTTPS First Time :');
                        $http({
                            method: 'GET',
                            url: stateManagerURL.verifyAccessToken
                        }).then(function(resp) {
                            warn('Verifying Access Token');
                            log(resp);
                            if (resp.data.isTokenValid) {
                                window.localStorage.setItem("access_token_status", true);
                                callback({
                                    isTokenValid: true,
                                    status: true,
                                    message: 'Token Verified'
                                })
                            } else {
                                callback({
                                    isTokenValid: false,
                                    status: false,
                                    message: 'Token Not Verified'
                                })
                            }
                        });
                    }
                },
                isUserLogggedIn: function() {
                    if (window.localStorage.access_token_auto && window.localStorage.profile_auto) {
                        if (window.localStorage.access_token != "undefined" && window.localStorage.profile != "undefined" || window.localStorage.access_token != null && window.localStorage.profile != null)
                            return true;
                        else
                            return false;
                    } else
                        return false;
                },
                isCountryCodeExist: function() {
                    if (window.localStorage.country_code_auto) {
                        if (window.localStorage.country_code_auto == undefined) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                },
                saveCountryCode: function(country) {
                    if (country) {
                        window.localStorage.setItem("country_code_auto", JSON.stringify(country));
                    }
                },
                getCountryCode: function() {
                    return JSON.parse(window.localStorage.country_code_auto);
                },
                clearLocalStorage: function() {
                    window.localStorage.removeItem("access_token_auto");
                    window.localStorage.removeItem("profile_auto");
                    window.localStorage.removeItem("country_code_auto");
                    window.localStorage.removeItem("access_token_status");
                }
            }
        }]
    }


}]);