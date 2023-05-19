app.get('/get/terms', function(req, resp) {
    resp.send(require("./terms.json"));

});