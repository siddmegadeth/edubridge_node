(function() {



    TrainerSchema = module.exports = mongoose.Schema({
        profile: {
            type: String,
            unique: true,
            index: true
        },
        trainers: [{
            trainerId: {
                type: String,
                unique: true,
                index: true,
            },
            fullname: {
                type: String,
                sparse: true
            },
            email: {
                type: String,
                unique: true,
                index: true,
                sparse: true
            },
            mobile: {
                type: String,
                unique: true,
                index: true,
                sparse: true
            }
        }],
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    });


    TrainerSchema.pre('save', function(next) {
        now = new Date();
        this.updated_at = now;
        if (!this.created_at) {
            this.created_at = now
        }

        log("System generated Global Unique ID (TrainerID) :" + this._id);
        this.trainers[0].trainerId = this.trainers[0]._id;
        log("Trainer ID generated");
        log(this.trainers[0]);
        log("Assigning Some ID");
        log(this.trainers[0].trainerId);

        next();
    });


    TrainerModel = module.exports = mongoose.model("TrainerModel", TrainerSchema);

})()