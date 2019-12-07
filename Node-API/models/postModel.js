const mogoose = require("mongoose");

const postSchema = new mogoose.Schema({
    title: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true,
    }
});

module.exports = mogoose.model("Post", postSchema);