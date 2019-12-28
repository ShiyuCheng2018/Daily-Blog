const express = require("express");
const {createPostValidator, getErrors} = require("../validator");
const {getPosts, createPost} = require("../controllers/postController");
const {requireSignIn} = require("../controllers/authController");

// Get router
const router = express.Router();

router.get("/", requireSignIn, getPosts);
router.post("/post", createPostValidator, getErrors, createPost);

// Export router
module.exports = router;

