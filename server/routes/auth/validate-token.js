(function() {

    app.get('/get/verify/access/token', validateAccessToken, function(req, res) {
        log('get/verify/access/token');
    });
})()