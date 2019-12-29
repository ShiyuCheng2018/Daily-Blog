const express = require("express");
const {createPostValidator, getErrors} = require("../validator");
const {getPosts, createPost} = require("../controllers/postController");
const {requireSignIn} = require("../controllers/authController");
const {userById} = require("../controllers/userController");


// Get router
const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignIn, getErrors, createPost, createPostValidator);

// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);


// Export router
module.exports = router;

