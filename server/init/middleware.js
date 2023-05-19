(function() {




    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept, X-Requested-With, authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });

    app.use(cors());
    app.options('*', cors());

    app.use(cors({
        origin: ['http://localhost:6001/', 'http://localhost:7001', process.env.PORT]
    }));


    app.use(compression());
    //app.use(cors());
    // parse application/json
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cookieParser());

    // parse application/x-www-form-urlencoded


    //app.use(bodyParser({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({
        limit: "100mb",
        extended: true,
        parameterLimit: 200000
    }));
    app.set(process.env.PORT);
    app.set('host', process.env.NODE_IP || 'localhost');
    app.use(gzippo.staticGzip("public/web"));
    app.use('/home', gzippo.staticGzip("public/web"));

    app.use(gzippo.compress());

    // security Path
    app.use(helmet());
    // app.use(helmet({
    //     frameguard: false
    // }))
    app.use(helmet({
        frameguard: {
            action: 'deny'
        }
    }));

})()