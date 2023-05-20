(function() {


    async function createTrainer(profile, trainer) {

        return new Promise(function(approve, reject) {
            TrainerModel.findOne({ profile: profile }, function(errFound, found) {
                if (errFound) {
                    log("Error Occured :");
                    log(errFound);
                    reject({ status: false, message: 'Error Occured', data: errFound, isTrainerAdded: false });
                }
                if (found) {
                    log("Found Owner Of Trainer :");
                    TrainerModel.findOneAndUpdate({ profile: profile, 'trainers.email': { $ne: trainer.email } }, {
                        $addToSet: {
                            trainers: trainer
                        }
                    }, { upsert: true, new: true }, function(errUpdate, updated) {
                        if (errUpdate) {
                            if (errUpdate.code == 11000) {
                                approve({ status: true, message: 'Cannot Insert Duplicates Value', data: [], isTrainerAdded: false });
                            } else {

                                reject({ status: false, message: 'Error Occured', data: errUpdate, isTrainerAdded: false });
                            }
                        }

                        if (updated) {
                            approve({ status: true, message: 'Added New Trainer', data: updated, isTrainerAdded: true });
                        } else {
                            approve({ status: true, message: 'Not Able To Add New Trainer', data: [], isTrainerAdded: false });

                        }
                    });

                } else {
                    log("No  Trainer Found:");
                    var tuple = {};
                    tuple.trainers = [];
                    tuple.profile = profile;
                    tuple.trainers.push(trainer);
                    var trainerTuple = new TrainerModel(tuple);
                    log(trainerTuple);
                    trainerTuple.save(function(errSave, saved) {
                        if (errSave) {
                            log("Error Occured :");
                            log(errSave);
                            reject({ status: false, message: 'Error Occured', data: errSave, isTrainerAdded: false });
                        }
                        if (saved) {
                            log("Saved New Trainer :");
                            approve({ status: true, message: 'Trainer Sucessfully Added', data: saved, isTrainerAdded: true });
                        } else {
                            log("Not Able To Save New Trainer :");
                            approve({ status: true, message: 'Not Able To Add Trainer', data: [], isTrainerAdded: false });
                        }
                    });

                }
            });
        })
    }

    app.post('/post/create/new/trainer', function(req, resp) {
        log('/post/create/new/trainer');
        profile = req.body.profile || req.params.profile || req.query.profile || null;
        trainer = req.body.trainer || req.params.trainer || req.query.trainer;
        trainer = JSON.parse(trainer);
        log(trainer);
        log("Profile : " + profile);
        if (profile && trainer) {
            var promise = [];
            promise.push(createTrainer(profile, trainer));
            Promise.all(promise)
                .then(function(promiseSuccess) {
                    resp.send(promiseSuccess[0]);
                })
                .catch(function(promiseError) {
                    resp.send(promiseError);
                });
        } else {
            resp.send({ status: true, message: 'Not Able To Add Trainer As Trainer Data/Owner Id Missing', data: [], isTrainerAdded: false });
        }
    });
})();