(function() {

    app.post('/post/create/new/course', function(req, resp) {
        log('/post/create/new/course');
        profile = req.body.profile || req.params.profile || req.query.profile;
        trainer = req.body.trainer || req.params.trainer || req.query.trainer;

        trainer = JSON.parse(trainer);
        resp.send(200);
    });
})();