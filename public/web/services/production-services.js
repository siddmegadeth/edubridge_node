app.provider('productionMode', [function() {
    var runType;
    var modeType = {};

    return {
        config: function(mode) {

            if (window.localStorage.last_mode) {
                // check if mode has changed or not
                if (window.localStorage.last_mode == mode.type) {
                    warn('Production Mode Has Not Changed')
                } else {
                    warn('Production Mode Has Changed.Adding New Mode And Resetting Browser With New Mode :');
                    window.localStorage.removeItem("profile");
                    window.localStorage.removeItem("last_mode");
                    window.localStorage.setItem("last_mode", mode.type);
                }
            } else {
                warn('Setting New Mode :');
                window.localStorage.setItem("last_mode", mode.type);
            }


            if (mode.type == 'production' || mode.type == 'prod') {
                runType = mode.servername;
                modeType.base = runType;
                modeType.type = 'production';


                return runType;
                // log()
                return runType;

            } else if (mode.type == 'development' || mode.type == 'dev') {
                // runType = 'http://' + window.location.host;
                runType = location.protocol + '//' + location.host;
                modeType.base = runType;
                modeType.type = 'development';


                return runType;
                log(runType);

                return runType;
            }
        },
        $get: ['$http', function($http) {
            return {
                getMode: function() {
                    return modeType.base;
                },
                getHostMode: function() {
                    return modeType;
                },
                getPreviewMode: function() {
                    return mode.servername;
                }
            }
        }]

    }
}])