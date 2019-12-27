const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.signUp = async(req, res) =>{
    const userExists = await User.findOne({
        email: req.body.email
    });

    if(userExists) return res.status(403).json({
        error: "Email is taken!"
    });

    const user = await new User(req.body);
    await user.save();
    res.status(200).json({
        message: "Sign up success!!"
    })

};

exports.signIn = (req, res) =>{
    // Find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        // If err or no user
        if(err || !user){
            return res.status(401).json({
                error: "User with that email does not exist. Please sign in."
            })
        }
        // If user is found make sure the email and password match
        // Create authenticate method in model and use here
        if (!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match."
            })
        }
        // Generate a token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // Persist the token as 't' in cookie with expiry date
        res.cookie("t", token, {expire: new Date()+9999});
        // Return response with user and token to frontend client
        const {_id, name, email} = user;
        return res.json({token, user: {_id, email, name}});
    });
};

exports.signOut = (req, res) => {
    res.clearCookie("t");
    return res.json({message: "Sign out success!"})
};