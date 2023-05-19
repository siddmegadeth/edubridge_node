(function() {


    require('dotenv').config();
    require("./init/index");
    require("./schema/index"); // Import Schema
    require("./routes/index"); // Import Routes
    require("./terms/terms.get"); // Import Terms
    require("./socket-io"); // Import Routes
    // Enable Multi Cluster App (Master Slave Architecture)
    require("./multi-cluster"); // Import Routes
})();