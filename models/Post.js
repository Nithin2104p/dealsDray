var mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    body: {
        type: String,
    },
    user: {
        type: String,

    },
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    designation: {
        type: String,
    },
    gender: {
        type: String,
    },
    course: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Post", PostSchema);
