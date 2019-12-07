const express = require("express");
const {createPostValidator, getErrors} = require("../validator");
const {getPosts, createPost} = require("../controllers/postController");

// Get router
const router = express.Router();

router.get("/", getPosts);
router.post("/post", createPostValidator, getErrors, createPost);

// Export router
module.exports = router;

