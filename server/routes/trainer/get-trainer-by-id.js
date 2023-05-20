(function() {


    async function getTrainerById(profile, trainer) {

        return new Promise(function(approve, reject) {
            TrainerModel.findOne({
                $and: [
                    { profile: profile },
                    { "trainers.email": trainer.email }
                ]
            }, function(errFound, found) {
                if (errFound) {
                    log("Error Occured :");
                    log(errFound);
                    reject({ status: false, message: 'Error Occured', data: errFound, isTrainerFound: false });
                }
                if (found) {
                    log("Found Trainer :");
                    approve({ status: true, message: 'Trainer Found', data: found, isTrainerFound: false });
                } else {
                    approve({ status: true, message: 'Trainer Not Found', data: found, isTrainerFound: false });
                }
            });
        })
    }


    app.get('/get/existing/trainer/by/id', function(req, resp) {
        log('/get/existing/trainer/by/id');
        profile = req.body.profile || req.params.profile || req.query.profile;
        trainerId = req.body.trainerId || req.params.trainerId || req.query.trainerId;
        if (profile && trainerId) {
            var promise = [];
            promise.push(getTrainerById(profile, trainerId));
            Promise.all(promise)
                .then(function(promiseSuccess) {
                    resp.send(promiseSuccess[0]);
                })
                .catch(function(promiseError) {
                    resp.send(promiseError);
                });
        } else {
            resp.send({ status: true, message: 'Not Able To Find Trainer', data: [], isTrainerFound: false });
        }
    });
})();