(function() {

    app.get('/get/generate/token/from/email', function(req, resp) {
        log('/get/generate/token/from/email');
        email = req.body.email||req.params.email||req.query.email;
        log(email);
        ProfileModel.findOne({ email: email }, function(err, found) {
            if (err) {
                resp.send({ message: 'some error occured.', error: err, status: false })
            }
            if (found) {
                // user found . create token and login directly
                var token = createJWT(found);
                resp.send({ message: "Welcome Back" + found.email, status: true, isAuthenticated: true, profile: found, access_token: token });
            } else {
                // create new account and send token
                var tuple = new ProfileModel({
                    email: email
                });
                log("Tuple Data Formed :");
                log(tuple);
                tuple.save(function(errSave, saved) {
                    if (errSave) {
                        log("Error Occured Saving Documents");
                        log(errSave);
                        resp.send({ error: errSave, message: 'Some Error Occured Saving Documents', status: false });
                    }

                    log("Documents Saved");
                    var token = createJWT(saved);
                    resp.send({ message: "You have been successfully registered", status: true, isAuthenticated: true, profile: saved, access_token: token });

                });

            }
        });

    });

})();