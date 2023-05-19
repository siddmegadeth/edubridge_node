(function() {
    log = module.exports = console.log.bind(console);
    dayjs = module.exports = require("dayjs");
    fs = module.exports = require('fs');
    cors = module.exports = require('cors');

    URL = module.exports = require('url').URL;


    gzippo = module.exports = require('gzippo');
    compression = module.exports = require('compression')

    ejs = module.exports = require('ejs');
    express = module.exports = require("express");
    app = module.exports = require('express')();
    http = module.exports = require('http').Server(app);
    // socket.io
    io = module.exports = require('socket.io')(http, {
        maxHttpBufferSize: 1e8, // 100 MB,
        pingTimeout: 30000,
        transports: ['websocket'],
        cors: {
            origin: "https://bulksms-hosted.herokuapp.com",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        }
    });



    cluster = module.exports = require('cluster');
    mongoose = module.exports = require("mongoose");
    atlasPlugin = module.exports = require('mongoose-atlas-search');
    // MOngoDB For Atlasg Search Connection
    MongoClient = module.exports = require('mongodb').MongoClient;

    // For Searching
    searchable = module.exports = require('mongoose-searchable');
    textSearch = module.exports = require('mongoose-text-search');

    customId = module.exports = require("custom-id");

    Schema = module.exports = mongoose.Schema;
    ObjectId = module.exports = mongoose.ObjectId;
    bodyParser = module.exports = require('body-parser');
    cookieParser = module.exports = require('cookie-parser');
    cookie = module.exports = require('cookie');

    bcrypt = module.exports = require("bcryptjs");
    jwt = module.exports = require('jwt-simple');
    moment = module.exports = require('moment');
    qs = module.exports = require('querystring');
    helmet = module.exports = require('helmet');
    // detect Basic Overall Location on IP Address
    request = module.exports = require('request');
    path = module.exports = require('path');
    ms = module.exports = require('ms');
    //Client REST
    axios = module.exports = require('axios');
    saltRounds = module.exports = 20;
    request.gzip = true;



})();