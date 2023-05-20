(function() {



    async function updateTrainerById(profile, trainer) {

        return new Promise(function(approve, reject) {

            var trainerId = trainer._id;
            delete trainer.email;
            delete trainer._id;
            delete trainer.fullname;
            log("Trainer Data To Update :");
            log(trainer);
            log("Profile :");
            log(profile);

            TrainerModel.findOneAndUpdate({
                    $and: [
                        { profile: profile },
                        { "trainers._id": trainerId }
                    ]
                }, { "trainers.$.mobile": trainer.mobile }, { multi: true, upsert: true },
                function(errorUpdate, updated) {

                    if (errorUpdate) {
                        reject({ status: false, message: 'Error Occured Updating Trainer By Id', data: errorUpdate, isTrainerUpdated: false });
                    }
                    if (updated) {
                        TrainerModel.findOne({ profile: profile }, function(errorFound, foundOne) {

                            if (errorFound) {
                                reject({ status: false, message: 'Error Occured Finding And Updating Trainer By Id', data: errorFound, isTrainerUpdated: false });
                            }
                            if (foundOne)
                                approve({ status: true, data: foundOne, message: 'Updated Trainer', isTrainerUpdated: true });
                            else
                                approve({ status: true, data: [], message: 'Unabel To Updated Trainer', isTrainerUpdated: false });
                        });

                    } else {
                        approve({ status: true, data: [], message: 'Not Able To Find And Update', isTrainerUpdated: false });
                    }
                });
        });
    }

    app.put('/put/update/existing/trainer/by/id', function(req, resp) {
        log('/delete/trainer/by/id');
        profile = req.body.profile || req.params.profile || req.query.profile;
        trainer = req.body.trainer || req.params.trainer || req.query.trainer;
        trainer = JSON.parse(trainer);
        if (profile && trainer) {
            var promise = [];
            promise.push(updateTrainerById(profile, trainer));
            Promise.all(promise)
                .then(function(promiseSuccess) {
                    resp.send(promiseSuccess[0]);
                })
                .catch(function(promiseError) {
                    resp.send(promiseError);
                });
        } else {
            resp.send({ status: true, message: 'Not Able To Find Trainer/Owner', data: [], isTrainerUpdated: false });
        }
    });
})();