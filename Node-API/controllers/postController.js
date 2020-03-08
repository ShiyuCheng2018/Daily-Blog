const postModel = require("../models/postModel");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");


exports.postById = (req, res, next, id) => {
  postModel.findById(id)
      .populate("postedBy",  "_id name")
      .exec((err, post) => {
          if(err || !post){
              return res.status(400).json({
                  error: "Post not found..."
              })
          }
          req.post = post;
          next();
      });
};

exports.getPosts = (req, res) =>{
    const posts = postModel.find()
        .populate("postedBy", "_id name")
        .select("_id title body created likes unlikes")
        .sort({created: -1})
        .then((posts) => {
            res.json(posts)
        })
        .catch(err => console.log(err))
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded!"
            })
        }
        let post = new postModel(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: err,
                })
            }
            res.json(result);
        })

    });
};

exports.postsByUser = (req, res) => {
  postModel.find({postedBy: req.profile._id})
      .populate("postedBy", "_id name")
      .select("_id title body created likes unlikes")
      .sort("_created")
      .exec((err, posts) => {
          if(err){
             return res.status(400).json({
                 error: err
             })
          }
          res.json(posts)
      })
};

exports.isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  // console.log("req.post: ", req.post);
  // console.log("req.auth: ", req.auth);
  if(!isPoster){
      return res.status(403).json({
          error: "User is not authorized!"
      })
  }
  next();
};

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if(err){
            res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Post delete successfully!"
        })

    })
};

// exports.updatePost = (req, res, next) => {
//     let post = req.post;
//     post = _.extend(post, req.body);
//     post.updated = Date.now();
//     post.save((err) => {
//         if(err){
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         res.json(post);
//     })
// };

exports.updatePost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: "Photo could not be uploaded !"
            })
        }
        // Save user
        let post = req.post;
        post = _.extend(post, fields);
        post.update = Date.now();

        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json(post);
        })

    })
};


exports.postPhoto = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data)
};

exports.singlePost = (req, res) => {
    return res.json(req.post)
};

// Like / Unlike
exports.like = (req, res) =>{
    postModel.findByIdAndUpdate(req.body.postId,
        {$push: {likes: req.body.userId}, $pull: {unlikes: req.body.userId}},
        {new: true})
        .exec((err, result)=>{
            if(err){
                return res.status(400).json({error: err})
            }else {
                res.json(result)
            }
        });
};

exports.cancelLike = (req, res) =>{
    postModel.findByIdAndUpdate(req.body.postId,
        {$pull: {likes: req.body.userId}},
        {new: true})
        .exec((err, result)=>{
            if(err){
                return res.status(400).json({error: err})
            }else {
                res.json(result)
            }
        });
};

exports.unlike = (req, res) =>{
    postModel.findByIdAndUpdate(req.body.postId,
        {$push: {unlikes: req.body.userId}, $pull: {likes: req.body.userId}},
        {new: true})
        .exec((err, result)=>{
            if(err){
                return res.status(400).json({error: err})
            }else {
                res.json(result)
            }
        });
};

exports.cancelUnLike= (req, res) =>{
    postModel.findByIdAndUpdate(req.body.postId,
        {$pull:{unlikes: req.body.userId}},
        {new: true})
        .exec((err, result)=>{
            if(err){
                return res.status(400).json({error: err})
            }else {
                res.json(result)
            }
        });
};
