(function() {

    app.get('/get/all/course', function(req, resp) {
        log('/get/all/course');

        trainer = JSON.parse(trainer);
        resp.send(200);
    });
})();