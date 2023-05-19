(function() {



    ProfileSchema = module.exports = mongoose.Schema({
        profile: {
            type: String,
            unique: true,
            index: true,
        },
        fullname: {
            type: String,
            sparse: true
        },
        username: {
            type: String,
            index: true,
            sparse: true
        },
        email: {
            type: String,
            unique: true,
            index: true,
            sparse: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        isProfileCompleted: {
            type: Boolean,
            default: false
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    });


    ProfileSchema.pre('save', function(next) {
        now = new Date();
        this.updated_at = now;
        if (!this.created_at) {
            this.created_at = now
        }

        log("System generated Global Unique ID (profile) :" + this._id);
        this.profile = this._id;
        log(this.profile);

        next();
    });


    ProfileModel = module.exports = mongoose.model("ProfileModel", ProfileSchema);

})()