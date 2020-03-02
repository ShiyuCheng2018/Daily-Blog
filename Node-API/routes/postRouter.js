const express = require("express");
const {createPostValidator, getErrors} = require("../validator");
const {postById, getPosts, createPost, postsByUser, isPoster,updatePost, deletePost, postPhoto, singlePost} = require("../controllers/postController");
const {requireSignIn} = require("../controllers/authController");
const {userById} = require("../controllers/userController");


// Get router
const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignIn, getErrors, createPost, createPostValidator);
router.get("/post/:postId", singlePost);
router.get("/posts/by/:userId", requireSignIn, postsByUser);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
// Photo
router.get("/post/photo/:postId", postPhoto);
// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);
// Any route containing :postId, our app will first execute userById()
router.param("postId", postById);



// Export router
module.exports = router;

