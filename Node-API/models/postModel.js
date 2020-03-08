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
    update: Date,
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
    },
    likes: [{type: ObjectId, ref:"User"}],
    unlikes: [{type: ObjectId, ref:"User"}],
    comments: [{
        text: String,
        create: {type: Date, default: Date.now},
        postedBy: {type: ObjectId, ref:"User"}
    }]

});

module.exports = mogoose.model("Post", postSchema);