(function() {

    app.post('/post/create/profile', function(req, resp) {
        log('/post/create/profile');
        var profile = req.body.profile || req.query.profile;

        profile = JSON.parse(profile);
        log('Recieved Email : ' + profile.email);
        log('Recieved fullname : ' + profile.fullname);
        log('Recieved Username : ' + profile.username);
        profile.isProfileCompleted = true;
        ProfileModel.findOne({
            $and: [{
                email: profile.email
            }, {
                isProfileCompleted: true
            }]
        }, function(errFound, found) {

            if (errFound) {
                resp.send({
                    status: false,
                    message: 'Error Occured Creating New Profile',
                    isProfileCompleted: false,
                    data: errFound
                });
            }
            if (found) {
                resp.send({
                    status: false,
                    message: 'Unable To Create Profile As Username/Email Exist',
                    isProfileCompleted: false,
                    data: []
                });
            } else {
                log("Profile Not Completed :");
                ProfileModel.findOneAndUpdate({
                    email: profile.email
                }, profile, {
                    upsert: true,
                    new: true
                }, function(errUpdate, updated) {
                    if (errUpdate) {
                        resp.send({
                            status: false,
                            message: 'Error Occured Creating New Profile',
                            isProfileCompleted: false,
                            data: errUpdate
                        });
                    }
                    if (updated) {
                        resp.send({
                            status: true,
                            message: 'Successfully Created Profile',
                            isProfileCompleted: true,
                            data: updated
                        });
                    } else {
                        resp.send({
                            status: false,
                            message: 'Unable To Create Profile',
                            isProfileCompleted: false,
                            data: []
                        });
                    }
                });
            }
        });
    });

})();