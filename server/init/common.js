(function() {


    // JWT Common Function
    createJWT = module.exports = function(tokenTuple) {
        log("createJWT");
        log(tokenTuple);
        var timer = moment().add(365, 'days').unix();
        var payload = {
            sub: new Date().valueOf() + customId({
                email: tokenTuple.email,
                randomLength: 2, // Optional
                lowerCase: true // Optional
            }),
            iat: moment().unix(),
            exp: timer
        };
        log("JWT Token Expiry Set For :");
        log(timer);
        return { token: jwt.encode(payload, process.env.ACCESSTOKEN_SECRET, 'HS512'), expires: timer };
    }




    validateAccessToken = module.exports = function(req, res, next) {

        try {


            log("Validating Cookie/Access Token :");
            log("Cookie :");
            log(req.cookies);
            var cookie = req.cookies;

            var token = req.header('Authorization').split(' ')[1];
            log("Access Token :");
            log(token);

            if (!req.header('Authorization')) {
                res.cookie('access_token_auto', cookie.access_token_auto, {
                    expires: Date.now(),
                    maxAge: Date.now()
                });
                res.status(200).send({ message: 'Please make sure your request has an Authorization header', status: false, isTokenValid: false });
            }

            if (cookie.access_token_auto == token) {

                var payloadCookie = jwt.decode(cookie.access_token_auto, process.env.ACCESSTOKEN_SECRET);
                payload = jwt.decode(token, process.env.ACCESSTOKEN_SECRET);

                log("Access Token Payload :");
                log(payload);
                log("Cookie Payload :");
                log(payloadCookie);


                if (payload.exp <= moment().unix()) {
                    log("Token Has Expired :");
                    res.cookie('access_token_auto', cookie.access_token_auto, {
                        expires: Date.now(),
                        maxAge: Date.now()
                    });
                    res.status(200).send({ message: 'Auth has Expired.Please Login Again', status: true, isTokenValid: false });
                    next();

                } else {
                    res.status(200).send({ message: 'Token Validated', status: true, isTokenValid: true });
                    next();
                }
            } else {
                log("Token And Cookie Mismatch :");
                res.cookie('access_token_auto', cookie.access_token_auto, {
                    expires: Date.now(),
                    maxAge: Date.now()
                });
                res.status(200).send({ message: 'Access Token has been Tampered As Does Not Match With Cookie', status: true, isTokenValid: false });
                next();
            }

        } catch (err) {
            log("Token And Cookie Mismatch With Error Found:");
            log(err);
            res.cookie('access_token_auto', cookie.access_token_auto, {
                expires: Date.now(),
                maxAge: Date.now()
            });
            res.status(200).send({ message: 'Access Token Not Found As Error Occured', status: true, isTokenValid: false, data: err });
            next();

        }
    }


    ensureAuthenticated = module.exports = function(req, res, next) {

        try {
            log('Validating Access Token ..............');
            var cookie = req.cookies;
            var token = req.header('Authorization').split(' ')[1];
            if (!req.header('Authorization')) {
                res.cookie('access_token_auto', cookie.access_token_auto, {
                    expires: Date.now(),
                    maxAge: Date.now()
                });
                res.status(200).send({ message: 'Please make sure your request has an Authorization header', status: false, isTokenValid: false });
            }

            if (cookie.access_token_auto == token) {

                var payloadCookie = jwt.decode(cookie.access_token_auto, process.env.ACCESSTOKEN_SECRET);
                payload = jwt.decode(token, process.env.ACCESSTOKEN_SECRET);

                if (payload.exp <= moment().unix()) {
                    log("Token Has Expired :");
                    res.cookie('access_token_auto', cookie.access_token_auto, {
                        expires: Date.now(),
                        maxAge: Date.now()
                    });
                    log('Auth has Expired.Please Login Again');
                    res.status(200).send({ message: 'Auth has Expired.Please Login Again', status: true, isTokenValid: false });
                    next();

                } else {
                    log('Token Validated');
                    //log({ message: 'Token Validated', status: true, isTokenValid: true });
                    next();
                }
            } else {
                log("Token And Cookie Mismatch :");
                res.cookie('access_token_auto', cookie.access_token_auto, {
                    expires: Date.now(),
                    maxAge: Date.now()
                });
                log('Access Token has been Tampered As Does Not Match With Cookie');
                res.status(200).send({ message: 'Access Token has been Tampered As Does Not Match With Cookie', status: true, isTokenValid: false });
                next();
            }

        } catch (err) {
            log("Token And Cookie Mismatch With Error Found:");
            log(err);
            res.cookie('access_token_auto', cookie.access_token_auto, {
                expires: Date.now(),
                maxAge: Date.now()
            });
            res.status(200).send({ message: 'Access Token Not Found As Error Occured', status: true, isTokenValid: false, data: err });
            next();

        }
    }


    ensureAuthenticatedRoutes = module.exports = function(req, res, next) {
        if (!req.header('Authorization')) {
            return res.status(200).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.header('Authorization').split(' ')[1];

        var payload = null;
        try {
            payload = jwt.decode(token, process.env.ACCESSTOKEN_SECRET);
        } catch (err) {
            return res.status(200).send({ message: 'Access Token has been tampered', status: true, isTokenValid: false });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(200).send({ message: 'Auth has Expired.Please Login Again', status: true, isTokenValid: false });
        }
        req.user = payload.sub;
        next();
    }



})()