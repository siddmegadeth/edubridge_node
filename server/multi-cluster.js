(function() {

    const { setupMaster, setupWorker } = require("@socket.io/sticky");
    const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");
    const { Emitter } = require("@socket.io/mongo-emitter");


    if (cluster.isMaster) {
        var numWorkers = require('os').cpus().length;

        // setup sticky sessions
        setupMaster(http, {
            loadBalancingMethod: "least-connection",
        });

        // setup connections between the workers
        setupPrimary();



        console.log('Master cluster setting up ' + numWorkers + ' workers...');
        // numWorkers
        for (var i = 0; i < 2; i++) {
            cluster.fork();
        }

        cluster.on('online', function(worker) {
            console.log('Worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
    } else {


        // use the cluster adapter
        io.adapter(createAdapter());

        // setup connection with the primary process
        setupWorker(io);

        http.listen(process.env.PORT, function(req, resp) {
            log("*******************************************************************************");
            log("EduBridge : PORT : " +  process.env.PORT);
            log("*******************************************************************************");
            log("PORT : " + process.env.PORT);

        });

        //prod
        // http.listen(process.env.PORT, function(req, resp) {
        //     log("Prodeas Server Core  Started :" + process.env.PORT);
        //     log(process.env.PORT);
        // });

    }


})();