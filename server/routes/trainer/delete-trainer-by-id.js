(function() {



    async function deleteTrainerById(profile, trainerId) {

        return new Promise(function(approve, reject) {

            TrainerModel.update({ profile: profile }, { "$pull": { "trainers": { _id: trainerId } } }, { multi: true }, function(errorDelete, deleted) {

                if (errorDelete) {
                    reject({ status: false, message: 'Error Occured Deleting Trainer By Id', data: errorDelete, isTrainerDeleted: false });
                }
                if (deleted) {

                    TrainerModel.findOne({ profile: profile }, function(errorFound, foundOne) {

                        if (errorFound) {
                            reject({ status: false, message: 'Error Occured Finding Trainer By Id', data: errorFound, isTrainerDeleted: false });
                        }
                        if (foundOne)
                            approve({ status: true, data: foundOne, message: 'Deleted Trainer', isTrainerDeleted: true });
                        else
                            approve({ status: true, data: [], message: 'Unabel To Deleted Trainer', isTrainerDeleted: false });
                    });

                } else {
                    approve({ status: true, data: [], message: 'Not Able To Find And Delete', isTrainerDeleted: false });
                }
            });
        });
    }

    app.delete('/delete/trainer/by/id', function(req, resp) {
        log('/delete/trainer/by/id');
        profile = req.body.profile || req.params.profile || req.query.profile;
        trainerId = req.body.trainerId || req.params.trainerId || req.query.trainerId;

        if (profile && trainerId) {
            var promise = [];
            promise.push(deleteTrainerById(profile, trainerId));
            Promise.all(promise)
                .then(function(promiseSuccess) {
                    resp.send(promiseSuccess[0]);
                })
                .catch(function(promiseError) {
                    resp.send(promiseError);
                });
        } else {
            resp.send({ status: true, message: 'Not Able To Find Trainer/Owner', data: [], isTrainerDeleted: false });
        }
    });
})();