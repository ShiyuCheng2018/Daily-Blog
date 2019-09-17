const mogoose = require("mongoose");

const postSchema = new mogoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        minLength: 4,
        maxLength: 30
    },
    body: {
        type: String,
        required: "Body is required",
        minLength: 4,
        maxLength: 2000
    }
});

module.exports = mogoose.model("Post", postSchema);