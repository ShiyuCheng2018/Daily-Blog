const mogoose = require("mongoose");
const {ObjectId} = mogoose.Schema;

const postSchema = new mogoose.Schema({
    title: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mogoose.model("Post", postSchema);