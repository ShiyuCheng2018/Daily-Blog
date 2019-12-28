const User = require("../models/userModel");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found."
            })
        }
        req.profile = user; // Adds profile object in req with user info
        next()
    });
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = res.profile && req.auth && req.profile._id === req.auth._id;
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized to perform this action",
        })
    }
};