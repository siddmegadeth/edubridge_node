(function() {



    CourseSchema = module.exports = mongoose.Schema({
        profile: {
            type: String,
            unique: true,
            index: true,
        },
        course: [{
            courseId: {
                type: String,
                unique: true,
                index: true,
                sparse: true
            },
            courseType: {
                type: String,
                enum: ['maths', 'science', 'english', 'history', 'geography', 'not_selected'],
                default: 'not_selected',
                sparse: true,
                unique: true
            },
            description: {
                type: String
            },
            heading: {
                type: String
            },
            created_at: {
                type: Date,
                default: Date.now
            },
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


    // CourseSchema.pre('save', function(next) {
    //     now = new Date();
    //     this.updated_at = now;
    //     if (!this.created_at) {
    //         this.created_at = now
    //     }

    //     log("System generated Global Unique ID (CourseId) :" + this._id);
    //     this.courseId = this._id;;
    //     log(this.courseId);

    //     next();
    // });


    CourseModel = module.exports = mongoose.model("CourseModel", CourseSchema);

})()