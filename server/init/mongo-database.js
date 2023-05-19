(function() {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        dbName: process.env.MOBGODB_NAME
    };

    // dbName: process.env.MOBGODB_NAME


    mongoDbURI = module.exports = process.env.MONGODB_URI_PRODUCTION;
    log(mongoDbURI);
    log(process.env.MOBGODB_NAME);
    //const uriCore = "mongodb+srv://admin:admin123@cluster0-oxday.mongodb.net/gethike-production?retryWrites=true&w=majority";

    (function() {


        MongoClient.connect(mongoDbURI, function(errConnection, connection) {

            connectionMongoSearch = module.exports = connection;
        });

        mongoose.connect(mongoDbURI, options

            )
            .then(function(errDb, dbConnection) {
                console.log('Connection to the online.com DEV DB/ Atlas Cluster is successful!');
                log(process.env.MONGODB_URI_PRODUCTION);
                log(process.env.MOBGODB_NAME);
            })
            .catch((err) => console.error(err));

    })()


    // create MONGODB FOR ATLAS CONNECTION
    // const client = new MongoClient(mongoDbURI);
    // client.connect(function(err) {
    //     console.log('Connected successfully to server');
    //     mongoDb = module.exports = client.db(process.env.MOBGODB_NAME);
    // });



})()