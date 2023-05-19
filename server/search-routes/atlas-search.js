(function() {

    // initialize Profile Model
    //atlasPlugin.initialize(<options>);
    atlasPlugin.initialize({
        model: ProfileModel,
        overwriteFind: false,
        searchKey: 'default',
        addFields: {
            id: '$_id',
            fullname: '$_fullname',
            email: '$_email',
            countryData: '$_countryData',
            mobile: '$_mobile'
        },
        searchFunction: query => {
            return {
                'wildcard': {
                    'query': `${query}*`,
                    'allowAnalyzedField': true
                }
            }
        }
    });


    // initialize BusinessCreate Model
    //atlasPlugin.initialize(<options>);
    atlasPlugin.initialize({
        model: CreateBusinessModel,
        overwriteFind: false,
        searchKey: 'default',
        addFields: {
            id: '$_id',
            companyName: '$_companyName',
            businessName: '$_businessName',
            businessCategory: '$_businessCategory',
            businessType: '$_businessType',
            businessCity: '$_businessCity',
            businessOwnerName: '$_businessOwnerName',
            businessWebsite: '$_businessWebsite',
        },
        searchFunction: query => {
            return {
                'wildcard': {
                    'query': `${query}*`,
                    'allowAnalyzedField': true
                }
            }
        }

    });

})()