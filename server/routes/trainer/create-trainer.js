(function() {

    app.post('/post/create/new/trainer', function(req, resp) {
        log('/post/create/new/trainer');
        profile = req.body.profile || req.params.profile || req.query.profile;
        trainer = req.body.trainer || req.params.trainer || req.query.trainer;

        trainer = JSON.parse(trainer);
        resp.send(200);
    });
})();