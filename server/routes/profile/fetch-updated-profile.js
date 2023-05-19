(function() {

    app.get('/get/update/profile', function(req, resp) {
        log('/get/update/profile');
        var profile = req.body.profile || req.query.profile;


        ProfileModel.findOne({ profile: profile }, function(errUpdate, updated) {
            if (errUpdate) {
                resp.send({ status: false, message: 'Error Occured finding Updated Profile', isUpdatedProfile: false });
            }
            if (updated) {
                log("Updated :");
                log(updated);
                resp.send({ status: true, message: 'Updated Profile', isUpdatedProfile: true, data: updated });
            } else {
                resp.send({ status: true, message: 'Unable to fnd Updated Profile', isUpdatedProfile: false });

            }
        });
    });

})();