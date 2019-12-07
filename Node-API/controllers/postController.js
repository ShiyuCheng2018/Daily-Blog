const postModel = require("../models/postModel");

exports.getPosts = (req, res) =>{
    const posts = postModel.find()
        .select("_id title body")
        .then((posts) => {
            res.json({posts})
        })
        .catch(err => console.log(err))
};

exports.createPost = (req, res) => {
    const post = new postModel(req.body);
    // console.log(res.json(req.body));
    post.save().then(result => {
        res.status(200).json({
            post: result
        });
    });
};

