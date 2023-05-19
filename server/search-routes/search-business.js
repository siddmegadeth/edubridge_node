(function() {


    app.get('/get/search/business/online', function(req, resp) {
        log('/get/search/business/online');
        var search = req.query.search || req.body.search || req.params["search"];

        var location = req.query.location || req.body.location || req.params["location"];

        log('Searching For  : ' + search);
        CreateBusinessModel.find({
            $text: { $search: search.toString() }
        }, function(errSearch, search) {
            log('Result Output :');
            log(search);
            if (errSearch) {
                log('Error Found');
                log(errSearch);
                resp.send({ status: false, error: errSearch, isSearch: false, message: 'Some Error Occured On Business Search' });
            }
            if (search) {
                log('Search Results Found :');
                resp.send({ status: true, isSearch: true, message: 'Search Results For Business', search: search });
            } else {
                log('Search Results Not Found :');
                resp.send({ status: true, isSearch: false, message: 'No Search Results For Business' });
            }
        });
    });




})();