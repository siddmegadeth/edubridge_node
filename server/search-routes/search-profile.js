(function() {


    app.get('/get/search/profile', function(req, resp) {
        log('/get/search/profile');
        var search = req.query.search || req.body.search || req.params["search"];
        log('Searching For  : ' + search);
        ProfileModel.find({
            $text: { $search: search.toString() }
        }, function(errSearch, search) {
            if (errSearch) {
                log('Error Found Profile');
                log(errSearch);
                resp.send({ status: false, error: errSearch, isSearch: false, message: 'Some Error Occured On Profile Search' });
            }
            if (search) {
                log('Search Results Found :');
                resp.send({ status: true, isSearch: true, message: 'Search Results For Profile', search: search });
            } else {
                log('Search Results Not Found :');
                resp.send({ status: true, isSearch: false, message: 'No Search Results For Profile' });
            }
        });

    });

})();