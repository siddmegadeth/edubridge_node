(function() {

    app.get('/get/all/trainer', function(req, resp) {
        log('/get/all/trainer');

        trainer = JSON.parse(trainer);
        resp.send(200);
    });
})();