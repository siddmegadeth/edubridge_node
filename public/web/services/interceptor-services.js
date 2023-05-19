app.service("$exceptionHandler", function() {
    return function(exception, cause) {
        //exception handling here
        error("Error Occured :");
        error(exception);
        error(cause);
    };
});


app.service('httpTimeoutInterceptors', ['$timeout', '$rootScope', function($timeout, $rootScope) {

    return {


        request: function(config) {
            config.timeout = 18000;
            return config;
        },
        response: function(config) {
            return config;
        }

    }

}]);


app.service('httpInterceptors', ['$timeout', '$rootScope', '$q', function($timeout, $rootScope, $q) {

    var numLoadings = 0;

    return {
        request: function(config) {

            config.timeout = 18000;
            if (window.localStorage.access_token_auto) {
                var token = window.localStorage.access_token_auto;
                if (token != undefined || token != null) {

                    // get token from a cookie or local storage
                    config.headers = config.headers || {};
                    config.headers.Authorization = "Bearer " + token;
                }
            }
            $rootScope.NavProgress = true;

            numLoadings++;

            // Show loader
            $rootScope.$broadcast("loader_show");
            return config || $q.when(config)

        },
        response: function(config) {

            if ((--numLoadings) === 0) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }
            $rootScope.NavProgress = false;

            return config || $q.when(config);

        },
        requestError: function(config) {


            $rootScope.NavProgress = false;

            return config;

        },
        responseError: function(config) {


            if (config.status == -1) {
                warn("Slow/Or Network Issue Detected");
                // ons.notification.toast({
                //     message: "Some Network Issue Has Occured",
                //     timeout: 6000,
                //     buttonLabel: 'Ok'
                // }).then(function() {})
                //document.querySelector('#myNavigator').resetToPage('offline.html');

            } else {

                // ons.notification.toast({
                //     message: "Server Communication Error Occured. Try Again Later",
                //     timeout: 4000,
                //     buttonLabel: 'Ok'
                // });
            }

            if (!(--numLoadings)) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }
            $rootScope.NavProgress = false;

            return $q.reject(config);

        }


    }

}]);