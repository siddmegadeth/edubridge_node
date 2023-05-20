(function() {


    async function getAllTrainer(profile) {

        return new Promise(function(approve, reject) {
            TrainerModel.findOne({ profile: profile }, function(errFound, found) {
                if (errFound) {
                    log("Error Occured :");
                    log(errFound);
                    reject({ status: false, message: 'Error Occured', data: errFound, isTrainerFound: false });
                }
                if (found) {
                    log("Found Trainer :");
                    approve({ status: true, message: 'Trainer Found', data: found, isTrainerFound: true });
                } else {
                    approve({ status: true, message: 'Trainer Not Found', data: found, isTrainerFound: false });
                }
            });
        })
    }


    app.get('/get/all/trainer', function(req, resp) {
        log('/get/all/trainer');
        profile = req.body.profile || req.params.profile || req.query.profile;
        if (profile) {
            var promise = [];
            promise.push(getAllTrainer(profile));
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