(function() {

    app.put('/put/update/existing/trainer/by/id', function(req, resp) {
        log('/put/update/existing/trainer/by/id');
        profile = req.body.profile || req.params.profile || req.query.profile;
        trainerId = req.body.trainerId || req.params.trainerId || req.query.trainerId;

        trainer = JSON.parse(trainer);
        resp.send(200);
    });
})();