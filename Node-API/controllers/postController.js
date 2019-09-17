const postModel = require("../models/postModel");
const {validationResult} = require("express-validator");

exports.getPosts = (req, res) =>{
    res.json({
        posts: [
            {title: "First post"}, {title: "Second post"}
        ]
    });
};

exports.createPost = (req, res) => {
    const post = new postModel(req.body);
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     //     return res.status(422).json({
    //     //         error: errors.array()[0].msg
    //     //     });
    //     // }

    post.save().then(result => {
        res.status(200).json({
            post: result
        });
    });
};

